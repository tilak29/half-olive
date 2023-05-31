const express = require("express");
const router = express.Router();

const { 
    getVideoList,
    updateUserVideoStartTime,
    updateUserVideoIsLike,
    getVideoUserComment,
    saveVideoUserComment,
    getVideoMasterData,
    saveVideoData,
    getSeriesData
} = require("./videoMasterRepository");

const {
    payLoadValidation,
    sendResponse
  } = require("../../../utils");
  
const { fileMimeType } = require("../../../fileMimeTypeUtils");
const { imageUpload } = require("../../../uploadImageToServer");
const {
  imageFolderName: { seriesFolderName }
} = require("../../../config.json");


const {
    getVideoData,
    updateVideoStartTime,
    updateVideoIsLike,
    getCommentOfVideo,
    saveCommentOfVideo,
    getVideoMasterValidator,
    saveVideoValidator
  } = require("../../../dataType.json");

const { Message } = require("../../../Messages");
const { handleError } = require("../../../error.js");
const {
    videoMaster_getVideoList: { url: getData },
    videoMaster_updateVideoStartTime: {url: updateStartTime},
    videoMaster_likeVideo: {url: likeVideo},
    videoMaster_getCommentData:{url: getCommentData},
    videoMaster_saveComment:{url: saveComment},
    videoMaster_getVideos:{url:getVideos},
    videoMaster_saveVideo:{url:saveVideo},
    videoMaster_getSeriesData:{url:getSeries}
} = require("../../../routerConstant");


/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /videoMaster/getData Get Data from Video Master
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /videoMaster/getData
 *
 * @apiGroup Video Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Video Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} isbuplicapi true
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "userId":9426316111,
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *        videoList:[
                    {
                        seriesName: 'Cartoon',
                        seriesId: 11,
                        seriesVideos: [
                            {
                            videoId: 11,
                            videoPlaceholder:
                                'https://upload.wikimedia.org/wikipedia/commons/2/22/Big.Buck.Bunny.-.Bunny.Portrait.png',
                            videoTitle: 'Bunny',
                            videoDescription: 'Bunny Cartoon Movie Discription',
                            videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                            videoDuration: '1:23:00',
                            isLocked: false,
                            isInteractive: true,
                            videoStartTime: '540',
                            isLike:true,
                            viewCount:899
                            }
                        ]
                    }
                ]
 *      },
 *      "isSuccess": true,
 *      "statusCode": 200
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
        const {
          loggedInEmployeeId,
          loggedInAppIndication
        } = req.body;
  
        const isValidDataType = await payLoadValidation({
          bodyData: req.body,
          payLoad: getVideoData
        });

        const { isValidate, validationList } = isValidDataType;
  
        if (isValidate) {
            const response = await getVideoList({
            loggedInEmployeeId,
            loggedInAppIndication
          });
          const { isSuccess } = response;
          const videolist = response && response[0];
          if (isSuccess === true) {
            result = {
              message: Message({ code: "Success" }),
              data: {
                videoList: videolist              
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



/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /videoMaster/updateVideoStartTime update start time in Video View Detail
 * @apiName UpdateStartTimeData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /videoMaster/updateVideoStartTime
 *
 * @apiGroup Video Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to update Start Time of video of Video View Detail
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} isbuplicapi true
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json)
 *      {
            userId:9825485627,
            videoId:11,
            videoStartTime:542
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "isValidate": true,
 *        "validationList": [],
 *        "data": {
 *            "insertId": 2,
 *            "affectedRows": 1
 *         },
 *        "message": "Record Inserted Successfully",
 *        "isSuccess": true,
 *        "statusCode": 200
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
    updateStartTime,
    async function (req, res, next) {
      try {
        let result = {};
        const {
          loggedInEmployeeId,
          loggedInAppIndication,
          videoId, 
          videoStartTime
        } = req.body;
  
        const isValidDataType = await payLoadValidation({
          bodyData: req.body,
          payLoad: updateVideoStartTime
        });

        const { isValidate, validationList } = isValidDataType;
  
        if (isValidate) {
            const response = await updateUserVideoStartTime({
                loggedInEmployeeId,
                videoId, 
                videoStartTime,
                loggedInAppIndication
          });
          const { isSuccess } = response;
          const transactionSuccess = response[1][0]["@op_IsSussess"];
          if (isSuccess === true && transactionSuccess == 1) {
            result = {
              message: Message({ code: "RSAVE" }),
              data: {
                    insertId: response[1][0]["@op_IsSussess"],
                    affectedRows: 1
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



/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /videoMaster/likeVideo update like video in Video View Detail
 * @apiName likeVideo
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /videoMaster/likeVideo
 *
 * @apiGroup Video Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to update isLike for video of Video View Detail
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} isbuplicapi true
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json)
 *      {
            userId:9825485627,
            videoId:11,
            isLike:1
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "isValidate": true,
 *        "validationList": [],
 *        "data": {
 *            "insertId": 2,
 *            "affectedRows": 1
 *         },
 *        "message": "Record Inserted Successfully",
 *        "isSuccess": true,
 *        "statusCode": 200
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
    likeVideo,
    async function (req, res, next) {
      try {
        let result = {};
        const {
          loggedInEmployeeId,
          loggedInAppIndication,
          videoId, 
          isLike
        } = req.body;
  
        const isValidDataType = await payLoadValidation({
          bodyData: req.body,
          payLoad: updateVideoIsLike
        });

        const { isValidate, validationList } = isValidDataType;
  
        if (isValidate) {
            const response = await updateUserVideoIsLike({
                loggedInEmployeeId,
                videoId, 
                isLike,
                loggedInAppIndication
          });
          const { isSuccess } = response;
          if (isSuccess === true &&  response && response[2]) {
            result = {
              message: Message({ code: "RSAVE" }),
              data: {
                    insertId: response[2][0]["InsertedId"],
                    affectedRows: 1         
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


/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /videoMaster/getCommentData get video comment from videousercomment table
 * @apiName getCommentData
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /videoMaster/getCommentData
 *
 * @apiGroup Video Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to get video comment from videousercomment table
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} isbuplicapi true
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json)
 *      {
            userId:9825485627,
            videoId:11
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "isValidate": true,
 *        "validationList": [],
 *        "data": {
 *            "commentList": [{
                                commentsid:1,
                                comments:'Video Comments',
                                dateTime: '2020-08-26 10:35:00'
                            }]
 *         },
 *        "message": "Record Inserted Successfully",
 *        "isSuccess": true,
 *        "statusCode": 200
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
    getCommentData,
    async function (req, res, next) {
      try {
        let result = {};
        const {
          loggedInEmployeeId,
          loggedInAppIndication,
          videoId
        } = req.body;
  
        const isValidDataType = await payLoadValidation({
          bodyData: req.body,
          payLoad: getCommentOfVideo
        });

        const { isValidate, validationList } = isValidDataType;
  
        if (isValidate) {
            const response = await getVideoUserComment({
                loggedInEmployeeId,
                videoId,
                loggedInAppIndication
          });
          const { isSuccess } = response;
          if (isSuccess === true) {
            result = {
              message: Message({ code: "Success" }),
              data: {
                    commentList : response
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



/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /videoMaster/saveComment save video comment to videousercomment table
 * @apiName saveComment
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /videoMaster/saveComment
 *
 * @apiGroup Video Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to save video comment to videousercomment table
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} isbuplicapi true
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json)
 *      {
            userId:9825485627,
            videoId:11,
            comment:"test"
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "isValidate": true,
 *        "validationList": [],
 *        "data": {
 *            "insertId": 2,
 *            "affectedRows": 1
 *         },
 *        "message": "Record Inserted Successfully",
 *        "isSuccess": true,
 *        "statusCode": 200
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
    saveComment,
    async function (req, res, next) {
      try {
        let result = {};
        const {
          loggedInEmployeeId,
          loggedInAppIndication,
          videoId,
          comment
        } = req.body;
  
        const isValidDataType = await payLoadValidation({
          bodyData: req.body,
          payLoad: saveCommentOfVideo
        });

        const { isValidate, validationList } = isValidDataType;
  
        if (isValidate) {
            const response = await saveVideoUserComment({
                loggedInEmployeeId,
                videoId,
                comment,
                loggedInAppIndication
          });
          const { isSuccess } = response;
          if (isSuccess === true) {
            result = {
              message: Message({ code: "RSAVE" }),
              data: {
                    "insertId": 2,
                    "affectedRows": 1
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



/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /videoMaster/getVideoData get video data from videomaster table
 * @apiName getVideoData
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /videoMaster/getVideoData
 *
 * @apiGroup Video Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to get video data from videomaster table
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} isbuplicapi true
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "isValidate": true,
 *        "validationList": [],
 *        "data": {
 *            "videoList": [{
                                commentsid:1,
                                comments:'Video Comments',
                                dateTime: '2020-08-26 10:35:00'
                            }]
 *         },
 *        "message": "Record Inserted Successfully",
 *        "isSuccess": true,
 *        "statusCode": 200
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
  getVideos,
  async function (req, res, next) {
    try {
      let result =  {};
      const {
        seriesId
      } = req.body;

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: getVideoMasterValidator
      });

      const { isValidate, validationList } = isValidDataType;

      if (isValidate) {
        const response = await getVideoMasterData({seriesId});
        const { isSuccess } = response;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
                  videoList: response
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


/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /videoMaster/saveVideo save video data in videomaster table
 * @apiName saveVideo
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /videoMaster/saveVideo
 *
 * @apiGroup Video Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to save video data to videomaster table
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json)
    {
      videoId: null, 
      seriesId: 1, 
      videoPlaceholder: "FineName", 
      videoTitle:"Video Title", 
      videoDescription:"Some description about video", 
      videoUrl:"VideoFileName", 
      videoDuration:"00:05:00", 
      isActive: 1
    } *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "isValidate": true,
 *        "validationList": [],
 *        "data": {
 *            insertedId:1,
 *            affectedRow: 1
 *         },
 *        "message": "Record Inserted Successfully",
 *        "isSuccess": true,
 *        "statusCode": 200
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
  saveVideo,
  async function (req, res, next) {
    try {
      let result = {};
      const {
        loggedInEmployeeId,
        videoId = null, 
        seriesId, 
        videoPlaceholder, 
        videoTitle, 
        videoDescription = null, 
        videoUrl, 
        videoDuration, 
        isActive,
        date
        } = req.body;

      const file = req.files ? req.files.file : undefined;
      let isValidFile = true;

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: saveVideoValidator
      });
      
      const { isValidate, validationList} = isValidDataType;

      if (isValidate) {

        let {
          imageUrl,
          image,
          isImageDeleted,
          isImageCanceled,
          loggedInEmployeeId,
          appIndicatorId
        } = req.body;
        let newImageName = null;
        const isImageUpdated =
        videoId !== null && image
            ? !image.includes(`https://file-upload`)
            : true;
        const imageName =
        videoId !== null &&
          imageUrl &&
          imageUrl !== "" &&
          (file === null || file === undefined)
            ? imageUrl
            : undefined;
    
        if (
          image !== "" &&
          image !== undefined &&
          image !== null &&
          file !== undefined
        ) {
          const mimeType =
            file && file !== null ? await fileMimeType({ file }) : undefined;
          if (file !== null && file !== undefined) {
            let mime;
            if (mimeType) {
              const { mime: originalmime } = mimeType;
              mime = originalmime;
            }
            if ((mime && mime.split("/")[0] !== "image") || mime === undefined) {
              isValidFile = false;
              const message = Message({ code: "INVALIDFILETYPE" });
              result = {
                message,
                isValidate: false,
                validationList: [{ file: message }]
              };
            }
          }
        }

        if (isValidFile === true) {
        if (
          (isImageCanceled === false &&
            image !== "" &&
            image !== undefined &&
            image !== null &&
            file !== undefined &&
            isImageUpdated === true) ||
            isImageDeleted === true
        ) {
          const newItemImage = await imageUpload({
            image,
            bucketName: `${seriesFolderName}`,
            imageName: imageName ? imageName.split(".")[0] : imageName,
            isImageDeleted,
            loggedInEmployeeId,
            file
          });
          // const { key } = newItemImage;
          // newImageName = key;
          const { location } = newItemImage;
          newImageName = location;
          req.body.videoPlaceholder = newImageName;
        } else {
          newImageName = ((isImageDeleted === false || isImageUpdated === false) && req.body.videoPlaceholder) ||  null;
        }
        delete  req.body.image;

        const response = await saveVideoData({loggedInEmployeeId,
          videoId, 
          seriesId, 
          videoPlaceholder: newImageName, 
          videoTitle, 
          videoDescription, 
          videoUrl, 
          videoDuration, 
          isActive,
          date,
          appIndicatorId});
        const { isSuccess } = response;
        const code =  videoId != null ? "RUPD" : "RINS"
        if (isSuccess === true) {
          result = {
            message: Message({ code }),
            data: {
                  response
              },
            isSuccess
          };
        } else {
          result = {
            message: Message({}),
            isSuccess: false
          };
        }
      } }else {
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
  getSeries,
  async function (req, res, next) {
    try {
      let result =  {};

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: getVideoMasterValidator
      });

      isValidDataType.isValidate = true;
      const { isValidate, validationList } = isValidDataType;

      // if (isValidate) {
        const response = await getSeriesData();
        const { isSuccess } = response;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
                  list: response
              },
            isSuccess
          };
        } else {
          result = {
            message: Message({}),
            isSuccess: false
          };
        }
      // } else {
      //   result = {
      //     message: Message({ code: "INVALPAYLOAD" }),
      //     isSuccess: true,
      //     ...result
      //   };
      // }
      req.result = { isValidate, validationList, ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

  module.exports = router;
