const express = require("express");
const router = express.Router();

const {
    getDefaultSecondary,
    updateDefaultSecondary,
    updateAllDefaultSecondary
} = require("./defaultSecondaryRepository");

const {
    sendResponse
} = require("../../../utils");

const { Message } = require("../../../Messages");
const { handleError } = require("../../../error.js");
const {
    secondaryPoint_getDefaultSecondary: { url: getData },
    secondaryPoint_updateDefaultSecondary: { url: updateData },
    secondaryPoint_updateAllDefaultSecondary: { url: updateAllData }
} = require("../../../routerConstant");

router.post(
    getData,
    async function (req, res, next) {
        try {
            let result = {};
            const response = await getDefaultSecondary();
            const { isSuccess } = response;
            const data = response;
            if (isSuccess === true) {
                result = {
                    message: Message({ code: "Success" }),
                    data: {
                        pointsConfigurationList: data
                    },
                    isSuccess
                };
            } else {
                result = {
                    message: Message({}),
                    isSuccess: false
                };
            }

            const validationList = [];
            const isValidate = true;
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
            const {
                loggedInEmployeeId,
                secondaryPointId,
                point,
                stateId //U166118 
            } = req.body;

            const response = await updateDefaultSecondary({ loggedInEmployeeId, secondaryPointId, point, stateId });
            const { isSuccess } = response;
            const videoCommentsList = response[0];
            if (isSuccess === true) {
                result = {
                    message: Message({ code: "RUPD" }),
                    data: {
                        videoCommentsList: videoCommentsList
                    },
                    isSuccess
                };
            } else {
                result = {
                    message: Message({}),
                    isSuccess: false
                };
            }

            const validationList = [];
            const isValidate = true;
            req.result = { isValidate, validationList, ...result };
            next();
        } catch (e) {
            handleError(e, res);
        }
    },
    sendResponse
);

router.post(
    updateAllData,
    async function (req, res, next) {
        try {
            let result = {};
            const {
                loggedInEmployeeId, //U166118 
                jsonData
            } = req.body;

            const response = await updateAllDefaultSecondary({ loggedInEmployeeId,jsonData}); //U166118 
            const { isSuccess } = response;
            const videoCommentsList = response[0];
            if (isSuccess === true) {
                result = {
                    message: Message({ code: "RUPD" }),
                    data: {
                        videoCommentsList: videoCommentsList
                    },
                    isSuccess
                };
            } else {
                result = {
                    message: Message({}),
                    isSuccess: false
                };
            }

            const validationList = [];
            const isValidate = true;
            req.result = { isValidate, validationList, ...result };
            next();
        } catch (e) {
            handleError(e, res);
        }
    },
    sendResponse
);

module.exports = router;
