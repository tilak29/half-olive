const express = require("express");
const router = express.Router();

const {
    getEffectiveDate,
    getDateWiseMealTemplateList,
    getExistingDateWiseMealTemplateList,
    getDateWiseMealTemplateExistingData,
    saveDateWiseMealTemplateData
} = require("./dateWiseMealTemplateRepository");
const {
    payLoadValidation,
    sendResponse,
} = require("../../../utils");
const { Message } = require("../../../Messages");
const {
    dateWiseMealTemplate_getEffectiveDate: { url: getEffectiveDateApi },
    dateWiseMealTemplate_getDateWiseMealTemplateList: { url: getDateWiseMealTemplateListApi },
    dateWiseMealTemplate_getExistingDateWiseMealTemplateList: { url: getExistingDateWiseMealTemplateListApi },
    dateWiseMealTemplate_getDateWiseMealTemplateExistingData: { url: getDateWiseMealTemplateExistingDataApi },
    dateWiseMealTemplate_saveDateWiseMealTemplateData: { url: saveDateWiseMealTemplateDataApi },
    dateWiseMealTemplate_updateDateWiseMealTemplateData: { url: updateDateWiseMealTemplateDataApi },
    dateWiseMealTemplate_deleteDateWiseMealTemplateData: { url: deleteDateWiseMealTemplateDataApi }
} = require("../../../routerConstant");
const { handleError } = require("../../../error");

router.post(
    getEffectiveDateApi,
    async function (req, res, next) {
        try {
            let result = {};
            const { } = req.body;

            const isValidDataType = await payLoadValidation({
                bodyData: req.body,
            });

            const { isValidate, validationList } = isValidDataType;
            if (isValidate) {

                const response = await getEffectiveDate();
                const { isSuccess } = response;
                delete response.isSuccess;
                if (isSuccess === true) {
                    result = {
                        message: Message({ code: "Success" }),
                        data: {
                            effectiveDateList: [...response.recordset]
                        },
                        isSuccess
                    };
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
    getDateWiseMealTemplateListApi,
    async function (req, res, next) {
        try {
            let result = {};
            const { effectiveDate } = req.body;
            const response = await getDateWiseMealTemplateList({ effectiveDate });
            const { isSuccess } = response;
            if (isSuccess === true) {
                result = {
                    message: Message({ code: "Success" }),
                    data: {
                        dateWiseMealTemplateList: [...response.recordset]
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
    getExistingDateWiseMealTemplateListApi,
    async function (req, res, next) {
        try {
            let result = {};
            const { effectiveDate } = req.body;
            const response = await getExistingDateWiseMealTemplateList({ effectiveDate });
            const { isSuccess } = response;
            if (isSuccess === true) {
                result = {
                    message: Message({ code: "Success" }),
                    data: {
                        existingDateWiseMealList: [...response.recordset]
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
    getDateWiseMealTemplateExistingDataApi,
    async function (req, res, next) {
        try {
            let result = {};
            const { effectiveDate, dayindex } = req.body;
            const response = await getDateWiseMealTemplateExistingData({ effectiveDate, dayindex });
            const { isSuccess } = response;
            if (isSuccess === true) {
                result = {
                    message: Message({ code: "Success" }),
                    data: {
                        existingMealDataList: [...response.recordset]
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
    saveDateWiseMealTemplateDataApi,
    async function (req, res, next) {
        try {
            const bodyData = {
                ...req.body
            };
            const result = await dateWiseMealTemplateRequestHandler({
                bodyData,
                operationType: 0
            });
            req.result = { ...result };
            next();
        } catch (e) {
            handleError(e, res);
        }
    },

    sendResponse
);

router.post(
    updateDateWiseMealTemplateDataApi,
    async function (req, res, next) {
        try {
            const result = await dateWiseMealTemplateRequestHandler({
                bodyData: { ...req.body },
                operationType: 1
            });
            req.result = { ...result };
            next();
        } catch (e) {
            handleError(e, res);
        }
    },

    sendResponse
);

router.post(
    deleteDateWiseMealTemplateDataApi,
    async function (req, res, next) {
        try {
            const result = await dateWiseMealTemplateRequestHandler({
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

const dateWiseMealTemplateRequestHandler = async ({
    bodyData,
    operationType
}) => {
    let result = {};
    const isValidDataType = await payLoadValidation({
        bodyData: bodyData
    });
    const { isValidate, validationList } = isValidDataType;

    if (isValidate) {
        const response = await saveDateWiseMealTemplateData({
            data: JSON.stringify(bodyData),
            operationType
        });
        if (response && response.isSuccess) {
            if (operationType === 0) {
                if (response.recordset[0].Count == 1) {
                    result = { message: Message({ code: "DUPRecord" }), isSuccess: false };
                } else {
                    result = { message: Message({ code: "RINS" }), isSuccess: true };
                }
            }
            else if (operationType === 1) {
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
