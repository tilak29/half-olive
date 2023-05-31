const moment = require("moment");
const AWS = require("aws-sdk");

const { loggerInfo } = require("./logger");
const {
  aws: { accessKeyId, secretAccessKey, bucket },
  imageFolderName
} = require("./config.json");

/** 
 * @author "Khushbu Shah, Akshay Ambaliya"
 * @param  {string}  base64 Data
 * @return {string}  Image url
 */
const imageUpload = async ({
  image,
  bucketName,
  imageName,
  isImageDeleted = false,
  loggedInEmployeeId,
  file
}) => {
  let location = "";
  let key = null;

  AWS.config.setPromisesDependency(require("bluebird"));
  AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region: "ap-south-1"
  });

  // Create an s3 instance
  const s3 = new AWS.S3();
  let result;

  // Ensure that you POST a base64 data to your server.
  // Let's assume the variable "base64" is one.
  // Delete File
  if (isImageDeleted) {
    await s3.deleteObject(
      {
        Bucket: `${bucket}/${bucketName}`,
        Key: imageName
      },
      function (err, data) {
        if (err) loggerInfo({ code: "error", message: `${err}` });
        else {
          loggerInfo({
            code: "warn",
            message: `Image Deleted | Image Path : ${bucket}/${bucketName}/${imageName} by ${loggedInEmployeeId}`
          });
        }
      }
    );
    result = { location: "", key: null };
  } 

  ///Upload new file
  if(!(file == null && image == null)) {
    const base64Data = file
      ? file.data
      : new Buffer.from(
        image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
    // Getting the file type, ie: jpeg, png or gif
    const type = file
      ? file.name.split(".")[1]
      : image.split(";")[0].split("/")[1];

    const userId = imageName || moment().utcOffset("+05:30").valueOf();
    const contentType = file ? file.mimetype : "image/" + type;
    const contentEncoding = file ? undefined : "base64";

    // With this setup, each time your user uploads an image, will be overwritten.
    // To prevent this, use a different Key each time.
    const params = {
      Bucket: `${bucket}/${bucketName}`,
      Key: `${userId}.${type}`, // type is not required
      Body: base64Data,
      ACL: "public-read",
      ContentType: contentType,
      ContentEncoding: contentEncoding // required
    };
    try {
      const { Location, Key } = await s3.upload(params).promise();
      location = Location;
      key = Key.split("/").reverse()[0];
    } catch (err) {
      loggerInfo({ code: "error", message: `${err}` });
    }
    result = { location, key };
  }

  return result;
};

const getSignedFileUploadURL = async ({ type, screen, fileName, index = null }) => {
  try {
    AWS.config.setPromisesDependency(require("bluebird"));
    AWS.config.update({
      accessKeyId,
      secretAccessKey,
      region: "ap-south-1"
    });
    const s3 = new AWS.S3();
    const timestamp = moment().utcOffset("+05:30").valueOf();
    const Key = fileName == null ? index == null ? `${timestamp}.${type}` : `${timestamp}${index}.${type}` : fileName;
    const bucketName = imageFolderName[screen]
    var params = { Bucket: `${bucket}/${bucketName}`, Key, Expires: 30, ACL: 'public-read' };
    var url = await s3.getSignedUrlPromise('putObject', params);
    return { url, Key };
  } catch (error) {
    throw error.message;
  }
}

const deleteFileFromAWSServer = async ({ screen, fileName }) => {
  AWS.config.setPromisesDependency(require("bluebird"));
  AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region: "ap-south-1"
  });
  const bucketName = imageFolderName[screen]
  const s3 = new AWS.S3();
  await s3.deleteObject(
    {
      Bucket: `${bucket}/${bucketName}`,
      Key: fileName
    },
    function (err, data) {
      if (err) loggerInfo({ code: "error", message: `${err}` });
      else {
        loggerInfo({
          code: "info",
          message: `Image Deleted | Image Path : ${bucket}/${bucketName}/${fileName}`
        });
      }
    }
  );
}

module.exports = { imageUpload, getSignedFileUploadURL, deleteFileFromAWSServer };
