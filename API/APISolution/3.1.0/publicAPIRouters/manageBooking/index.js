const express = require("express");
const router = express.Router();

const { getStatusFilter } = require("./manageBookingRepository");
const { sendResponse } = require("../../../utils");
const { Message } = require("../../../Messages");
const {
    manageBooking_getStatusFilter: { url: getStatusFilterApi },
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * AUTOCODEUTILITY - Add comment here
 */
router.post(
  getStatusFilterApi,
  async function (req, res, next) {
    try {
      let result = {};
      const {} = req.body;
      const response = await getStatusFilter();
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            statusList: [...response.recordset],
            
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

module.exports = router;
