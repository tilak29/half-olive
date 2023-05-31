const express = require("express");
const router = express.Router();

const { getRoomCategory, saveRoomCategory } = require("./roomCategoryRepository");
const { sendResponse,payLoadValidation } = require("../../../utils");
const {
  roomCategorySave
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {

  roomCategory_getRoomCategory: { url: getRoomCategoryApi }, roomCategory_insertRoomCategory: { url: insertRoomCategoryApi }

} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
  * AUTOCODEUTILITY - Add comment here
  */
router.post(
  getRoomCategoryApi,
  async function (req, res, next) {
    try {
      let result = {};
      const { effectiveDate } = req.body;

      const response = await getRoomCategory(effectiveDate);
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            roomCategoryList: [...response.recordset]
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
;/**
      * AUTOCODEUTILITY - Add comment here
      */

router.post(
  insertRoomCategoryApi,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body
      };
     
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: roomCategorySave
      });
      const { isValidate, validationList } = isValidDataType;
      const operationType = bodyData.roomCategoryId ? 1 : 0;
      if (isValidate) {
        const response = await saveRoomCategory({
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
