const express = require("express");
const router = express.Router();

const {
  getAmenityMaster,
  saveAmenityMaster,
} = require("./amenityMasterRepository");
const { sendResponse,payLoadValidation } = require("../../../utils");
const { Message } = require("../../../Messages");
const {
  amenityMaster_getAmenityMaster: { url: getAmenityMasterApi },
  amenityMaster_saveAmenityMaster: { url: saveAmenityMasterApi },
} = require("../../../routerConstant");
const {
  amenityMasterSave
} = require("../../../dataType.json");
const { handleError } = require("../../../error.js");

/**
 * AUTOCODEUTILITY - Add comment here
 */
router.post(
  getAmenityMasterApi,
  async function (req, res, next) {
    try {
      let result = {};
      const { filterStatus } = req.body;
      
      const response = await getAmenityMaster({filterStatus});
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {        
        result = {
          message: Message({ code: "Success" }),
          data: {
            amenityMasterList: [...response.recordset]
          },
          isSuccess
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
 * AUTOCODEUTILITY - Add comment here
 */
router.post(
  saveAmenityMasterApi,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body
      };
     
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: amenityMasterSave
      });
      const { isValidate, validationList } = isValidDataType;
      const operationType = bodyData.amenityId ? 1 : 0;
      if (isValidate) {
        const response = await saveAmenityMaster({
          data: JSON.stringify(bodyData)
        ,operationType});

        if (response && response.isSuccess) {
          // const messageResult = await getResponse({
          //   operationType,
          //   operationFlag: response[3][0]["@op_Flag"]
          // });
          result = { message: Message({ code: "RINS" }), isSuccess: true };
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
