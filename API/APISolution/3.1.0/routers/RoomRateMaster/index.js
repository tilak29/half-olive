const express = require("express");
const router = express.Router();
const {
  getTime,
  datefilter,
  listallcategoryname,
  listdays,
  saveroomRate,
  updateroomRate,
  deleteroomrate
} = require("./RoomRateMasterRepository");
const { sendResponse, payLoadValidation } = require("../../../utils");

const { Message } = require("../../../Messages");
const {
  RoomRateMaster_getTime: { url: ApigetTime },
  RoomRateMaster_datefilter: { url: Apidatefilter },
  RoomRateMaster_listallcategoryname: { url: Apilistallcategoryname },
  RoomRateMaster_listdays: { url: Apilistdays },
  RoomRateMaster_saveroomRate: { url: Apisaveroomrate },
  RoomRateMaster_updateroomRate: { url: Apiupdateroomrate },
  RoomRateMaster_deleteroomRate: { url: Apideleteroomrate },
  
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");


router.post(
  ApigetTime,
  async function (req, res, next) {
    try {
      let result = {};
      const {} = req.body;
      const response = await getTime();

      const { isSuccess } = response;
      delete response.isSuccess;
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
  Apilistallcategoryname,
  async function (req, res, next) {
    try {
      let result = {};
      const {} = req.body;
      const response = await listallcategoryname();
       const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            getallcategoryname: [...response.recordset],
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
  Apilistdays,
  async function (req, res, next) {
    try {
      let result = {};
      const {} = req.body;
      const response = await listdays();
     const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            getdays: [...response.recordset],
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
  Apidatefilter,
  async function (req, res, next) {
    try {
      let result = {};
      const { effectiveDate } = req.body;
    const response = await datefilter(effectiveDate);
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            roomratefilter: [...response.recordset],
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
  Apisaveroomrate,
  async function (req, res, next) {
    try {
      const bodyData = {
        ...req.body,
      };
      const isValidDataType = await payLoadValidation({
        data: JSON.stringify(bodyData),
      
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await saveroomRate({
          data: JSON.stringify(bodyData),
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

router.post(
  Apiupdateroomrate,
  async function (req, res, next) {
    try {
      const bodyData = {
        ...req.body,
      };
      const isValidDataType = await payLoadValidation({
        data: JSON.stringify(bodyData),
      
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await updateroomRate({
          data: JSON.stringify(bodyData),
        });
        if (response && response.isSuccess) {
          result = { message: Message({ code: "RUPD" }), isSuccess: true };
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


router.post(
  Apideleteroomrate,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body,
      };

      const response = await deleteroomrate(bodyData);
      const { isSuccess } = response;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "RDEL" }),
          isSuccess: true
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
