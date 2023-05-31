const express = require("express");
const router = express.Router();
const { GetMenuListForConfig, SaveMenuRole } = require("./menuRoleRepository");
const { payLoadValidation, sendResponse } = require("../../../utils");
const { validateGetMenuRoleData } = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  menuRole_getMenuList: { url: getData },
  menuRole_refreshMenuItem: { url: refreshMenuItem },
  menuRole_saveMenuRoleData: { url: saveMenuRoleData },
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");
 
/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /menuRole/getData Logged in into Application
 * @apiName Login
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /menuRole/getData
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
    getData,
  async function (req, res, next) {
    try {
      let result = {};
      const { loggedInEmployeeId } = req.body;

          const isValidDataType = await payLoadValidation({
            bodyData: req.body,
        payLoad: validateGetMenuRoleData,
          });

          const { isValidate, validationList } = isValidDataType;

          if (isValidate) {
            const response = await GetMenuListForConfig({
          loggedInEmployeeId: loggedInEmployeeId,
          menuId: null,
            });

                const { isSuccess } = response;
                delete response.isSuccess;
                if (isSuccess === true) {                    
                    const menus = response[0];
                    const tree_item = [];
                    var parentId = -1;
                    var childId=-1;
                    for (let m of menus) {
                        if (m.ParentId === 0 && m.VisibleInMenu === 1) {
                        let obj = {};
                        let Child = [];
                        const menuId = m.MenuId;
                        const parmenuName = m.MenuName;
                        obj["Parent"] = parmenuName;
                        obj["MenuId"] = menuId;
                        parentId++;
                        childId = -1;
                        for (let p of menus) {
                if (
                  menuId === p.ParentId &&
                  p.VisibleInMenu === 1
                ) {
                            childId++;
                            const childMenuName = p.MenuName;
                            const childMenuSequence = p.Sequence;
                            let objChild = {};
                            objChild["id"] = parentId+" "+childId;
                            objChild["MenuId"] = p.MenuId;
                            objChild["childMenu"] = childMenuName;
                  objChild["IsJrAdmin"] = p.IsJrAdmin;
                  objChild["IsSAdmin"] = p.IsSAdmin;
                  objChild["IsSJrAdmin"] = p.IsSJrAdmin;
                  objChild["IsSSAdmin"] = p.IsSSAdmin;
                  objChild["IsSSJrAdmin"] = p.IsSSJrAdmin;
                            objChild["childMenuSequence"] = childMenuSequence;

                            Child.push(objChild);
                            }
                            obj["Child"] = Child;
                        }
              if (obj.Child.length > 0) {
                        tree_item.push(obj);
                        }
                    }
          }

                result = {
                    message: Message({ code: "Success" }),
                    data: {
              menuList: tree_item,
                    },
            isSuccess,
                };
                } else {
                result = {
                    message: Message({}),
            isSuccess: false,
                };
                }          
          } else {
            result = {
              isSuccess: true,
              message: Message({ code: "INVALPAYLOAD" }),
          ...result,
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
  refreshMenuItem,
  async function (req, res, next) {
    try {
      let result = {};
      const { loggedInEmployeeId, menuId } = req.body;

      const response = await GetMenuListForConfig({
        loggedInEmployeeId: loggedInEmployeeId,
        menuId: menuId,
      });

      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            menuList: response[0],
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

router.post(
  saveMenuRoleData,
  async function (req, res, next) {
    try {
      let result = {};

      const response = await SaveMenuRole({
        data: JSON.stringify(req.body),
      });

      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "RSAVE" }),
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

module.exports = router;
