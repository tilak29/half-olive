const express = require("express");
const router = express.Router();
const { payLoadValidation, sendResponse } = require("../../../utils");
const { Message } = require("../../../Messages");
const dataTypeForValidation = require("../../../dataType.json");
const { sendMail } = require("./SendMailController");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /1.0.0/sendMail Send Mail
 * @apiName Send Mail
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /1.0.0/sendMail
 *
 * @apiGroup Others
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to send mail from Application
 *
 * @apiParam (Request body) {object}  mailOptions  Enter required data to send mail(from, to, subject,body)
 *
 * @apiParamExample {json} Input (body/json)
 *
 *    {
 *      "from": "chatbot@spec-india.net",
 *      "to": "parth.suthar@spec-india.com",
 *      "subject": "Sending Email using Node.js",
 *      "html": "Mail for testing !!"
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *         "statusCode": 200,
 *         "isSuccess": true,
 *         "data": {},
 *         "isValidate": true,
 *         "validationList": [],
 *         "message": "Password is Sent to your EmailId"
 *      }
 *
 *    HTTP/1.1 200 OK
 *      {
 *         "statusCode": 200,
 *         "isSuccess": false,
 *         "data": {},
 *         "isValidate": false,
 *         "validationList": [
 *            {
 *              "from": "The from field is mandatory."
 *            },
 *            {
 *              "to": "The to field is mandatory."
 *            }
 *          ],
 *         "message": "Please Enter all Required field with Valid Data Type"
 *      }
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
 */

router.post(
  "/1.0.0/sendMail",
  async function(req, res, next) {
    let result = {};
    const { mailOptions } = req.body;
    const { sendMail: sendMailValidator } = dataTypeForValidation;
    const isValidDataType = await payLoadValidation({
      bodyData: req.body.mailOptions,
      payLoad: sendMailValidator
    });
    const { isValidate, validationList } = isValidDataType;
    if (isValidate) {
      result = await sendMail({ mailOptions });
    } else {
      result = {
        message: Message({ code: "INVALPAYLOAD" }),
        isSuccess: true,
        ...result
      };
    }
    req.result = { isValidate, validationList, ...result };
    next();
  },
  sendResponse
);

module.exports = router;
