const express = require("express");
const router = express.Router();

const moment = require("moment");
//167589 
const { getLoginDetails, getMenuDetails,getDesignationConfigurationData, setLoginDetails, updateMenuDetailsInLogin } = require("./loginRepository");
const {
  getAuthInfo,
  addOrReplaceAccessDetail,  
  updateAccessMenuDetail, //167589 
  payLoadValidation,
  sendResponse,
  applicationLocked
} = require("../../../utils");
const { login } = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const { credentialEncryptionDecryptionKey } = require("../../../config.json");
const {
  login: { url: loginRouter }
} = require("../../../routerConstant");
const CryptoJS = require("crypto-js");
const { loggerInfo } = require("../../../logger.js");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /login Logged in into Application
 * @apiName Login
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /login
 *
 * @apiGroup 1.User
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Logged into the Application
 *
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} deviceId
 *
 * @apiParam (Request body) {JSON}  Input required JSON of encrypted mobilenumber and password
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "encryptedText":"U2FsdGVkX18ec27Yj9ipMD+D72g9xqva4WgzzD+R8obCVIPzvg82NTMBkU7YfJxS/q46yHPjZnVVx03Gpagt+w=="
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": true,
 *        "data": {
 *             "authInfo": {
 *                  "loggedInEDesignationId": 1,
 *                  "loggedInEmployeeId": 1,
 *                  "loggedInDivisionId": 1,
 *                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV0aG9yaXphdGlvbiIsInNjb3BlIjoiZnVsbF9hY2Nlc3MiLCJqdGkiOiJsOHRmME9tOTBMT3VvU1dOIiwiYWxnIjoiSFMyNTYiLCJ1c2VyTmFtZSI6IktodXNoYnUiLCJyb2xlSWQiOjEsIlVzZXJJZCI6MSwiY3VycmVudERhdGUiOjE1ODAyODgyMTksImlhdCI6MTU4MDI4ODIxOSwiZXhwIjoxNTgwMjg4MjI5fQ.ocXF3xd1E0RHejm9m2Ng-meyQDb6cJ-FChUdADdBKxc",
 *                  "refrshIntervalInMs": "480000"
 *              }
 *             "otherInfo": {
 *                   "serverDate": "2020-02-10 13:33:27"
 *              },
 *             "userInfo": {
 *                  "userName": "Khushbu",
 *                  "menuNames": []
 *              },
 *             "filterDesignation": {
 *                  "adminDesignations": [1],
 *              },
 *             "isChangePassword": 1
 *         },
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "You are successfully Logged in"
 *      }
 *
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": false,
 *        "data": {},
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "Please Enter Valid Credential!!"
 *      }
 *
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": false,
 *        "data": {},
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "Given User is Inactive!!"
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
  loginRouter,
  async function (req, res, next) {
    try {
      let result = {};
      const { companyId, encryptedText } = req.body;
      const deviceId = req.headers.deviceid;
      if (encryptedText) {
        const bytes = CryptoJS.AES.decrypt(
          encryptedText,
          credentialEncryptionDecryptionKey
        );
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        const bodyData = { ...decryptedData, companyId };

        const { password } = bodyData;
        const isPasswordValid = /^[a-zA-Z0-9?!@#\$%\^\&*\)\(+=_-]+$/.test(
          password
        );
        if (isPasswordValid) {
          const isValidDataType = await payLoadValidation({
            bodyData: bodyData,
            payLoad: login,
          });

          const { isValidate, validationList } = isValidDataType;

          if (isValidate) {
            const response = await getLoginDetails({
              data: bodyData,
            });
             console.log(response);
if (response.isSuccess && response.recordset.length > 0 && response.recordset[0].IsActive == 1) {
           // if (response[7] && response[7][0]["@op_IsSuccess"] === 1) {
              if (response.isSuccess && response.recordset.length > 0) {
                const {
                  ReferenceId : loggedInReferenceId,
                  UserId : loggedInUserId,
                  DesignationId: loggedInDesignationId,
                  DivisionId: loggedInDivisionId,
                  LoginName: userName,                  
                  ManagerId: managerId,                  
                } = response.recordset[0];                
               let loggedInAppIndication = 0;
               
                const designationDetails = await getDesignationConfigurationData();
                let objDesignation = {};
                for (let d of designationDetails.recordset) {
                  let value = JSON.parse(d.Value);
                  objDesignation[d.Code] = value;
                }

                  req.body = {...req.body, loggedInReferenceId: loggedInReferenceId};
                  let StockistLogin = false; // StockistLoginned[0];//167589
                  const {
                    authInfo,
                    authInfo: { token },
                    key,
                    currentDate,
                    expireTokenTime
                  } = await getAuthInfo({
                    userName,
                    loggedInDesignationId,
                    loggedInReferenceId,
                    loggedInUserId,
                    loggedInDivisionId,
                    loggedInAppIndication,                    
                    StockistLogin //167589 
                  });

                  const menuResponse = await getMenuDetails({
                  DesignationId: loggedInDesignationId,
                  });
                  // console.log(menuResponse);
                  const menus =
                  menuResponse.isSuccess && menuResponse.recordset.length > 0
                    ? menuResponse.recordset
                    : [];

                  const IsSurveyEnable = 0;

                  const userDetails = {
                  userName,
                  loggedInReferenceId,
                  loggedInUserId,
                  loggedInDesignationId,
                  loggedInDivisionId,                  
                  menus,
                  loggedInAppIndication
                 };
                 //  if(!StockistLogin) //167589 
                  await addOrReplaceAccessDetail(userDetails);
                  //  else
                  //   await updateAccessMenuDetail(userDeatils); //167589 

                 const stringifyUserDetail = JSON.stringify(userDetails);
                //167589 
                 let isPasswordChange = 1;
                  //if(!StockistLogin)
                 // {
                  const responseLogin = await setLoginDetails({
                    loggedInUserId,
                    token,
                    deviceId,
                    currentDate,
                    expireTokenTime,
                    key,
                    loggedInAppIndication,
                    tokenRefreshInternal:null,
                    userInfo: stringifyUserDetail
                  });
                  
                //  let isPasswordChange = 0;
                  // if(responseLogin.isSuccess && responseLogin[1] != null){
                  //   isPasswordChange = responseLogin[1] && responseLogin[1][0].isChangePassword;
                  // }
              // }
//167589 
                // else
                // {
                  const responseUpdate = await updateMenuDetailsInLogin({
                    loggedInUserId,
                    userInfo: stringifyUserDetail
                  });
                // }
                const tree_item = [];

                if (!deviceId) {
                  for (let m of menus) {
                    //  m.RVIM is checked while solving issue Q169805
                    if (m.PI === 0 && m.VIM === 1 && m.RVIM === 1) {
                      let obj = {};
                      let Child = [];
                      const menuId = m.MI;
                      const parmenuName = m.MN;
                      obj["Parent"] = parmenuName;
                      for (let p of menus) {
                        if (menuId === p.PI && p.VIM === 1 && p.RVIM === 1) {
                          const childMenuName = p.MN;
                          const childMenuSequence = p.SQ;
                          const isAddAllow = p.Add === 1 ? true : false;
                          const isEditAllow = p.Edit === 1 ? true : false;
                          const isViewAllow = p.View === 1 ? true : false;
                          const isDeleteAllow = p.Delete === 1 ? true : false;
                          const isViewAllAllow = p.ViewAll === 1 ? true : false;
                          let objChild = {};
                          objChild["childMenu"] = childMenuName;
                          objChild["childMenuSequence"] = childMenuSequence;
                          objChild["operationRights"] = {
                            add: isAddAllow,
                            edit: isEditAllow,
                            delete: isDeleteAllow,
                            view: isViewAllow,
                            viewAll: isViewAllAllow
                          };
                          Child.push(objChild);
                        }
                        obj["Child"] = Child;
                      }
                      tree_item.push(obj);
                    }
                  }
                }
                result = {
                  message: Message({ code: "VALIDLOGIN" }),
                  data: {
                    authInfo,
                    otherInfo: {
                      serverDate: moment()
                        .utcOffset("+05:30")
                        .format("YYYY-MM-DD HH:mm:ss")
                    },
                    userInfo: {
                      userName,
                      loggedInUserId,
                      managerId,
                      menuNames: deviceId ? undefined : tree_item
                    },
                    filterDesignation: deviceId ? undefined : objDesignation,
                    isChangePassword: isPasswordChange,                    
                    isSurveyEnable: IsSurveyEnable,
                    id:loggedInUserId
                  },
                  isSuccess: true
                };
 // result = {
              //   message: Message({ code: "VALIDLOGIN" }),
              //   data: {
              //     userInfo: {
              //       loginName: response.recordset[0].LoginName,
              //       consultantId: response.recordset[0].ConsultantId,
              //     },
              //   },
              //   isSuccess: true,
              // };
              }
            } else if(response.isSuccess && response.recordset.length > 0 && response.recordset[0].IsActive == 0) {
              result = {
                message: Message({ code: "INACTIVEUSER" }),
                isSuccess: false
              };
            } 
/*
else if (response[3][0]["@op_Flag"] === 3) {
              result = {
                message: Message({ code: "INVALIDUSERMOB" }),
                isSuccess: false
              };
            } else if (response[3][0]["@op_Flag"] === 4) {
              result = {
                message: Message({ code: "APPLICATIONBLOCK" }),
                isSuccess: false,
                statusCode: 218
              };
            } */
else {
              result = {
                isSuccess: false,
                message: Message({ code: "INVALIDUSER" })
              };
            }
          } else {
            result = {
              isSuccess: true,
              message: Message({ code: "INVALPAYLOAD" }),
              ...result
            };
          }
          req.result = { isValidate, validationList, ...result };
        } else {
          req.result = {
            isSuccess: false,
            isValidate: true,
            validationList: [],
            message: Message({ code: "INVALIDUSER" })
          };
        }
      } else {
        req.result = {
          isSuccess: false,
          isValidate: true,
          validationList: [],
          message: Message({})
        };
      }
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

module.exports = router;
