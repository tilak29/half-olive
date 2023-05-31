const express = require("express");
const {
  leaveMaster_getData: { url: getData },
  leaveMaster_insertData: { url: insertData },
  leaveMaster_updateData: { url: updateData },
  leaveMaster_deleteData: { url: deleteData },
  monthlyExpenseSummary_getData: { url: getDataummary }
} = require("../../../routerConstant");
const router = express.Router();
const { getLeaveMaster,saveLeaveMaster, updateLeaveMaster, deleteLeaveMaster } = require('./leaveListMasterRepository')
const { sendResponse, payLoadValidation } = require("../../../utils");
const { Message } = require("../../../Messages");
const { handleError } = require("../../../error");
const {
  leaveMasterAdd,
  leaveMasterUpdate,
  leaveMasterDelete,
  leaveMasterGet
} = require("../../../dataType.json");

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /leaveMaster/getData Get Data from Leave Master
 * @apiName GetData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /leaveMaster/getData
 *
 * @apiGroup Leave Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Leave 
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {JSON} Input JSON Object - EmployeeId is required
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "EmployeeId": [],
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *    "isValidate": true,
 *    "validationList": [],
 *    "message": "You get data Successfully",
 *    "data": {
 *        "LeaveMasterList": [
 *            {
        "LeaveId": 6,
        "Category": "Sick Leave",
        "StartDate": "2022-08-11T00:00:00.000Z",
        "EndDate": "2022-08-14T00:00:00.000Z",
        "EmployeeId": 10112,
        "LeaveType": "half day",
        "Day": 4
      }
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
router.post(getData, async function (req, res, next) {
  try {
    let result = {};
    const bodyData = {
      ...req.body
    };
    
    const response = await getLeaveMaster({
      EmployeeId: bodyData.EmployeeId
    });
    
    

    const isValidDataType = await payLoadValidation({
      bodyData: bodyData,
      payLoad: leaveMasterGet
    });
    const { isValidate } = isValidDataType;
    const { isSuccess } = response
    if (isSuccess === true) {
      result = {
        message: Message({ code: "Success" }),
        data: {
          LeaveMasterList: [...response.recordset]
        },
        isSuccess,
        isValidate
      };
      res.json({ isSuccess, isValidate, ...result });
    }else {
      result = {
        message: Message({}),
        isSuccess: false
      };
  } 

    next()
  } catch (err) {
    console.log(err);
    handleError(e, res);
  }
},
  sendResponse
)


/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /leaveMaster/insertData Insert Data into Leave
 * @apiName insertData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /leaveMaster/insertData
 *
 * @apiGroup Leave 
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into Leave
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {JSON} Input JSON Object - Category,StartDate,EndDate,Reason,EmployeeId and LeaveType are required
 *
 * @apiParamExample {json} Input (body/json)
 *     {
        "Category": "Sick Leave",
        "StartDate": "2022-08-11",
        "EndDate": "2022-08-14",
        "Reason": "fever",
        "EmployeeId": 4,
        "LeaveType": "half day",
        "Day": 4
      }
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
  insertData,
  async function (req, res, next) {
    try {
      var result = {};
      const bodyData = {
        ...req.body
      };
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: leaveMasterAdd
      });

      const { isValidate, validationList } = isValidDataType;

      if (isValidate) {

        const response = await saveLeaveMaster({
          data: JSON.stringify(bodyData)
        });
        if (response && response.isSuccess) {
          if(response.recordset[0].Count == 1){
            result = { message: Message({ code: "DUPLEAVE" }), isSuccess: false };
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
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /leaveMaster/updateData Update Data of Leave
 * @apiName updateData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /leaveMaster/updateData
 *
 * @apiGroup Leave
 *
 * @apiDescription This API is Used to update data in Leave
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - Category,StartDate,EndDate,Reason,LeaveId and LeaveType are required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
        "Category": "Sick Leave",
        "StartDate": "2022-08-11",
        "EndDate": "2022-08-14",
        "Reason": "fever",
        "LeaveId": 4,
        "LeaveType": "half day",
        "Day": 4
      }
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
        ...req.body
      };
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: leaveMasterUpdate
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await updateLeaveMaster({
          data: bodyData
        });

        if (response && response.isSuccess) {
          result = { message: Message({ code: "RUPD" }), isSuccess: true };

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
 * @api {post} /leaveMaster/deleteData Delete Data of leave
 * @apiName DeleteData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /leaveMaster/deleteData
 *
 * @apiGroup Leave
 *
 * @apiDescription This API is Used to delete data in Leave
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - LeaveId is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "LeaveId": 5
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
  deleteData,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body
      };

      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: leaveMasterDelete
      });
      const { isValidate, validationList } = isValidDataType;
      // const isValidate = validationList = true
      if (isValidate) {
        const response = await deleteLeaveMaster({
          data: bodyData
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

module.exports = router;