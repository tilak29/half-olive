const express = require("express");
const router = express.Router();

const {
    getBirthDayList
} = require("./birthDayRepository");

const {
    payLoadValidation,
    sendResponse
} = require("../../../utils");

const { Message } = require("../../../Messages");
const { handleError } = require("../../../error.js");
const {
    birthDay_getData: { url: getBirthDayListData }
} = require("../../../routerConstant");

router.post(
    getBirthDayListData,
    async function (req, res, next) {
        try {
            let result = {};
            const {
                loggedInEmployeeId,
                empId
            } = req.body;

            const isValidate = true;
            const validationList = true;
            const response = await getBirthDayList({
                loggedInEmployeeId,
                empId
            });
            const { isSuccess } = response;
            const birthDaylist = response;
            if (isSuccess === true) {
                result = {
                    message: Message({ code: "Success" }),
                    data: {
                        birthDaylist: birthDaylist[1]
                    },
                    isSuccess
                };
            } else {
                result = {
                    message: Message({}),
                    isSuccess: false
                };
            }
            req.result = {isValidate, validationList,...result };
            next();
        } catch (e) {
            handleError(e, res);
        }
    },
    sendResponse
);

module.exports = router;
