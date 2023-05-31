const express = require("express");
const router = express.Router();

const {
  itemGetData,
  itemSaveData,
  itemDownloadData,
  itemUploadData
} = require("./itemMasterRepository");
const {
  payLoadValidation,
  sendResponse,
  getNoOfGroupShow
} = require("../../../utils");
const {
  itemMasterGetData,
  itemMasterAdd,
  itemMasterUpdate
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  itemMaster_getData: { url: getData },
  itemMaster_insertData: { url: insertData },
  itemMaster_updateData: { url: updateData },
  itemMaster_downloadData: { url: downloadData },
  itemMaster_uploadData: { url: uploadData }
} = require("../../../routerConstant");
const { getJSONFromExcel } = require("../../../uploadExcel");
const { imageUpload } = require("../../../uploadImageToServer");
const {
  imageFolderName: { itemFolderName }
} = require("../../../config.json");
const { fileMimeType } = require("../../../fileMimeTypeUtils");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /itemMaster/getData Get Data from Item Master
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /itemMaster/getData
 *
 * @apiGroup Item Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Item Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - divisionId and isActive is required
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "divisionId": 1,
 *        "isActive": 1,
 *        "page":1,
 *        "pageSize":10,
 *        "orderBy":"CompanyId",
 *        "orderDirection":"ASC",
 *        "search":"item"
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *      "itemList": [
 *            {
 *               "srNo": 1,
 *               "itemId": 1,
 *               "brand": "Acifresh syrup",
 *               "pack": 10,
 *               "uom":17,
 *               "uomValue": "GM",
 *               "boxSize": 24,
 *               "composition": "ALUMINIUM HYDROXIDE GEL 200MG + MAGNESIUM HYDRO GEL 200MG + SIMETHICON 20MG",
 *               "sch": "10+2",
 *               "schemeCodes": "SCHGR6D",
 *               "divisionId": 1,
 *               "divisionName": "OTC",
 *               "itemImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZBgszi9Xzi_UFuSwyysfxZoLHojiYt4vZOr4Ahp8d5GKR4h1T",
 *               "itemPriceId": 1,
 *               "mrp": 80,
 *               "ptr": 50,
 *               "pts": 48, //L166176
 *               "categoryName": "CategoryName1",
 *               "totalRecord": 125
 *           },
 *       ],
 *      "totalRecords": 11
 *    },
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
  getData,
  async function (req, res, next) {
    try {
      let result = {};
      const {
        totalRecords,
        startFrom,
        divisionId,
        isActive,
        page = 0,
        pageSize = 0,
        orderBy,
        orderDirection,
        search,
        loggedInEmployeeId,
        loggedInDivisionId,
        loggedInAppIndication
      } = req.body;
      const noOfGroupShow = await getNoOfGroupShow({ totalRecords, startFrom });

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: itemMasterGetData
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await itemGetData({
          loggedInEmployeeId,
          loggedInDivisionId,
          loggedInAppIndication,
          divisionId,
          isActive,
          page,
          pageSize,
          orderBy,
          orderDirection,
          search,
          noOfGroupShow
        });
        const { isSuccess } = response;
        const items = response && response[0];

        const totalRecords =
          response && response[0] && response[0].length != 0
            ? response[0][0].TotalRecord
            : 0;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              itemList: items,
              totalRecords: totalRecords
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
 * @api {post} /itemMaster/insertData Insert Data into Item Master
 * @apiName InsertData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /itemMaster/insertData
 *
 * @apiGroup Item Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into Item Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {json} Input Required
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "brand":"Item 11",
 *        "pack": "10 GM",
 *        "boxSize":"10",
 *        "composition":"Text",
 *        "categoryId":"1",
 *        "divisionId":"1",
 *        "itemImage":"image",
 *        "isActive":1,
 *        "itemPriceId":1,
 *        "mrp":"125.00",
 *        "ptr":"10",
 *        "pts":"8.00" //L166176
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "data": {
 *          "insertId": 2,
 *          "affectedRows": 1
 *       },
 *      "message": "Record Inserted Successfully",
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
      const bodyData = {
        ...req.body,
        itemId: 0,
        itemPriceId: 0,
        isActive: 1
      };
      const file = req.files ? req.files.file : undefined;
      const result = await itemMasterRequestHandler({
        bodyData,
        validatorData: itemMasterAdd,
        operationType: 0,
        file
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
 * @api {post} /itemMaster/updateData Update Data of Item Master
 * @apiName UpdateData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /itemMaster/updateData
 *
 * @apiGroup Item Master
 *
 * @apiDescription This API is Used to update data in Item Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - areaId and updatedDate is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "updatedDate":"2020-01-16 14:32:54",
 *      "itemId": 2,
 *      "brand" :"bb"
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
      const file = req.files ? req.files.file : undefined;
      const result = await itemMasterRequestHandler({
        bodyData: { ...req.body },
        validatorData: itemMasterUpdate,
        operationType: 1,
        file
      });
      req.result = { ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

const itemMasterRequestHandler = async ({
  bodyData,
  validatorData,
  operationType,
  file
}) => {
  let result = {};
  const isValidDataType = await payLoadValidation({
    bodyData: bodyData,
    payLoad: validatorData
  });
  const { isValidate, validationList } = isValidDataType;
  if (isValidate) {
      const response = await itemSaveData({
        data: JSON.stringify(bodyData),
        operationType
      });
      if (response[3] && response[3][0]["@op_IsSuccess"] === 1) {
        const messageResult = await getResponse({
          operationType,
          operationFlag: response[3][0]["@op_Flag"]
        });
        result = { ...messageResult };
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

const getResponse = async ({ operationType, operationFlag }) => {
  switch (operationType) {
    case 0:
      if (operationFlag === 1)
        result = { message: Message({ code: "RINS" }), isSuccess: true };
      else if (operationFlag === 2)
        result = { message: Message({ code: "DUPItem" }), isSuccess: false };
      break;
    case 1:
      if (operationFlag === 0)
        result = { message: Message({ code: "REFRESH" }), isSuccess: false };
      else if (operationFlag === 1)
        result = { message: Message({ code: "RUPD" }), isSuccess: true };
      else if (operationFlag === 2)
        result = { message: Message({ code: "DUPItem" }), isSuccess: false };
      break;
    case 2:
      if (operationFlag === 1)
        result = { message: Message({ code: "RDEL" }), isSuccess: true };
      else
        result = { message: Message({ code: "NOCHANGE" }), isSuccess: false };
  }
  return result;
};

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /itemMaster/downloadData Get Excel Data of Item  of Item Master
 * @apiName DownloadData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /itemMaster/downloadData
 *
 * @apiGroup Item Master
 *
 * @apiDescription This API is Used to get Data of Item for Sequence from Item Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *       "itemList": []
 *        },
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
  downloadData,
  async function (req, res, next) {
    try {
      const {
        divisionId
      } = req.body;
      let result = {};
      const response = await itemDownloadData({divisionId});
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            itemList: [...response]
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
 * @api {post} /itemMaster/uploadData Upload Excel Data of Item
 * @apiName UploadData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /itemMaster/uploadData
 *
 * @apiGroup Item Master
 *
 * @apiDescription This API is Used to Update Data of Item for Sequence from Item Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *       "itemList": []
 *        },
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
  uploadData,
  async function (req, res, next) {
    try {
      let result = {};
      const file = req.files ? req.files.file : undefined;
      if (file) {
        const mimeType = await fileMimeType({ file });
        const { ext } = mimeType;
        if (ext === "xls" || ext === "xlsx") {
          const columnToKey = {
            A: "divisionName",
            B: "id",
            C: "brand",
            D: "pack",
            E: "boxSize",
            F: "composition",
            G: "sch",
            H: "category",
            I: "mrp",
            J: "ptr",
            K: "sequence",
            L: "pts" //L166176
          };
          const fileResult = await getJSONFromExcel({ file, columnToKey });
          if (fileResult.Export && fileResult.Export.length > 0) {
            const response = await itemUploadData({ data: fileResult });
            const { isSuccess } = response;
            delete response.isSuccess;
            if (isSuccess === true) {
              result = {
                message: Message({ code: "FileUpload" }),
                data: {},
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
              message: Message({ code: "NODATAINEXCEL" }),
              isSuccess: false
            };
          }

          req.result = { isValidate: true, validationList: [], ...result };
        } else {
          const message = Message({ code: "INVALIDFILETYPE" });
          req.result = {
            message,
            isSuccess: true,
            isValidate: false,
            validationList: [{ file: message }],
            ...result
          };
        }
      } else {
        const message = Message({ code: "INVALPAYLOAD" });
        req.result = {
          message,
          isSuccess: true,
          isValidate: false,
          validationList: [{ file: message }],
          ...result
        };
      }
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

module.exports = router;
