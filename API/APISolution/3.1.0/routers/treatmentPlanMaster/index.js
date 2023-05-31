const express = require("express");
const router = express.Router();

const {
  getTreatmentTemplateCategories,
  getTreatmentList,
  getDietList,
  insertDayWisePlanData
} = require("./treatmentPlanMasterRepository");
const { sendResponse, payLoadValidation } = require("../../../utils");
const { Message } = require("../../../Messages");
const {
  treatmentPlanMaster_getTreatmentTemplateCategories: { url: getTreatmentTemplateCategoriesApi },
  treatmentPlanMaster_getTreatmentList: { url: getTreatmentListApi },
  treatmentPlanMaster_getDietList: { url: getDietListApi },
  treatmentPlanMaster_insertDayWisePlanData: { url: insertDayWisePlanDataApi }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

router.post(
  getTreatmentTemplateCategoriesApi,
  async function (req, res, next) {
    try {
      let result = {};
      const { } = req.body;
      const response = await getTreatmentTemplateCategories();
      const { isSuccess } = response;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            treatmentTemplateCategoryList: [...response.recordset],
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
  getTreatmentListApi,
  async function (req, res, next) {
    try {
      let result = {};
      const { filterCategory } = req.body;
      const response = await getTreatmentList({ filterCategory });
      const { isSuccess } = response;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            TreatmentList: [...response.recordset]
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

router.post(
  getDietListApi,
  async function (req, res, next) {
    try {
      let result = {};
      const { filterCategory } = req.body;
      const response = await getDietList({ filterCategory });
      const { isSuccess } = response;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            dietList: [...response.recordset]
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


router.post(
  insertDayWisePlanDataApi,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body
      };
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        //payLoad: TreatmentRoomMasterAdd
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await insertDayWisePlanData({
          data: bodyData
        });

        if (response && response.isSuccess) {
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
      req.result = { isValidate, validationList, ...result };
      next();

    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

module.exports = router;