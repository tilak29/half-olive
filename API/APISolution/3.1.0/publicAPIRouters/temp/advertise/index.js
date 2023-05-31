const express = require("express");
const router = express.Router();
const Promise = require("bluebird");
const moment = require("moment");
const {
  advertiseGetData,
  advertiseSaveData
} = require("./advertiseRepository");
const {
  payLoadValidation,
  sendResponse,
  getNoOfGroupShow
} = require("../../../utils");
const {
  publicAPIDataTypeJSON: { advertiseGet }
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  publicAPIRouterConstant: {
    advertise_getData: { url: getData },
    advertise_insertData: { url: insertData }
  }
} = require("../../../routerConstant");
const { imageUpload } = require("../../../uploadImageToServer");
const {
  imageFolderName: { advertiseFolderName }
} = require("../../../config.json");
const { fileMimeType } = require("../../../fileMimeTypeUtils");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /advertise/getData Advertise - Get Data
 * @apiName Advertise Get Data
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /advertise/getData
 *
 * @apiGroup 1.Public API
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Advertise
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *        "advertiseList": [
 *              {
 *                 "advertiseId": 1,
 *                 "file": "https://file-upload-pharma.s3.ap-south-1.amazonaws.com/advertisement/1588843374159.jpeg",
 *                 "url": "http://testimage",
 *                 "sequence": 1,
 *                 "isActive": 1,
 *                 "updatedBy": null,
 *                 "updatedDate": null
 *              }
 *       ]
 *   },
 *   "isSuccess": true,
 *   "statusCode": 200
 *  }
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
  getData,
  async function (req, res, next) {
    try {
      let result = {};
      const { totalRecords, startFrom } = req.body;
      const noOfGroupShow = await getNoOfGroupShow({ totalRecords, startFrom });

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: advertiseGet
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await advertiseGetData({
          noOfGroupShow
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              advertiseList: [...response]
            },
            isSuccess
          };
        } else {
          result = {
            message: Message({}),
            isSuccess: false
          };
        }
      } else {
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

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /advertise/insertData  Advertise - Insert Data
 * @apiName Advertise Insert Data
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /advertise/insertData
 *
 * @apiGroup 1.Public API
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert data in Advertise
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 *
 * @apiParam (Request body) {JSON} Input required JSON of advertiseJson as array
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "advertiseJson": [{"sequence":"1","url":"test.com","isActive":1,"file":"1592375415217.jpg","advertiseId":0}]
 *    }
 *
 * @apiSuccessExample Success Response"
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "data": {
 *          "insertId": 2,
 *          "affectedRows": 1
 *       },
 *      "message": "Record inserted successfully.",
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
 */
router.post(
  insertData,
  async function (req, res, next) {
    try {
      let result = {};
      const files = req.files ? req.files.file : undefined;
      let isValidFile = true;
      let { advertiseJson, loggedInEmployeeId } = req.body;

      await Promise.map(advertiseJson, async (x, index) => {
        //let imageFile = (files && files.length > 0 && files[index]) || files;
          let imageFile=null;

          if(files && files.length > 0){
            imageFile = files[index];
          }else if(x.upload === 1){
            imageFile = files;
          }

        if (imageFile !== undefined && imageFile !== null) {
          const mimeType = await fileMimeType({ file: imageFile });
          let mime;
          if (mimeType) {
            const { mime: originalmime } = mimeType;
            mime = originalmime;
          }
          if ((mime && mime.split("/")[0] !== "image") || mime === undefined) {
            isValidFile = false;
            return;
          }
        }
      });
      let fileConstant = 0;
      if (isValidFile === true) {
        advertiseJson = await Promise.map(advertiseJson, async (x, index) => {
          //let imageFile = (files && files.length > 0 && files[index]) || files;
          let imageFile=null;
          let newImageName = null;

          // if(files && files.length > 0){
          //   imageFile = files[index];
          // }else if(x.upload === 1){
          //   imageFile = files;
          // }
          if(files && files.length > 0 && x.upload === 1){
            imageFile = files[fileConstant];
            fileConstant = fileConstant + 1;
            //delete files[0];
          }else if(x.upload === 1){
            imageFile = files;
          }
          
          //console.log(imageFile)
          if (imageFile !== undefined && imageFile !== null) {
            const newItemImage = await imageUpload({
              bucketName: `${advertiseFolderName}`,
              loggedInEmployeeId,
              file: imageFile,
              imageName: moment().utcOffset("+05:30").valueOf()+"_"+index
            });
            const { key } = newItemImage;
            newImageName = key;
            x = { ...x, file: newImageName };
          } else {
            if(x.upload === 1){x = { ...x, file: null}
             };
          }
          return x;
        });
        const response = await advertiseSaveData({
          data: JSON.stringify(advertiseJson),
          loggedInEmployeeId
        });
        if (response[3] && response[3][0]["@op_IsSuccess"] === 1) {
          const operationFlag = response[3][0]["@op_Flag"];
          if (operationFlag === 1)
            result = { message: Message({ code: "RINS" }), isSuccess: true };
          else
            result = {
              message: Message({}),
              isSuccess: false
            };
        } else {
          result = {
            message: Message({}),
            isSuccess: false
          };
        }
      } else {
        const message = Message({ code: "INVALIDFILETYPE" });
        result = {
          message,
          isValidate: false,
          validationList: [{ file: message }]
        };
      }
      req.result = { isValidate: true, validationList: [], ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

module.exports = router;
