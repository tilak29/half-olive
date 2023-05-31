const express = require("express");
const router = express.Router();

const {
  getRoomMaster,
  saveRoomMaster,
  getRoomCategories,
  getKeyList,
} = require("./roomMasterRepository");
const { sendResponse,payLoadValidation } = require("../../../utils");
const {
  roomMasterSave
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  roomMaster_getRoomMaster: { url: getRoomMasterApi },
  roomMaster_saveRoomMaster: { url: saveRoomMasterApi },
  roomMaster_getRoomCategories: { url: getRoomCategoriesApi },
  roomMaster_getKeyList: { url: getKeyListApi },
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * AUTOCODEUTILITY - Add comment here
 */
router.post(
  getRoomMasterApi,
  async function (req, res, next) {
    try {
      let result = {};
      const { filterCategory, filterStatus, filterRoomStatus } = req.body;
      
      const response = await getRoomMaster({filterCategory,filterStatus,filterRoomStatus});
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {        
        result = {
          message: Message({ code: "Success" }),
          data: {
            roomMasterList: [...response.recordset]
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
  saveRoomMasterApi,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body
      };
     console.log("bodyData :: ",bodyData);
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: roomMasterSave
      });
      const { isValidate, validationList } = isValidDataType;
      const operationType = bodyData.roomId ? 1 : 0;
      if (isValidate) {
        const response = await saveRoomMaster({
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
/**
 * AUTOCODEUTILITY - Add comment here
 */
router.post(
  getRoomCategoriesApi,
  async function (req, res, next) {
    try {
      let result = {};
      const {} = req.body;
      const response = await getRoomCategories();
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            roomCategoryList: [...response.recordset],
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
  getKeyListApi,
  async function (req, res, next) {
    try {
      let result = {};
      const {} = req.body;
      const response = await getKeyList();
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            keyList: [...response.recordset],
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

module.exports = router;
