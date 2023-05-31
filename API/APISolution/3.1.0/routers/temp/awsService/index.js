const express = require("express");
const router = express.Router();
const { sendResponse } = require("../../../utils");
const { Message } = require("../../../Messages");
const {
    aws_getFileUploadURL: { url: getSignedURL },
    aws_deleteFileFromAWS: { url: deleteFileFromAWS}
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");
const { getSignedFileUploadURL, deleteFileFromAWSServer } = require("../../../uploadImageToServer");


router.post(
    getSignedURL,
    async function (req, res, next) {
        try {
            let result = {};
            const { type, loggedInEmployeeId, screen, fileName = null, images = null } = req.body;

            if(images != null)
            {
                let type="", data = null, index;
                const imageUrl = [];
                for (i = 0; i < images.length; i++) {
                    type=images[i].type;
                    index=images[i].index;
                    data = await getSignedFileUploadURL({ type, screen, fileName, index });
                    let {url, Key} = data;
                    if (data !== null) {
                        imageUrl.push({
                            index: images[i].index,
                            url,
                            key: Key
                        });
                    } else {
                        imageUrl.push({
                            index: images[i].index,
                            message: "Not able to generate signed URL",
                        });
                    }
                }
                result = {
                    data:{image: imageUrl},
                    isSuccess: true
                };
            }else{
            const data = await getSignedFileUploadURL({type, screen, fileName});
                if (data !== null) {
                    result = {
                        data,
                        isSuccess: true
                    };
                } else {
                    result = {
                        message: "Not able to generate signed URL"
                    };
                }
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
    deleteFileFromAWS,
    async function (req, res, next) {
        try {
            let result = {};
            const { loggedInEmployeeId, screen, fileName = null, images = null  } = req.body;
            
            if(images != null)
            {
                let type="", data = null,fileName = null;
                const imageUrl = [];
                for (i = 0; i < images.length; i++) {
                    fileName=images[i].fileName;
                    data = await deleteFileFromAWSServer({screen, fileName});
                    // let {url, Key} = data;
                    // if (data !== null) {
                    //     imageUrl.push(images[i]);
                    // } else {
                    //     imageUrl.push({
                    //         index: images[i].index,
                    //         message: "Not able to generate signed URL",
                    //     });
                    // }
                }
                result = {
                    message: "File deleted successfully.",
                    isSuccess: true
                };
            }else{

            const data = await deleteFileFromAWSServer({screen, fileName});
            result = {
                message: "File deleted successfully.",
                isSuccess: true
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
