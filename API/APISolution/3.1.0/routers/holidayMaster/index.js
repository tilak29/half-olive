const express = require("express");
const router = express.Router();
const moment = require("moment");

const {
  holidayGetData,
  holidaySaveData,
  holidayUpdateData,
  holidayDeleteData
  // holidayDownloadData,
  // holidayUploadData
} = require("./holidayMasterRepository");
const {
  payLoadValidation,
  sendResponse
} = require("../../../utils");
const {
  holidayMastergetData,
  holidayMasterAdd,
  holidayMasterUpdate,
  holidayMasterDelete
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  holidayMaster_getData: { url: getData },
  holidayMaster_insertData: { url: insertData },
  holidayMaster_updateData: { url: updateData },
  holidayMaster_deleteData: { url: deleteData },
  // holidayMaster_downloadData: { url: downloadData },
  // holidayMaster_uploadData: { url: uploadData }
} = require("../../../routerConstant");
const { validDateRange } = require("./holidayMasterUtils");
const { handleError } = require("../../../error.js");
const { getJSONFromExcel } = require("../../../uploadExcel");
const { fileMimeType } = require("../../../fileMimeTypeUtils");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /holidayMaster/getData Get Data from Holiday Master
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /holidayMaster/getData
 *
 * @apiGroup Holiday Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Holiday Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {String} year Enter year to find year wise holidays
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "year" : 2020
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "statusCode": 200,
 *      "isSuccess": true,
 *      "data": {
 *          "holidayList":[
 *              {
                  "holidayId": 1,
                  "companyId": 1,
                  "name": "Holi",
                  "holidayDate": "2022-09-15T00:00:00.000Z",
                  "remark": "Leave For Holiday",
                  "createdBy": 28,
                  "createdDate": "2022-09-15T17:36:00.000Z",
                  "updatedBy": null,
                  "updatedDate": null,
                  "deletedBy": null,
                  "deletedDate": null
                }
 *           ],
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully"
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
  getData,
  async function (req, res, next) {
    try {
      let result = {};
      const { year } = req.body;
      // const noOfGroupShow = await getNoOfGroupShow({ totalRecords, startFrom });
      
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: holidayMastergetData
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await holidayGetData({
          year
        });
        const { isSuccess } = response;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              holidayList: [...response.recordset]
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
 * @api {post} /holidayMaster/insertData Insert Data into Holiday Master
 * @apiName InsertData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /holidayMaster/insertData
 *
 * @apiGroup Holiday Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into Holiday Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {String}  holidayName Required Enter Holiday's name
 * @apiParam (Request body) {String}  holidayDate Required Enter Holiday's date
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "holidayName": "Diwali",
 *        "holidayDate": "2020-10-25 00:00:00"
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "statusCode": 200,
 *      "isSuccess": true,
 *      "data": {},
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "Record Inserted Successfully"
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
      const bodyData = {
        ...req.body
      };
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: holidayMasterAdd
      });

      const { isValidate, validationList } = isValidDataType;

      if(isValidate){
        const response = await holidaySaveData({
          data: {
            ...bodyData
          }
        });

        if (response && response.isSuccess) {
          if(response.recordset[0].Count == 1){
            result = { message: Message({ code: "DUPHOLIDAY" }), isSuccess: false };
          }else{
            result = { message: Message({ code: "RINS" }), isSuccess: true };
          }
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
 * @api {post} /holidayMaster/updateData Update Data of Holiday Master
 * @apiName UpdateData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /holidayMaster/updateData
 *
 * @apiGroup Holiday Master
 *
 * @apiDescription This API is Used to update data in Holiday Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {String}  updatedDate Required Enter updatedDate For Updating Data
 * @apiParam (Request body) {Number}  holidayId Required to enter For Updating Data
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "updatedDate":"2020-01-16 14:32:54",
 *        "holidayId": 20
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": true,
 *        "data": {},
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "Record Updated Successfully"
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
  updateData,
  async function (req, res, next) {
    try {
      const bodyData = {
        ...req.body
      };
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: holidayMasterUpdate
      });


      const { isValidate, validationList } = isValidDataType;


      if(isValidate){
        const response = await holidayUpdateData({
          data: {
            ...bodyData
          }
        });

        if (response && response.isSuccess) {
          if(response.recordset[0].Count == 1){
            result = { message: Message({ code: "DUPHOLIDAY" }), isSuccess: false };
          }else{
            result = { message: Message({ code: "RUPD" }), isSuccess: true };
          }
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
 * @api {post} /holidayMaster/deleteData Delete Data from Holiday Master
 * @apiName DeleteData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /holidayMaster/deleteData
 *
 * @apiGroup Holiday Master
 *
 * @apiDescription This API is Used to delete data from Holiday Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {Number}  holidayId Required to enter For Deleting Data
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *       "holidayId": 15
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "Record Deleted Successfully",
 *      "isSuccess": true,
 *      "statusCode": 200,
 *      "data": {}
 *    }
 *
 * @apiErrorExample
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "statusCode": 500,
 *      "isSuccess": false,
 *      "data": {},
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "Internal Server Error"
 *    }
 */
 router.post(
  deleteData,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body
      };
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: holidayMasterDelete
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await holidayDeleteData({
          data: bodyData
        });

        if (response && response.isSuccess) {
          result = { message: Message({ code: "RDEL" }), isSuccess: true };
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


module.exports = router;
