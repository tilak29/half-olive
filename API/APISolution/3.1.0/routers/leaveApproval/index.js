const express = require("express");
const router = express.Router();

const {
  getApprovalLeave, updateApprovalLeave
} = require("./leaveApprovalRepository");
const {
  payLoadValidation,
  sendResponse,
  getNoOfGroupShow
} = require("../../../utils");
const { Message } = require("../../../Messages");
const {
  approvalLeave_getData: { url: getLeave },
  approvalLeave_updateData: { url: updateLeave },
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /leaveApproval/getApprovalLeave Get Data from Leave Approval
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /leaveApproval/getApprovalLeave
 *
 * @apiGroup Leave Approval
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Leave Approval
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {Number}  totalRecords Optional By Default 10 records are sent,If all records are required send 0.
 * @apiParam (Request body) {Number}  startFrom Optional If user want to get data from specific id then this filed is used.
 *
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "totalRecords": 0,
 *        "startFrom": 10
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *     {
            "isValidate": true,
            "validationList": [],
            "message": "Data received successfully.",
            "data": {
              "leaveList": [
                {
                  "leaveId": 48,
                  "employeeName": "testName lanme",
                  "leaveStatus": 28,
                  "reason": "dfsadasd",
                  "category": "Casual Leave",
                  "startDate": "2022-09-06T00:00:00.000Z",
                  "endDate": "2022-09-07T00:00:00.000Z",
                  "leaveType": "Full Day",
                  "day": 2,
                  "staticName": "Request",
                  "createdDate": "2022-08-09T15:25:00.000Z"
                },
              ]
            },
            "isSuccess": true,
            "statusCode": 200
          }
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
  getLeave,
  async function (req, res, next) {
    try {
      let result = {};
      const { totalRecords, startFrom } = req.body;
      const noOfGroupShow = await getNoOfGroupShow({ totalRecords, startFrom });
      const response = await getApprovalLeave({
        noOfGroupShow
      });

      const { isSuccess } = response;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            leaveList: [...response.recordset]
          },
          isSuccess
        };
      } else {
        result = {
          message: Message({}),
          isSuccess: false
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
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /leaveApproval/updateApprovalLeave Update Data of Leave Approval
 * @apiName UpdateData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /leaveApproval/updateApprovalLeave
 *
 * @apiGroup Leave Approval
 *
 * @apiDescription This API is Used to update data in Leave Approval
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - leaveId and updatedStatus is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "leaveStatus":"Approved",
 *      "leaveId": 49,
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
  updateLeave,
  async function (req, res, next) {
    try {
      const result = await approvalHandlerLeave({
        bodyData: { ...req.body },
        operationType: 0
      });
      req.result = { ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },

  sendResponse
);


const approvalHandlerLeave = async ({
  bodyData,
  operationType
}) => {
  let result = {};
  const isValidDataType = await payLoadValidation({
    bodyData: bodyData,
  });
  const { isValidate, validationList } = isValidDataType;

  if (isValidate) {
    const response = await updateApprovalLeave({
      data: JSON.stringify(bodyData),
      operationType
    });
    if (response && response.isSuccess) {
      if (operationType === 0) {
        result = { message: Message({ code: "RUPD" }), isSuccess: true };
      }
    } else {
      result = {
        message: Message({}),
        isSuccess: false
      };
    }
  }
  else {
    result = {
      message: Message({ code: "INVALPAYLOAD" }),
      isSuccess: true,
      ...result
    };
  }
  result = { isValidate, validationList, ...result };
  return result;
};

module.exports = router;