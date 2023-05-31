const express = require("express");
const {
    dailyTherapy_getData: { url: getData },
    dailyTherapyTypeName_getData: { url: getDataTypeName },
    dailyTherapy_updateData: { url: updateData },
    dailyTherapyTypeSlot_getData: { url: getSolt }
} = require("../../../routerConstant");
const router = express.Router();

const { getdailytherapy, getdailytherapyColumnName, getdailytherapyupdate, getdailytherapyTypeSlot } = require('./dailytherapyRepository')

const { sendResponse, payLoadValidation } = require("../../../utils");
const { Message } = require("../../../Messages");
const { handleError } = require("../../../error");

var convert = require('xml-js');

const {
    DailyTherapyUpdate,
    DailyTherapyGet
} = require("../../../dataType.json");




/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /dailyTherapyMaster/getData Get Data from Daily Therapy
 * @apiName getData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /dailyTherapyMaster/getData
 *
 * @apiGroup Daily Therapy
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Daily Therapy
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {Number}  Date, Date is for filter the data  
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "Date": '2022-09-08',
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
{
*  "isValidate": true,
*  "validationList": [],
*  "message": "Data received successfully.",
*  "data": {
*    "dailytherapy": [
*      {
*        "guestId": "25",
*        "guestName": "Manish Malhotra",
*        "dailyReport": {
*          "daily": {
*            "type": [
*              {
*                "therapyId": {
*                  "text": "1"
*                },
*                "typeName": {
*                  "text": "MorningTherapy"
*                },
*                "startTime": {
*                  "text": "05:00:00"
*                },
*                "endTime": {
*                  "text": "06:00:00"
*                },
*                "therapySlotId": {
*                  "text": "1"
*                }
*              }
*            ]
*          }
*        }
*      }
*    ]
*  },
*  "isSuccess": true,
*  "statusCode": 200
*}
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
    getData,
    async function (req, res, next) {
        try {
            let result = {};
            const bodyData = {
                ...req.body
            };
            const isValidDataType = await payLoadValidation({
                bodyData: bodyData,
                payLoad: DailyTherapyGet
            });

            const { isValidate, validationList } = isValidDataType;

            if (isValidate) {
                var response = await getdailytherapy({
                    bodyData
                });
            }

            for (let index = 0; index < response.recordset.length; index++) {
                const element = response.recordset[index].DailyReport;
                var result1 = convert.xml2js(element, { compact: true, spaces: 4 });
                for (let index1 = 0; index1 < result1.Daily.Type.length; index1++) {
                    const element1 = result1.Daily.Type[index1].TypeName._text.split(" ").join("")
                    result1.Daily.Type[index1].TypeName._text = element1
                }
                response.recordset[index].DailyReport = result1
            }
            const { isSuccess } = response;
            if (isSuccess === true) {
                result = {
                    message: Message({ code: "Success" }),
                    data: {
                        dailytherapy: [...response.recordset],
                    },
                    isSuccess,
                };

            } else {
                result = {
                    message: Message({}),
                    isSuccess: false,
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


/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /dailyTherapyMaster/getTypeName Get Data from Daily Therapy
 * @apiName getDataTypeName
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /dailyTherapyMaster/getTypeName
 *
 * @apiGroup Daily Therapy
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Daily Therapy
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam  -
 *
 * @apiParamExample {json} Input (body/json)
 *      -
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
{
  "isValidate": true,
  "validationList": [],
  "message": "Data received successfully.",
  "data": {
    "dailytherapytypename": [
      {
        "therapyId": 1,
        "title": "Morning Therapy",
        "field": "MorningTherapy",
        "therapyTime": [
          {
            "label": "05:00:00",
            "value": "1"
          },
          {
            "label": "00:00:00",
            "value": "13"
          },
          {
            "label": "00:00:00",
            "value": "14"
          }
        ]
      }
    ]
  },
  "isSuccess": true,
  "statusCode": 200
}
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
    getDataTypeName,
    async function (req, res, next) {
        try {
            let result = {};
            const bodyData = {
                ...req.body
            };
            var response = await getdailytherapyColumnName({
                bodyData
            });

            for (let index = 0; index < response.recordset.length; index++) {
                var time = []
                const elementxml = response.recordset[index].TherapyTime;
                const element = response.recordset[index].field.split(" ").join("")
                response.recordset[index].field = element
                if (response.recordset[index].TherapyTime === null) {
                    response.recordset[index].TherapyTime = { Time: { Type: [] } };
                } else {
                    var result1 = convert.xml2js(elementxml, { compact: true, spaces: 4 });
                    if (Array.isArray(result1.Time.Type)) {
                        response.recordset[index].TherapyTime = result1
                    } else {
                        const array = result1.Time.Type
                        const convertarray = [array]
                        result1.Time.Type = convertarray
                        response.recordset[index].TherapyTime = result1
                    }


                }
                for (let index1 = 0; index1 < response.recordset[index].TherapyTime.Time.Type.length; index1++) {

                    const element1 = response.recordset[index].TherapyTime.Time.Type[index1].label._text
                    const element2 = response.recordset[index].TherapyTime.Time.Type[index1].TherapySlotId._text
                    time.push({ label: element1, value: element2 })
                }
                response.recordset[index].TherapyTime = time
            }
            const { isSuccess } = response;
            if (isSuccess === true) {
                result = {
                    message: Message({ code: "Success" }),
                    data: {
                        dailytherapytypename: [...response.recordset],
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

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /dailyTherapyMaster/getSlot Get Data from Daily Therapy
 * @apiName getSolt
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /dailyTherapyMaster/getSlot
 *
 * @apiGroup Daily Therapy
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Daily Therapy
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam  -
 *
 * @apiParamExample {json} Input (body/json)
 *      -
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
{
    "isValidate": true,
    "validationList": [],
    "message": "Data received successfully.",
    "data": {
      "dailytherapyslot": [
        {
          "label": "05:00:00",
          "value": 1,
          "type": "1"
        },
        {
          "label": "17:30:00",
          "value": 2,
          "type": "2"
        }
      ]
    },
    "isSuccess": true,
    "statusCode": 200
  }
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
    getSolt,
    async function (req, res, next) {
        try {
            let result = {};
            const bodyData = {
                ...req.body
            };
            var response = await getdailytherapyTypeSlot({
                bodyData
            });

            const { isSuccess } = response;
            if (isSuccess === true) {
                result = {
                    message: Message({ code: "Success" }),
                    data: {
                        dailytherapyslot: [...response.recordset],
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

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /dailyTherapyMaster/updateData update data of Daily Therapy
 * @apiName updateData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /dailyTherapyMaster/updateData
 *
 * @apiGroup Daily Therapy
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Update Data of Daily Therapy
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {Number}  Date, Date is for filter the data  
 *
 * @apiParamExample {json} Input (body/json)
 *      {
    "GuestId": 24,
    "Data": {
        "root": {
            "body": [
                {
                    "therapyid": 1,
                    "value": 1
                }
            ]
        }
    },
    "date": "2022-09-08"
}
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
{
  "isValidate": true,
  "validationList": [],
  "message": "Record updated successfully.",
  "data": {
    "dailytherapyuser": [
      {
        "therapyId": 1,
        "therapySlotId": 1
      }
    ]
  },
  "isSuccess": true,
  "statusCode": 200
}
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
    updateData,
    async function (req, res, next) {
        try {
            let result = {};
            var bodyData = {
                ...req.body
            };

            var { Data } = bodyData
            const isValidDataType = await payLoadValidation({
                bodyData: bodyData,
                payLoad: DailyTherapyUpdate
            });

            const { isValidate, validationList } = isValidDataType;

            bodyData.Data = convert.json2xml(Data, { compact: true, spaces: 4 });
            if (isValidate) {
                var response = await getdailytherapyupdate(
                    bodyData
                )
            }
            const { isSuccess } = response;
            if (isSuccess) {
                result = {
                    message: Message({ code: "RUPD" }),
                    data: {
                        dailytherapyuser: [...response.recordset],
                    },
                    isSuccess,
                };

            } else {
                result = {
                    message: Message({}),
                    isSuccess: false,
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