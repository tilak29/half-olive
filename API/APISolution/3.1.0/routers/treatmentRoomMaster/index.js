const express = require("express");
const router = express.Router();
const {
  getTreatmentroommaster,
  getTherapistList,
  saveTreatmentRoomMaster,
  updateTreatmentMasterRoom,
  deleteTreatmentroommaster,
} = require("./treatmentRoomMasterRepository");
const { payLoadValidation, sendResponse } = require("../../../utils");
const { Message } = require("../../../Messages");
const {
  TreatmentRoomMasterAdd,
  TreatmentRoomMasterDelete,
} = require("../../../dataType.json");
const {
  treatmentRoomMaster_getData: { url: getData },
  treatmentRoomMaster_getTherapistForTreatmentRoom: {
    url: getTherapistListData,
  },
  treatmentRoomMaster_insertData: { url: insertData },
  treatmentRoomMaster_updateData: { url: updateData },
  treatmentRoomMaster_deleteData: { url: deleteTreatmentroommasterData },
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /treatmentRoomMaster/getData Get Data from Treatment Room Master
 * @apiName getData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatmentRoomMaster/getData
 *
 * @apiGroup Treatment Room Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Treatment Room Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {Number}  filterStatus, filterStatus is for filter the data by the data is Active or Not. //For Active Record:1//For InActive Record:0//For All Record:isActive
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "filterStatus": 0,
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *    "isValidate": true,
 *    "validationList": [],
 *    "message": "You get data Successfully",
 *    "data": {
 *        "treatmentRoomMaster": [
 *           {
 *             "treatmentRoomId": 1,
 *             "roomName": "A",
 *             "description": "This is A Room",
 *             "employeeId": "10123",
 *             "locationId": 34,
 *             "active": "Yes",
 *             "isActive": true,
 *             "employeeName": "Dileep Patel",
 *             "locationName": "ABCD",
 *             "treatmentName": " mud bath, yoga, exercise, sirodhara, gym",
 *             "treatmentId": "[88,89,83,100,82,85]"
 *           }
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
router.post(
  getData,
  async function (req, res, next) {
    try {
      let result = {};
      const { filterStatus } = req.body;
      const response = await getTreatmentroommaster({ filterStatus });
      const { isSuccess } = response;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            treatmentRoomMaster: [...response.recordset],
          },
          isSuccess,
        };
      } else {
        result = {
          message: Message({}),
          isSuccess: false,
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

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /treatmentRoomMaster/getTherapistForTreatmentRoom Get Data  of Therapist Name For Treatment Room Master
 * @apiName GetData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatmentRoomMaster/getTherapistForTreatmentRoom
 *
 * @apiGroup Employee Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Therapist Name For Treatment Room Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *    "isValidate": true,
 *    "validationList": [],
 *    "message": "You get data Successfully",
 *    "data": {
 *        "therapistList": [
 *     {
 *       "value": 10123,
 *       "label": "Dileep Patel"
 *     }
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
router.post(
  getTherapistListData,
  async function (req, res, next) {
    try {
      let result = {};
      const response = await getTherapistList();
      const { isSuccess } = response;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            TherapistList: [...response.recordset],
          },
          isSuccess,
        };
      } else {
        result = {
          message: Message({}),
          isSuccess: false,
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

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /treatmentRoomMaster/saveData Insert Data into Treatment Room Master
 * @apiName InsertData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatmentRoomMaster/saveData
 *
 * @apiGroup Treatment Room Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into Treatment Room Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {String}  roomName Required Enter Room name
 * @apiParam (Request body) {String}  locationId Required Enter locationId
 * @apiParam (Request body) {String}  TreatmentId Required Enter TreatmentId
 * @apiParam (Request body) {Boolean} isActive  Status
 *
 * @apiParamExample {json} Input (body/json)
 *     {
 *      "roomName":"test",
 *      "description":"",
 *      "locationId": 10,
 *      "employeeId":"",
 *      "TreatmentId": 1,
 *      "isActive": true,
 *     }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *       "isValidate": true,
 *       "validationList": [],
 *        "message": "Record inserted successfully.",
 *        "isSuccess": true,
 *        "statusCode": 200,
 *        "data": {
 *           "insertId": 2,
 *           "affectedRows": 1
 *       }
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
  insertData,
  async function (req, res, next) {
    try {
      var result = {};
      const bodyData = {
        ...req.body,
      };
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: TreatmentRoomMasterAdd,
      });

      const { isValidate, validationList } = isValidDataType;

      if (isValidate) {
        const response = await saveTreatmentRoomMaster({
          data: JSON.stringify(bodyData),
        });

        if (response && response.isSuccess) {
          if (response.recordset[0].Count == 1) {
            result = {
              message: Message({ code: "DUPTREATMENTROOM" }),
              isSuccess: false,
            };
          } else {
            result = { message: Message({ code: "RINS" }), isSuccess: true };
          }
        } else {
          result = {
            message: Message({}),
            isSuccess: false,
          };
        }
      } else {
        result = {
          message: Message({ code: "INVALPAYLOAD" }),
          isSuccess: true,
          ...result,
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
 * @api {post} /treatmentRoomMaster/updateData Update Data of Treatment Room Master
 * @apiName UpdateData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatmentRoomMaster/updateData
 *
 * @apiGroup Treatment Room Master
 *
 * @apiDescription This API is Used to update data in Treatment Room Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {String}  roomName Required Enter Room name
 * @apiParam (Request body) {String}  locationId Required Enter locationId
 * @apiParam (Request body) {String}  TreatmentId Required Enter TreatmentId
 * @apiParam (Request body) {Boolean} isActive Status
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "roomName":"test",
 *      "description":"",
 *      "locationId": 10,
 *      "employeeId":"",
 *      "TreatmentId": 1,
 *      "isActive": true,
 *      "updatedDate":"2022-07-22 10:44:00",
 *      "isActive" :true,
 *    }
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
  updateData,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body,
      };

      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: TreatmentRoomMasterAdd,
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await updateTreatmentMasterRoom({
          data: JSON.stringify(bodyData),
        });

        if (response && response.isSuccess) {
          result = { message: Message({ code: "RUPD" }), isSuccess: true };
        } else {
          result = {
            message: Message({}),
            isSuccess: false,
          };
        }
      } else {
        result = {
          message: Message({ code: "INVALPAYLOAD" }),
          isSuccess: true,
          ...result,
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
 * @api {post} /treatmentRoomMaster/deleteData Delete Data of Treatment Room Master
 * @apiName DeleteData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatmentRoomMaster/deleteData
 *
 * @apiGroup Treatment Room Master
 *
 * @apiDescription This API is Used to delete data in Treatment Room Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - TreatmentRoomId is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "TreatmentRoomId": 5
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
  deleteTreatmentroommasterData,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body,
      };
      const data = {
        TreatmentRoomId: bodyData.treatmentRoomId,
        loggedInUserId: bodyData.loggedInUserId,
      };

      const isValidDataType = await payLoadValidation({
        bodyData: data,
        payLoad: TreatmentRoomMasterDelete,
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await deleteTreatmentroommaster({
          data,
        });

        if (response && response.isSuccess) {
          result = { message: Message({ code: "RDEL" }), isSuccess: true };
        } else {
          result = {
            message: Message({}),
            isSuccess: false,
          };
        }
      } else {
        result = {
          message: Message({ code: "INVALPAYLOAD" }),
          isSuccess: true,
          ...result,
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
