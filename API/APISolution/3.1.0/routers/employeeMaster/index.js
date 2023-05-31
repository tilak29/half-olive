const express = require("express");
const router = express.Router();

const {
  employeeGetData,
  employeeSaveData,
  mobileOwnerNameGetData,
  SingleEmployeeData
} = require("./employeeMasterRepository");
const {
  payLoadValidation,
  sendResponse,
  getNoOfGroupShow,
  designationDetails
} = require("../../../utils");
const {
  employeeMasterAdd,
  employeeMasterUpdate,
  employeeMasterGetData
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  employeeMaster_getData: { url: getData },
  employeeMaster_insertData: { url: insertData },
  employeeMaster_updateData: { url: updateData },
  employeeMaster_getMobileOwnerName: { url: getDuplicateMobileMessage },
  employeeMaster_getSingleEmployeeData: { url: getSingleEmployeeData }
} = require("../../../routerConstant");
const {
  staticData: { EmployeeStatus_Active },
  ReportingPeriod,
  IsFirstTimePasswordChanged
} = require("../../../config.json");
const { genJti } = require("../../.././jwt-token");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /employeeMaster/getData Get Data from Employee Master
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /employeeMaster/getData
 *
 * @apiGroup Employee Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Employee Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - stateId is required
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "stateId" : 12,
 *        "designationId":1,
 *        "divisionId":1,
 *        "status":8
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *        "employeeList": [
 *            {
 *                "employeeId":3,
 *                "firstName": "Khushbu",
 *                "fatherName": null,
 *                "lastName": "Shah",
 *                "email": "khushbu.shah@spec-india.com",
 *                "mobileNumber": "9409261193",
 *                "address": null,
 *                "dob": null,
 *                "doj": null,
 *                "doa": null,
 *                "gender": null,
 *                "divisionId": 1,
 *                "divisionName": "Division1234",
 *                "designationId": 1,
 *                "designationCode": "Admin",
 *                "countryId": 1,
 *                "countryName": "India",
 *                "stateId": 12,
 *                "stateName": "Gujarat",
 *                "cityId": 1,
 *                "cityName": "Ahmedabad",
 *                "pinCode": null,
 *                "doc": null,
 *                "dor": null,
 *                "fnFDate": null,
 *                "status": 8,
 *                "resignationReason": null,
 *                "remarks": null,
 *                "updatedDate": null,
 *                "employeeName": "Khushbu Shah (Admin | Ahmedabad | OTC | Gujarat)"
 *           },
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
      const {
        stateId,
        designationId,
        divisionId,
        status = EmployeeStatus_Active,
        totalRecords,
        startFrom,
        loggedInDivisionId
      } = req.body;
      console.log("divisionId :: ", divisionId);
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: employeeMasterGetData
      });

      // let condition = "";
      // if (designationId && designationId !== "") {
      //   condition = ` ${condition} and E.DesignationId = ${designationId} `;
      // }
      // if (divisionId && divisionId !== "") {
      //   condition = ` ${condition} and E.DivisionId in (select splitvalue from dbo.Split(${divisionId},','))`;
      // }
      // else {
      //   condition = ` ${condition} and E.DivisionId in (select splitvalue from dbo.Split(${loggedInDivisionId},','))`;
      // }
      // if (status && status !== "") {
      //   condition = ` ${condition} and E.Status=${status} `;
      // }


      let condition = "";

      if (designationId == "") {
        if (divisionId && divisionId !== "") {
          condition = `and DI.DivisionId in (select splitvalue from dbo.Split(${divisionId},','))`;
        }
        if (divisionId == "") {
          condition = `and DI.DivisionId in (select splitvalue from dbo.Split(E.DivisionId,','))`;
        }
      } else {
        if (divisionId && divisionId !== "") {
          condition = `and E.DesignationId = ${designationId} and DI.DivisionId in (select splitvalue from dbo.Split(${divisionId},','))`;
        }
        if (divisionId == "") {
          condition = `and E.DesignationId = ${designationId} and DI.DivisionId in (select splitvalue from dbo.Split(E.DivisionId,','))`;
        }
      }


      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const noOfGroupShow = await getNoOfGroupShow({
          totalRecords,
          startFrom
        });
        const response = await employeeGetData({
          stateId,
          condition,
          noOfGroupShow,
          status,
          divisionId
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              employeeList: [...response.recordset]
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
 * @api {post} /employeeMaster/insertData Insert Data into Employee Master
 * @apiName InsertData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /employeeMaster/insertData
 *
 * @apiGroup Employee Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into Employee Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json) In
 *      {
 *          "firstName": "Khushbu",
 *          "lastName": "Shah",
 *          "fatherName": "SandipBhai",
 *          "dob": "2020-02-21",
 *          "stateId": "12",
 *          "cityId": "15",
 *          "designationId": "1",
 *          "mobileNumber": "1234567890"
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
  insertData,
  async function (req, res, next) {
    try {
      const bodyData = {
        ...req.body,
        employeeId: 0,
        password: genJti(4, true),
        status: EmployeeStatus_Active,
        reportingPeriod: ReportingPeriod,
        isFirstTimePasswordChanged: IsFirstTimePasswordChanged
      };

      const result = await employeeMasterRequestHandler({
        bodyData,
        validatorData: employeeMasterAdd,
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

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /employeeMaster/updateData Update Data of Employee Master
 * @apiName UpdateData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /employeeMaster/updateData
 *
 * @apiGroup Employee Master
 *
 * @apiDescription This API is Used to update data in Employee Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - employeeId and updatedDate is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "employeeId":3,
 *      "updatedDate":"2020-01-16 14:32:54",
 *      "cityId": 2,
 *      "cityName" :"bb",
 *      "stateId":12
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
 *   }
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
      const result = await employeeMasterRequestHandler({
        bodyData: {
          ...req.body
        },
        validatorData: employeeMasterUpdate,
        operationType: 1
      });
      req.result = { ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

const employeeMasterRequestHandler = async ({
  bodyData,
  validatorData,
  operationType
}) => {
  let result = {};

  const { managerId, designationId } = bodyData;
  const adminNSLDesignation = JSON.parse(
    designationDetails[0].filter((x) => x.Code === "ADMIN_NSL_DESIGNATIONS")[0]
      .Value
  );
  const newBodyData = {
    ...bodyData,
    managerId:
      designationId &&
        adminNSLDesignation &&
        adminNSLDesignation.includes(designationId)
        ? 0
        : managerId
  };
  const isValidDataType = await payLoadValidation({
    bodyData: newBodyData,
    payLoad: validatorData
  });
  const { isValidate, validationList } = isValidDataType;

  if (isValidate) {
    const response = await employeeSaveData({
      data: JSON.stringify(newBodyData),
      operationType
    });
    if (response && response.isSuccess) {
      // const messageResult = await getResponse({
      //   operationType,
      //   operationFlag: response[3][0]["@op_Flag"]
      // });
      result = { message: Message({ code: "RINS" }), isSuccess: true };
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
  result = { isValidate, validationList, ...result };
  return result;
};

const getResponse = async ({ operationType, operationFlag }) => {
  let result = {};
  switch (operationType) {
    case 0:
      if (operationFlag === 1)
        result = { message: Message({ code: "RINS" }), isSuccess: true };
      else if (operationFlag === 2)
        result = {
          message: Message({ code: "DUPEMPLOYEE" }),
          isSuccess: false
        };
      else if (operationFlag === 3)
        result = {
          message: Message({ code: "DUPUser" }),
          isSuccess: false
        };
      break;

    case 1:
      if (operationFlag === 0)
        result = { message: Message({ code: "REFRESH" }), isSuccess: false };
      else if (operationFlag === 1)
        result = { message: Message({ code: "RUPD" }), isSuccess: true };
      else if (operationFlag === 2)
        result = {
          message: Message({ code: "DUPEMPLOYEE" }),
          isSuccess: false
        };
      else if (operationFlag === 3)
        result = {
          message: Message({ code: "DUPUser" }),
          isSuccess: false
        };
      break;
  }
  return result;
};

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /employeeMaster/getMobileOwnerName get Name of user with which mobile number is associated
 * @apiName getMobileOwnerName
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /employeeMaster/getMobileOwnerName
 *
 * @apiGroup Employee Master
 *
 * @apiDescription This API is Used to get get Name of user with which mobile number is associated
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - mobileNumber
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "mobileNumber":9426316125
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
 *   }
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
  getDuplicateMobileMessage,
  async function (req, res, next) {
    try {
      let result = {};
      const { mobileNumber } = req.body;
      const response = await mobileOwnerNameGetData({ mobileNumber });
      const { isSuccess } = response;
      if (isSuccess && response[1]) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            messageText: response[1][0]["@Name"]
          },
          isSuccess
        };
      }
      else {
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

router.post(
  getSingleEmployeeData,
  async function (req, res, next) {
    try {
      let result = {};
      BodyData = {
        ...req.body
      }
      console.log("BodyData ::: ",BodyData);
      const response = await SingleEmployeeData({ 
        loggedInReferenceId:BodyData.loggedInReferenceId 
      });
      const { isSuccess } = response;
      if (isSuccess && response) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            singleemployee: [...response.recordset]
          },
          isSuccess
        };
      }
      else {
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



module.exports = router;
