const express = require("express");
const router = express.Router();

const { sendMail } = require("../../routers/sendMail/SendMailController");
const {
  askQueryInsert,
  getAskQueryDetailForChemistStockist
} = require("./askQueryRepositoryCS");
const { payLoadValidation, sendResponse } = require("../../../utils");
const { askQueryData } = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  askQueryCS: { url: askQuery }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /askQueryCS Ask query for Stockist/Chemist
 * @apiName Ask Query for Cs
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /askQueryCS
 *
 * @apiGroup 1.Public API
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Send mail to Stockist/Chemist (loginRole = 0:Stockist, 1:SuperStockist, 2:Chemist)
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 *
 * @apiParam (Request body) {string} queryText Required Enter Text for the body of Email
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "queryText": "Hello",
 *        "mobileNumber":"9426316123",
 *        "loginRole":0
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "Data inserted successfully.",
 *      "data": {},
 *      "isSuccess": true,
 *      "statusCode": 200
 *  }
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
 *    HTTP/1.1 401 Unauthorized
 *      {
 *        "statusCode": 401,
 *        "isSuccess": false,
 *        "data": {},
 *        "isValidate": false,
 *        "validationList": [
 *          {
 *             "Error": "You are UnAuthorized to perform this Action"
 *          }
 *         ],
 *        "message": "You are UnAuthorized to perform this Action"
 *      }
 */
router.post(
  askQuery,
  async function (req, res, next) {
    try {
      let result = {};
      const { queryText, loggedInMobileNumber: mobileNumber, loginRole } = req.body;

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: askQueryData
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const resChemistStockist = await getAskQueryDetailForChemistStockist({
          mobileNumber
        });

        const to = resChemistStockist[0].ToEmail;
        const chemistStockistName = resChemistStockist[0].ChemistStockistName;

        if (chemistStockistName != null) {
          const response = await askQueryInsert({ queryText, mobileNumber });
          const { isSuccess } = response;
          delete response.isSuccess;
          if (isSuccess === true) {
            result = {
              message: Message({ code: "YQR" }),
              isSuccess
            };
          } else {
            result = {
              message: Message({})
            };
          }

          let templateCode = "AskQueryTemplateForStockist";
          if (loginRole === 2) {
            //loginRole: 2 is for chemist, 0 is for stockist and 1 is for superStockist
            templateCode = "AskQueryTemplateForChemist";
          }
          sendMail({
            code: templateCode,
            resultObject: { Sender: chemistStockistName, Query: queryText },
            to
          });
        } else {
          result = {
            message: Message({})
          };
        }
      } else {
        result = {
          message: Message({ code: "INVALPAYLOAD" }),
          isSuccess: false,
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
