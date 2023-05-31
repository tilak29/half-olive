const express = require("express");
const router = express.Router();
const { fileMimeType } = require("../../../fileMimeTypeUtils");
const { imageUpload } = require("../../../uploadImageToServer");

const { 
  getVideoSeriesList,
  saveVideoSeries
} = require("./videoSeriesMasterRepository");

const {
    payLoadValidation,
    sendResponse
  } = require("../../../utils");
  
const {
  saveVideoSeriesDetail
  } = require("../../../dataType.json");

const { Message } = require("../../../Messages");
const { handleError } = require("../../../error.js");
const {
  videoSeriesMaster_getSeriesData: { url: getSeriesData },
  videoSeriesMaster_saveSeriesData: { url: saveSeriesData }  
} = require("../../../routerConstant");
const {
  imageFolderName: { seriesFolderName }
} = require("../../../config.json");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /videoSeriesMaster/getSeriesData Get Data from Video Series Master
 * @apiName getSeriesData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /videoSeriesMaster/getSeriesData
 *
 * @apiGroup Video Series Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Video Series Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *        videoSeriesList:[
                    {
                        seriesName: 'Cartoon',
                        seriesId: 11,
                        seriesDescription: "description of series cartoon",
                        isActive:1
                    }
                ]
 *      },
 *      "isSuccess": true,
 *      "statusCode": 200
 *    }
 *
 * @apiErrorExample
 *    HTTP/1.1 500 Internal Server Error
 *      {
 *        "statusCode": 500,
 *        "isSuccess": false,
 *        "data": {},
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "Internal Server Error"
 *      }
 *
 *    HTTP/1.1 401 Unauthorized
 *      {
 *        "statusCode": 401,
 *        "isSuccess": false,
 *        "data": {},
 *        "isValidate": false,
 *        "validationList": [
 *          {
 *             "Error": "You are UnAuthorized to perform this Action"
 *          }
 *         ],
 *        "message": "You are UnAuthorized to perform this Action"
 *      }
 */
router.post(
  getSeriesData,
    async function (req, res, next) {
      try {
        let result = {};
  
        const response = await getVideoSeriesList();
        const { isSuccess } = response;
        const videoSerieslist = response;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              videoSeriesList: videoSerieslist              
              },
            isSuccess
          };
        } else {
          result = {
            message: Message({}),
            isSuccess: false
          };
        }

        const validationList = [];
        const isValidate = true;
        req.result = { isValidate, validationList, ...result };
        next();
      } catch (e) {
        handleError(e, res);
      }
    },
    sendResponse
  );



/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /videoSeriesMaster/saveSeriesData save Seires data to videoseriesmaster table
 * @apiName saveSeriesData
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /videoSeriesMaster/saveSeriesData
 *
 * @apiGroup Video Series Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to save Series data to videoseriesmaster table
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} isbuplicapi true
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json)
 *      {
            seriesId:11,
            seriesName:"test",
            seriesDescription:"",
            isActive:1
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "isValidate": true,
 *        "validationList": [],
 *        "data": {
 *            "insertId": 2,
 *            "affectedRows": 1
 *         },
 *        "message": "Record Inserted Successfully",
 *        "isSuccess": true,
 *        "statusCode": 200
 *      }
 *
 * @apiErrorExample
 *    HTTP/1.1 500 Internal Server Error
 *      {
 *        "statusCode": 500,
 *        "isSuccess": false,
 *        "data": {},
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "Internal Server Error"
 *      }
 */
router.post(
  saveSeriesData,
  async function (req, res, next) {
    try {
      let result = {};
      const {
        loggedInEmployeeId,
        seriesId = null,
        seriesName,
        seriesDescription = null,
        isActive,
        seriesIcon,
      } = req.body;
      let isValidFile = true;
      const file = req.files ? req.files.file : undefined;
      
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: saveVideoSeriesDetail
      });

      const { isValidate, validationList } = isValidDataType;

      if (isValidate) {
        //code for image upload
        //start
        let {
          imageUrl,
          image,
          isImageDeleted,
          isImageCanceled,
          loggedInEmployeeId
        } = req.body;
        let newImageName = null;
        const isImageUpdated =
          seriesId !== null && image
            ? !image.includes(`https://file-upload`)
            : true;
        const imageName =
        seriesId !== null &&
          imageUrl &&
          imageUrl !== "" &&
          (file === null || file === undefined)
            ? imageUrl
            : undefined;
    
        if (
          image !== "" &&
          image !== undefined &&
          image !== null &&
          file !== undefined
        ) {
          const mimeType =
            file && file !== null ? await fileMimeType({ file }) : undefined;
          if (file !== null && file !== undefined) {
            let mime;
            if (mimeType) {
              const { mime: originalmime } = mimeType;
              mime = originalmime;
            }
            if ((mime && mime.split("/")[0] !== "image") || mime === undefined) {
              isValidFile = false;
              const message = Message({ code: "INVALIDFILETYPE" });
              result = {
                message,
                isValidate: false,
                validationList: [{ file: message }]
              };
            }
          }
        }
        if (isValidFile === true) {
          if (
            (isImageCanceled === false &&
              image !== "" &&
              image !== undefined &&
              image !== null &&
              file !== undefined &&
              isImageUpdated === true) ||
              isImageDeleted === true
          ) {
            const newItemImage = await imageUpload({
              image,
              bucketName: `${seriesFolderName}`,
              imageName: imageName ? imageName.split(".")[0] : imageName,
              isImageDeleted,
              loggedInEmployeeId,
              file
            });
            const { key } = newItemImage;
            newImageName = key;
            req.body.seriesIcon = newImageName;
          } else {
            newImageName = ((isImageDeleted === false || isImageUpdated === false) && req.body.seriesImage) ||  null;
          }
          delete  req.body.image;
    
        //end
          const response = await saveVideoSeries({
            loggedInEmployeeId,
            seriesId,
            seriesIcon: newImageName,
            seriesName,
            seriesDescription,
            isActive,
        });
        const { isSuccess, isDuplicate = false } = response;
        if (isSuccess === true) {
          const code = seriesId != null ? "RUPD" : "RINS"
          result = {
            message: Message({ code }),
            data: {
                  "insertId": 1,
                  "affectedRows": 1
              },
            isSuccess
          };
        } else {
          if(isDuplicate){
            result = {
              message: Message({code:"DUPSERIES"}),
              isSuccess: false
            };  
          }
          else{
            result = {
              message: Message({}),
              isSuccess: false
            };  
          }
        }
      }} else {
        result = {
          message: Message({ code: "INVALPAYLOAD" }),
          isSuccess: true,
          ...result
        };
      }
      req.result = { isValidate, validationList, ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);



  module.exports = router;
