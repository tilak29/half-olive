const express = require("express");
const { treatmentMaster_getTreatmentMaster, treatmentMaster_insertData, treatmentMaster_updateData, treatmentMaster_deleteData, diseaseMaster_getDiseaseMasterFortreatment } = require("../../../routerConstant");
const router = express.Router();

const { getTreatmentmaster, saveTreatmentMaster, updateTreatmentmaster, deleteTreatmentmaster, getAllDisease } = require('./treatmentMasterRepository')

const { sendResponse, payLoadValidation } = require("../../../utils");
const { Message } = require("../../../Messages");
const { handleError } = require("../../../error");

const {
  treatmentMaster,
  TreatmentMasterDelete
} = require("../../../dataType.json");


/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /treatmentMaster/insertData Insert Data into Treatment Master
 * @apiName InsertData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatmentMaster/insertData
 *
 * @apiGroup Treatment Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into Treatment Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {String}  Treatment Name is Required
 * @apiParam (Request body) {int}  Disease Name is Required
 *
 * @apiParamExample {json} Input (body/json)
 *     {
 *      "TreatmentName": "yoga",
 *      "DiseaseId": "2,4",
 *      "IsActive": true,
 *      "TherapistName": "2,4,5",
 *      "StartTime": "10:00",
 *      "EndTime": "11:00",
 *     }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *       "isValidate": true,
 *       "validationList": [],
 *       "data": {
 *           "insertId": 2,
 *           "affectedRows": 1
 *       },
 *       "message": "Record Inserted Successfully",
 *       "isSuccess": true,
 *       "statusCode": 200
 *     }
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
  treatmentMaster_insertData.url,
  async function (req, res, next) {
    try {
      var result = {};
      const bodyData = {
        ...req.body
      };
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: treatmentMaster
      });

      const { isValidate, validationList } = isValidDataType;

      if (isValidate) {

        const response = await saveTreatmentMaster({
          data: JSON.stringify(bodyData)
        });

        if (response && response.isSuccess) {
          if (response.recordset[0].Count == 1) {
            result = { message: Message({ code: "DUPTREATMENT" }), isSuccess: false };
          } else {
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
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /treatmentMaster/updateData Update Data of Treatment Master
 * @apiName updateData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatmentMaster/updateData
 *
 * @apiGroup Treatment Master
 *
 * @apiDescription This API is Used to update data in Treatment Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - Therapist Id and Treatment is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "TreatmentName": "yoga",
 *      "DiseaseId": 2,
 *      "IsActive": true,
 *      "TherapistName": "2,4,5",
 *      "StartTime": "10:00",
 *      "EndTime": "11:00",
 *     }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "Record Updated Successfully",
 *      "isSuccess": true,
 *      "statusCode": 200,
 *      "data": {}
 * }
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
  treatmentMaster_updateData.url,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body
      };

      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: treatmentMaster
      });
      const { isValidate, validationList } = isValidDataType;
      // const isValidate = validationList = true
      if (isValidate) {
        // const data = {
        //   status: bodyData.status,
        //   startTime: bodyData.startTime,
        //   endTime: bodyData.endTime,
        //   checkDay: bodyData.checkDay,
        //   loggedInUserId: bodyData.loggedInUserId,
        //   userId: bodyData.userId
        // }
        const response = await updateTreatmentmaster({
          data: JSON.stringify(bodyData)
        });

        if (response && response.isSuccess) {
          result = { message: Message({ code: "RUPD" }), isSuccess: true };

          // result = { ...messageResult };
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
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /treatmentMaster/deleteData Delete Data of Treatment Master
 * @apiName DeleteData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatmentMaster/deleteData
 *
 * @apiGroup Treatment Master
 *
 * @apiDescription This API is Used to delete data in Treatment Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - TreatmentID is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "TreatmentID": 5
 *    }
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
 * }
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
  treatmentMaster_deleteData.url,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body
      };
      const data = {
        TreatmentID: bodyData.treatmentid,
        loggedInEmployeeId: bodyData.loggedInUserId
      }

      const isValidDataType = await payLoadValidation({
        bodyData: data,
        payLoad: TreatmentMasterDelete
      });
      const { isValidate, validationList } = isValidDataType;
      // const isValidate = validationList = true
      if (isValidate) {
        const response = await deleteTreatmentmaster({
          data
        });

        if (response && response.isSuccess) {
          result = { message: Message({ code: "RDEL" }), isSuccess: true };

          // result = { ...messageResult };
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
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /treatmentMaster/getTreatmentMaster Get Data from Treatment Master
 * @apiName GetData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatmentMaster/getTreatmentMaster
 *
 * @apiGroup Treatment Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Treatment Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {Number}  filterStatus, filterStatus is for filter the data by the data is Active or Not. //For Active Record:1//For InActive Record:0//For All Record:"All"
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "Status": 0,
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *    "isValidate": true,
 *    "validationList": [],
 *    "message": "You get data Successfully",
 *    "data": {
 *        "treatmentMasterList": [
 *            {
                  "DiseaseName": "Covid-19"
                  "EmployeeId": "1,4",
                  "EndTime": "1970-01-01T20:00:00.000Z",
                  "IsActive": true,
                  "StartTime": "1970-01-01T19:00:00.000Z",
                  "TreatmentID": 91,
                  "TreatmentName": "exercise",
                  "createdBy": 1,
 *                "createdDate": "2022-07-20 17:37:00",
 *                "updatedBy": null,
 *                "updatedDate": null,
 *                "deletedBy": null,
 *                "deletedDate": null
 *            }
 *        ]
 *    },
 *    "isSuccess": true,
 *    "statusCode": 200
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
router.post(treatmentMaster_getTreatmentMaster.url, async function (req, res, next) {
  try {
    let result = {};
    const bodyData = {
      ...req.body
    };
    const response = await getTreatmentmaster({
      bodyData
    });
    response.isValidate = true
    const { isSuccess, isValidate } = response
    if (isSuccess === true) {
      result = {
        message: Message({ code: "Success" }),
        data: {
          treatmentMasterList: [...response.recordset]
        },
        isSuccess,
        isValidate
      };
      res.json({ isSuccess, isValidate, ...result });
    }

    next()
  } catch (err) {
    console.log(err);
  }
})


/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /diseaseMaster/getDiseaseMaster Get Data from Treatment Master
 * @apiName GetData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /diseaseMaster/getDiseaseMaster
 *
 * @apiGroup Treatment Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Treatment Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {Number}  filterStatus, filterStatus is for filter the data by the data is Active or Not. //For Active Record:1//For InActive Record:0//For All Record:"All"
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "Status": 0,
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *    "isValidate": true,
 *    "validationList": [],
 *    "message": "You get data Successfully",
 *    "data": {
 *        "getAllDiseaseList": [
 *            {
                  "value": 1,
                  "label": yoga
 *            }
 *        ]
 *    },
 *    "isSuccess": true,
 *    "statusCode": 200
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
router.post(diseaseMaster_getDiseaseMasterFortreatment.url, async function (req, res, next) {
  try {
    const response = await getAllDisease();
    response.isValidate = true
    const { isSuccess, isValidate } = response
    if (isSuccess === true) {
      result = {
        data: {
          getAllDiseaseList: [...response.recordset]
        },
        isSuccess,
        isValidate
      };
      res.json({ isSuccess, isValidate, ...result });
    }

    next()
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;