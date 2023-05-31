const express = require("express");
const router = express.Router();

const { getWorkFlowIdList } = require("./workFlowRepository");
const { sendResponse, payLoadValidation } = require("../../../../utils");
const {
    workFlow_lookUpData: { url: lookUpData }
} = require("../../../../routerConstant");
const { Message } = require("../../../../Messages");
const { handleError } = require("../../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 2.0.0
 */
/**
 * @api {post} /workFlow/lookUpData Get StaticId and StaticName
 * @apiName GetStaticData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getStaticData/lookUpData
 *
 * @apiGroup Static Lookup
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Static Data for lookup
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {String} code Enter code to get the static data
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *         "isValidate": true,
 *         "validationList": [],
 *         "message": "You get data Successfully",
 *         "data": {
 *             "List": [
 *                 {
 *                     "value": 3,
 *                     "label": "Casual Leave"
 *                 },
 *                 {
 *                     "value": 4,
 *                     "label": "Leave Without Pay"
 *                 }
 *             ]
 *         },
 *         "isSuccess": true,
 *         "statusCode": 200
 *       }
 *
 * @apiErrorExample
 *    HTTP/1.1 500 Internal Server Error
 *      {
 *        "statusCode": 500,
 *        "isSuccess": false,
 *        "data": {},
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "Internal Server Error"
 *      }
 *
 */
router.post(
    lookUpData,
  async function (req, res, next) {
    try {
      let result = {};
      const { staticId = 0 } = req.body;

        const response = await getWorkFlowIdList({ staticId });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              List: [...response]
            },
            isSuccess
          };
        } else {
          result = {
            message: Message({}),
            isSuccess: false
          };
        }
        const isValidate = true, validationList = null;
        req.result = { isValidate, validationList, ...result };
         next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

module.exports = router;
