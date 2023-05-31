const express = require("express");
const router = express.Router();

const { sendResponse, payLoadValidation } = require("../../../utils");
const { Message } = require("../../../Messages");
const {
  therapySlot_getData: { url: getSlot },
  therapySlot_saveData: { url: saveSlot },
  therapySlot_deleteData: { url: deleteSlot },
  therapyType_typeData : { url : getTherapy}
} = require("../../../routerConstant");
const { therapySlotMaster } = require("../../../dataType.json");
const { handleError } = require("../../../error.js");
const { saveTherapySlot, getTherapySlot, getTherapyCategory } = require("./therapySlotRepository");


router.post(
  getSlot,
  async function (req, res, next) {
    try {
      let result = {};
      const { filterStatus , filterTherapy } = req.body;
      const response = await getTherapySlot({ filterStatus , filterTherapy });
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            therapySlot: [...response.recordset],
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

router.post(
  getTherapy,
  async function (req, res, next) {
    try {
      let result = {};
      const {} = req.body;
      const response = await getTherapyCategory();
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            therapyCategory: [...response.recordset],
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

router.post(
  saveSlot,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body,
      };

      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        // payLoad: therapySlotMaster,
      });
      const { isValidate, validationList } = isValidDataType;
      const operationType = bodyData.therapySlotId ? 1 : 0;
      if (isValidate) {
        const response = await saveTherapySlot({
          data: JSON.stringify(bodyData),
          operationType,
        });

        if (response && response.isSuccess) {
          if (operationType === 0) {
            result = { message: Message({ code: "RINS" }), isSuccess: true };
          }
          else {
            result = { message: Message({ code: "DMAE" }), isSuccess: false };
          }
          if (operationType === 1) {
            result = { message: Message({ code: "RUPD" }), isSuccess: true };
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
      req.result = { isValidate: true, validationList: [], ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);



router.post(
  deleteSlot,
  async function (req, res, next) {
    try {
      const result = await therapySlotRequestHandler({
        bodyData: { ...req.body },
        operationType: 2
      });
      req.result = { ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },

  sendResponse
);

const therapySlotRequestHandler = async ({
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
    const response = await saveTherapySlot({
      data: JSON.stringify(bodyData),
      operationType
    });
    if (response && response.isSuccess) {
      if (operationType === 0) {
        result = { message: Message({ code: "RINS" }), isSuccess: true };
      } else {
        result = { message: Message({ code: "DMAE" }), isSuccess: false };
      }
      if (operationType === 1) {
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

module.exports = router;
