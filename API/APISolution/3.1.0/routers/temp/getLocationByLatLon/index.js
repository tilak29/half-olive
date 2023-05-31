const express = require("express");
const router = express.Router();

const { Message } = require("../../../Messages");
const {
  payLoadValidation,
  sendResponse,
  getLocation
} = require("../../../utils");
const {
  getLocationByLatLon: { url: getLocationByLatLonRouter }
} = require("../../../routerConstant");
const { gpsLocationByLatLon } = require("../../../dataType.json");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /getLocationByLatLon Get Location by lattitude and longitude
 * @apiName Get Location By Lat Lon
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getLocationByLatLon
 *
 * @apiGroup Get Location By LatLon
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Location from Lattitude and Longitude
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - lat and lon are required
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *       "lat": 23.036683,
 *       "lon": 72.5617327
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "statusCode": 200,
 *      "isSuccess": true,
 *      "data": {
 *          "formattedAddress": "SPEC House, Navrangpura Rd, Swastik Society, Navrangpura, Ahmedabad, Gujarat 380009, India"
 *      },
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully"
 *    }
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
  getLocationByLatLonRouter,
  async function (req, res, next) {
    try {
      const { lat, lon } = req.body;
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: gpsLocationByLatLon
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const locationList = await getLocation({ lat, lon });
        result = {
          isSuccess: true,
          message: Message({ code: "Success" }),
          data: { formattedAddress: locationList }
        };
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

module.exports = router;
