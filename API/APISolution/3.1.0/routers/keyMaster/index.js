const express = require("express");
const router = express.Router();

const { getKeyMaster, saveKeyMaster } = require("./keyMasterRepository");
const { sendResponse, payLoadValidation } = require("../../../utils");
const { Message } = require("../../../Messages");
const {
  keyMaster_getKeyMaster: { url: getKeyMasterApi },
  keyMaster_saveKeyMaster: { url: saveKeyMasterApi },
} = require("../../../routerConstant");
const { keyMasterSave } = require("../../../dataType.json");
const { handleError } = require("../../../error.js");

/**
 * AUTOCODEUTILITY - Add comment here
 */
router.post(
  getKeyMasterApi,
  async function (req, res, next) {
    try {
      let result = {};
      const { filterStatus } = req.body;
      const response = await getKeyMaster({ filterStatus });
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            keyMasterList: [...response.recordset],
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
 * AUTOCODEUTILITY - Add comment here
 */
router.post(
  saveKeyMasterApi,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body,
      };

      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: keyMasterSave,
      });
      const { isValidate, validationList } = isValidDataType;
      const operationType = bodyData.keyId ? 1 : 0;
      if (isValidate) {
        const response = await saveKeyMaster({
          data: JSON.stringify(bodyData),
          operationType,
        });

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
      req.result = { isValidate: true, validationList: [], ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

module.exports = router;
