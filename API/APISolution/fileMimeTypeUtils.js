const fs = require("fs");
const FileType = require("file-type");
/**
 * @author "Nirali Maradiya,Parth Suthar,Khushbu Shah"
 */
const fileMimeType = async ({ file }) => {
  try {
    let filename = file.name;
    const getFileMimeType = async () => {
      return new Promise((resolve, reject) => {
          file.mv("files/" + filename, async err => {
            if (err) {
              resolve("");
            } else {
              if(fs.existsSync("files/" + filename)){
                const fileMimeType = await FileType.fromFile("files/" + filename);
                resolve(fileMimeType);
              }
              else {
                resolve("");
              }
  
            }
          });
      });  
    };
    let mimeType = await getFileMimeType();
    mimeType = mimeType == "" ? null : mimeType;

    try {
      if (fs.existsSync("files/" + filename)) {
        fs.unlink("files/" + filename, function (err) {
          if(err)
          console.log("================== File Not Found=============")
        });
      }
    }
    catch (error) {
      console.log("================== File Not Found=============")
      console.log(error);
    }

    return mimeType;

  } catch (error) {
    console.log("================== File Not Found=============")
    console.log(error);
    return null;
  }
};

module.exports = {
  fileMimeType
};
