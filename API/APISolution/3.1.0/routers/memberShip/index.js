const express = require("express");
const router = express.Router();

const { sendResponse, payLoadValidation } = require("../../../utils");
const { Message } = require("../../../Messages");
const {getRoomMemberShip,
  getMemberShipDays,
  saveMemberShip,
  updateMemberShip,
  getOccupancy,
  getEffectiveDate,
  deleteMemberShip
} = require("./memberShipRepository");
const {
  memberShipRoom_getData: { url: getMemberShipRoom },
  memberShipDays_getData: { url: getDays },
  memberShipOccupancy_getData: { url: getOccupancyApi },
  memberShip_insertData: { url :insertData },
  memberShip_updateData: { url : updateData },
  memberShip_getEffectiveDate: { url : getEffectiveDateApi},
  memberShipDays_deleteData: { url : deleteData}
} = require("../../../routerConstant");
const { MemberShipMasterAdd, MemberShipMasterUpdate, MemberShipMasterDelete } = require("../../../dataType.json");
const { handleError } = require("../../../error.js");

router.post(
  getEffectiveDateApi,
  async function (req, res, next) {
    try {
      let result = {};
      const {  } = req.body;
      const response = await getEffectiveDate( { } );
      const { isSuccess } = response;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            effectiveDate: [...response.recordset],
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
  getMemberShipRoom,
  async function (req, res, next) {
    try {
      let result = {};
      const { effectiveDate } = req.body;
      const response = await getRoomMemberShip({effectiveDate});
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            memberShipRoom: [...response.recordset],
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
  getDays,
  async function (req, res, next) {
    try {
      let result = {};
      const { } = req.body;
      const response = await getMemberShipDays({});
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            memberShipDays: [...response.recordset],
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
  getOccupancyApi,
  async function (req, res, next) {
    try {
      let result = {};
      const { } = req.body;
      const response = await getOccupancy({});
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            memberShipOccupancy: [...response.recordset],
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
  insertData,
  async function (req, res, next) {
    try {
      var result = {};
      const bodyData = {
        ...req.body,
      };
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: MemberShipMasterAdd,
      });

      const { isValidate, validationList } = isValidDataType;

      if (isValidate) {
        const response = await saveMemberShip({
          data: JSON.stringify(bodyData),
        });

        if (response && response.isSuccess) {
            result = { message: Message({ code: "RINS" }), isSuccess: true };
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
      req.result = { isValidate, validationList, ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

router.post(
  updateData,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body,
      };

      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: MemberShipMasterUpdate,
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await updateMemberShip({
          data: JSON.stringify(bodyData),
        });

        if (response && response.isSuccess) {
          result = { message: Message({ code: "RUPD" }), isSuccess: true };
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
      req.result = { isValidate, validationList, ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

router.post(
  deleteData,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body,
      };
      const data = {
        effectiveDate: bodyData.effectiveDate,
        loggedInUserId: bodyData.loggedInUserId,
      };
      const isValidDataType = await payLoadValidation({
        bodyData: data,
        payLoad: MemberShipMasterDelete,
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await deleteMemberShip({
          data,
        });

        if (response && response.isSuccess) {
          result = { message: Message({ code: "RDEL" }), isSuccess: true };
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
      req.result = { isValidate, validationList, ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

module.exports = router;