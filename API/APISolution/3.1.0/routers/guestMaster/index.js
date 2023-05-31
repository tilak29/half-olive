const express = require("express");
const router = express.Router();
const fs = require("fs");
const fse = require("fs-extra");
const mineType = require('mime-types')
const {
  guestGetData,
  guestSaveData,
  latestGuestId,
  getFiles
} = require("./guestMasterRepository");
const {
  payLoadValidation,
  sendResponse,
  getNoOfGroupShow,
  designationDetails
} = require("../../../utils");
const {
  guestMasterAdd,
  guestMasterUpdate,
  guestMasterGetData
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  guestMaster_getData: { url: getData },
  guestMaster_insertData: { url: insertData },
  guestMaster_updateData: { url: updateData },
  guestUploadFile_getUploadFileData:{url:getUploadFiles},
  guestUploadFile_downloadFile:{url:downloadFiles}
} = require("../../../routerConstant");
const {
  staticData: { EmployeeStatus_Active },
  ReportingPeriod,
  IsFirstTimePasswordChanged,
  imageFolderName:{mainFolderName,innerFolder}
} = require("../../../config.json");
const { genJti } = require("../../.././jwt-token");
const { handleError } = require("../../../error.js");

router.post(
  downloadFiles,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {...req.body} ;
      let currFile = process.cwd() + mainFolderName + innerFolder + `/${(bodyData.url).split('/')[5]}` +`/${(bodyData.url).split('/')[6]}`;
      let fileName = (bodyData.url).split('/')[6];
      let data  = fs.readFileSync(currFile,{encoding : "base64"});
      let base64 ='data:' + mineType.lookup(currFile) + ';base64,' + data;
        const isSuccess = true
          result = {
            message: Message({ code: "Success" }),
            data: {
              UploadedFiles: base64
            },
            isSuccess
          };
      req.result = { isValidate: true, validationList: [], ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
)

router.post(
  getUploadFiles,
  async function (req, res, next) {
    try {
      let result = {};
      const {
        guestId
      } = req.body;
        const response = await getFiles({guestId});
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              UploadedFiles: [...response.recordset]
            },
            isSuccess
          };
        } else {
          result = {
            message: Message({}),
            isSuccess: true
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
        stateId
      } = req.body;

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: guestMasterGetData
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {

        const response = await guestGetData({
          stateId
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              guestList: [...response.recordset]
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
        guestId: 0
      };
      const file = {
        ...req.files
      }
      const result = await guestMasterRequestHandler({
        bodyData,
        validatorData: guestMasterAdd,
        operationType: 0
      });
      if(result.isSuccess)
      {
        const results = await addKycFile({
          file,
          operationType:0
        })
        req.result = { ...results };
      }
      else
      {
        req.result = { ...result };
      }
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
      const bodyData = {
        ...req.body,
      };
      const file = {
        ...req.files
      }
      let guestId = bodyData.guestId;
      let fileNames= (bodyData.file).split(',');

      const result = await guestMasterRequestHandler({
        bodyData,
        validatorData: guestMasterUpdate,
        operationType: 1
      });
      if(result.isSuccess)
      {
        const results = await addKycFile({
          file,
          fileNames,
          guestId,
          operationType:1
        })
        req.result = { ...results };
      }
      else
      {
        req.result = { ...result };
      }
      // req.result = { ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

const guestMasterRequestHandler = async ({
  bodyData,
  validatorData,
  operationType
}) => {
  let result = {};
  const isValidDataType = await payLoadValidation({
    bodyData: bodyData,
    payLoad: validatorData
  });
  const { isValidate, validationList } = isValidDataType;

  if (isValidate) {
    const response = await guestSaveData({
      data: JSON.stringify(bodyData),
      operationType
    });
    if (response && response.isSuccess) {
      if (operationType === 0) {
        result = { message: Message({ code: "RINS" }), isSuccess: true };
      }
      else if (operationType === 1) {
        result = { message: Message({ code: "RUPD" }), isSuccess: true };
      }
      if (operationType === 2) {
        result = { message: Message({ code: "RDEL" }), isSuccess: true };
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

const addKycFile = async ({
  file,
  operationType,
  guestId,
  fileNames,
}) => {
  // console.log(guestId)
  let result = {};
  const response = await latestGuestId({});
  // console.log(response,file,operationType);
  // result = { message: Message({ code: "RINS" }), isSuccess: true };
  if(response && response.isSuccess)
  {
    // let error
    if(operationType == 0)
    {
        var publicpath = process.cwd() + mainFolderName + innerFolder;
        var staticpath = publicpath ;
        fs.mkdir(staticpath + `/${response.recordset[0].GuestId}/`, function (err) {
        if (!err) {
        //   console.log(err)
        // } else {
          let storepath = staticpath + `/${response.recordset[0].GuestId}/`
        Object.keys(file).forEach(keys =>{
          var fileName = file[keys].name;
            file[keys].mv(storepath + fileName)
        })
      }
    });
      result = { message: Message({ code: "RINS" }), isSuccess: true };
    }
    else if(operationType == 1)
    { 
        var publicpath = process.cwd() + mainFolderName + innerFolder;
        var staticpath = publicpath + `/${guestId}/`;
        if(fs.existsSync(staticpath))
        {
          // for add a new file
          Object.keys(file).forEach(keys =>{
            var fileName = file[keys].name;
              file[keys].mv(staticpath + fileName)
          })
          //for delete a file
          let files = fs.readdirSync(staticpath)
          let deleteFile = files.filter(x => fileNames.indexOf(x) === -1);
          if(deleteFile.length!=0)
          {
            deleteFile.map((item) =>{
              let deletefiles = staticpath + `/${item}`;
              fs.unlinkSync(`${deletefiles}`);
            })
          }
        }
        else
        {
          fs.mkdir(publicpath + `/${guestId}/`, function (err) {
            if (!err) {
              let storepath = staticpath
            Object.keys(file).forEach(keys =>{
              var fileName = file[keys].name;
                file[keys].mv(storepath + fileName)
            })}
        })
        }
        result = { message: Message({ code: "RUPD" }), isSuccess: true };
    }
    else
    {
      result = {
        message: Message({ code: "INVALPAYLOAD" }),
        isSuccess: false,
        ...result
      };
    }
  }
  else
  {
    result = {
      message: Message({ code: "INVALPAYLOAD" }),
      isSuccess: false,
      ...result
    };
  }
  result = { isValidate: true, validationList : [], ...result };
  return result;
};

// const getResponse = async ({ operationType, operationFlag }) => {
//   let result = {};
//   switch (operationType) {
//     case 0:
//       if (operationFlag === 1)
//         result = { message: Message({ code: "RINS" }), isSuccess: true };
//       else if (operationFlag === 2)
//         result = {
//           message: Message({ code: "DUPEMPLOYEE" }),
//           isSuccess: false
//         };
//       else if (operationFlag === 3)
//         result = {
//           message: Message({ code: "DUPUser" }),
//           isSuccess: false
//         };
//       break;

//     case 1:
//       if (operationFlag === 0)
//         result = { message: Message({ code: "REFRESH" }), isSuccess: false };
//       else if (operationFlag === 1)
//         result = { message: Message({ code: "RUPD" }), isSuccess: true };
//       else if (operationFlag === 2)
//         result = {
//           message: Message({ code: "DUPEMPLOYEE" }),
//           isSuccess: false
//         };
//       else if (operationFlag === 3)
//         result = {
//           message: Message({ code: "DUPUser" }),
//           isSuccess: false
//         };
//       break;
//   }
//   return result;
// };




module.exports = router;
