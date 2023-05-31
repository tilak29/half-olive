const { Validator } = require("node-input-validator");
const moment = require("moment");
const caseConverter = require("case-converter");
const NodeGeocoder = require("node-geocoder");

const { asyncDML } = require("./dbutils");
const {
  CompanyId,
  CountryId,
  ProjectStartDate,
  bufferTimeForServerDateInMinute,
  googleAPIKey,
  jwt: {
    expiretime,
    tokenTimeIn,
    refrshIntervalInMs,
    publicAPITokenExpiretime,
    publicAPITokenTimeIn,
    publicAPIKey
  },
  Environment,
  RestrictedMode: {isRestricted, usersMobNoListToAccessAppOnRestriction}
} = require("./config.json");
const { createAccessToken, verifyToken, destroyToken } = require("./jwt-token");
const { Message } = require("./Messages");
const { loggerInfo } = require("./logger.js");
const version = require("./version");
const routerConstant = require("./routerConstant");
const { handleError } = require("./error.js");


let trimRequestValidation = 0,
  userAccessDetails = [],
  lastAccessDetails = [],
  designationDetails = [];

/**Get Designation Details */
const getDesignationDetails =async () => {
  try {
    const qry = `SELECT Name, Value, Description, Code 
    FROM configurationmaster 
    WHERE Code IN ('ADMIN_DESIGNATIONS',
                  'ASL_AND_ABOVE_DESIGNATIONS',
                  'SL_DESIGNATIONS',
                  'ADMIN_NSL_DESIGNATIONS',
                  'JR_ADMIN_DESIGNATIONS')`;
    const response = await asyncDML({ qry });
    if(response != null && response.isSuccess)
    {
      designationDetails[0] = response.recordset;
    }      
  } catch (error) {    
  }
}
/** End Get Designation Details */

/**
 * @author "Khushbu Shah,Parth Suthar"
 */
const payLoadValidation = async ({ bodyData, payLoad }) => {
  const v = new Validator(bodyData, payLoad);
  let result = {};
  await v.check().then(function (matched) {
    result["isValidate"] = matched;
    const errors = v.errors;
    const validationList = Object.keys(errors).map((key) => {
      let b = {};
      b[key] = errors[key].message;
      return b;
    });
    result["validationList"] = validationList;
  });
  return result;
};

/**
 * @author "Khushbu Shah"
 */
const checkPermission = async ({ result, permission }) => {
  const { View, Add, Edit, Delete, ViewAll, TeamView } = result[0];
  let isActionAllow = false;
  switch (permission) {
    case "V":
      if (View === 1) isActionAllow = true;
      break;
    case "I":
      if (Add === 1) isActionAllow = true;
      break;
    case "E":
      if (Edit === 1) isActionAllow = true;
      break;
    case "D":
      if (Delete === 1) isActionAllow = true;
      break;
      case "L":
        if (ViewAll === 1) isActionAllow = true;
        break;
    }
  return isActionAllow;
};

const removeUserDetailFromArray = async({id_token}) =>{
  return;
}

const checkRetailerTokenInDb = async({id_token, mobileNumber = null, logid}) => {
  try
  {
    const qryToCheckIsActive = `select l.DeviceId,l.IsInfoChanged 
                                from logininforetailer l
                                where l.Token='${id_token}'
                                and l.MobileNumber = ${mobileNumber}
                                LIMIT 1;`;

    const response = await asyncDML({ qry: qryToCheckIsActive });
    if (response == null || response[0] == null){
      return null;
    }

    if(response[0].IsInfoChanged === 1) {
      removeUserDetailFromArray(id_token);
      return false;
    }

    return true;
  }catch(e){
    loggerInfo({code: "error", message: `checkRetailerTokenInDb : URL ${req.url} Token (${id_token})`, res, logid});
    removeUserDetailFromArray(id_token);
    return null;
  }

}

//167589
const checkStockistTokenInDb = async({loggedInUserId}) => {
  try
  {
    const qryToCheckIsActive = `select l.TokenKey 'key',l.Token 'token',
                                ExpirationTime, UserInfo
                                from logininfo l
                                where l.UserId = ${loggedInUserId}
                                LIMIT 1;`;

    const response = await asyncDML({ qry: qryToCheckIsActive });
    if (response == null || response[0] == null){
      return null;
    }    
    return response[0];
   
  }catch(e){    
    return null;
  }
}

const getUserLoginInfoById = async({Id = null, logid}) => {
  try
  {
//167589
    const qry = `SELECT TokenKey, DeviceId, isActive, IsInfoChanged, OldTokenKey, UserInfo,IsStockist=0 FROM logininfo WHERE UserId = ${Id}`;
    // LIMIT 1;;
    // IFNULL((select 1 from stockistmaster where mobilenumber =  ${Id}),0) as  'IsStockist'  
    const response = await asyncDML({ qry });
    if (response == null || response.recordset[0] == null){
      return null;
    }

    return response.recordset[0];
  }catch(e){
    loggerInfo({code: "error", message: `getUserLoginInfoById  Id:${Id}`, res, logid});
    return null;
  }
}
 const updateOldTokenKey = async({Id = null, logid}) => {
  try
  {
    const qry = `UPDATE logininfo
    SET OldTokenKey = NULL
    WHERE UserId = ${Id};`;
    asyncDML({ qry });
  }catch(e){
    loggerInfo({code: "error", message: `updateOldTokenKey  Id:${Id}`, res, logid});
    return null;
  }
}


const authenticateUser = async({req, res}) => {
  const id_token = req.headers.authorization;
  const ispublicapi = req.headers.ispublicapi
  const Id = req.headers.id; 
  const logid = req.body.logid;
  
  let currentUserDetail = null, tokenInfo= null;

  // if(ispublicapi != null && (ispublicapi === true || ispublicapi === "true" || ispublicapi === "True"))
  // {
  //   //Start: check if token if valid for retailer application user
  //   try {
  //     const tokenVerified = verifyToken(id_token, publicAPIKey);
      
  //     const mobileNumber = tokenVerified.loggedInMobileNumber;
  //     const isRetailerTokenValid = await checkRetailerTokenInDb({id_token, mobileNumber, logid});
  //     if(isRetailerTokenValid == null)
  //     {
  //       loggerInfo({code: "log", message: `isRetailerTokenValid == null`, res, logid});
  //       await inActiveTokenResponse({ req, res });
  //       return null;  
  //     }
  //     else if(!isRetailerTokenValid){
  //       loggerInfo({code: "log", message: `isRetailerTokenValid == false`, res, logid});
  //       await inActiveTokenResponse({ req, res });
  //       return null;
  //     }

  //     return {
  //       tokenInfo: tokenVerified, 
  //       currentUserDetail: {...tokenVerified, menus: JSON.parse(tokenVerified.menus)}
  //     };
  //   } catch (e) {
  //     loggerInfo({code: "error", message: `Token Expired : URL ${req.url} Token (${id_token})`, res, logid});
  //     await inActiveTokenResponse({ req, res });
  //     return null;
  //   }
  //   //End: check if token if valid for user
  // }

  // login and token varification for SL App and Admin Portal
  try{      
      const userLoginInfo = await getUserLoginInfoById({Id, logid});
      const {TokenKey, DeviceId, isActive = 0, IsInfoChanged, OldTokenKey=null, UserInfo, IsStockist } = userLoginInfo; //167589

      if (userLoginInfo == null){
        await inActiveTokenResponse({ req, res });
        return null;    
      }
      if(IsInfoChanged === 1) {
        req.body = { isInfoChange: true, ...req.body };
        loggerInfo({code: "log", message: `IsInfoChanged == 1`, res, logid});
        await inActiveTokenResponse({ req, res });
        return null;
      }
      if(isActive === 0){
        loggerInfo({code: "log", message: `IsActive == 0`, res, logid});
        await inActiveTokenResponse({ req, res });
        return null;
      }

  //Start: check if token if valid for SL application user
      let tokenVerified = true;
      try {
        const tokenVerified = verifyToken(id_token, TokenKey);
        updateOldTokenKey({Id, logid}); // if user token is verified successfully with token than nullify the old token key as it should not be used
        tokenInfo = tokenVerified;        
      } catch (e) {
        if(OldTokenKey != null) // check if old token key is still alive
        {
          try {
            const tokenVerified = verifyToken(id_token, OldTokenKey); // verify user token with old token key
            tokenInfo = tokenVerified;
          } catch (error) {
            tokenVerified = false;
          }
        }
//167589
        else if(IsStockist)
        {
          // let currentUserLoginInfos = userAccessDetails && userAccessDetails.filter((x) => x.loggedInMobileNumber === Id );  
          // tokenInfo = currentUserLoginInfos[0].tokenInfo ;
          tokenInfo = UserInfo;
          tokenVerified = true;
        }
        else{
          tokenVerified = false;
        }
      }
      if(!tokenVerified)
      {
        loggerInfo({code: "error", message: `Token Expired : URL ${req.url}`, res, logid});
        await inActiveTokenResponse({ req, res });
        return null;
      }
      //End: check if token is valid for user

      if(DeviceId)
      {
        tokenInfo = {...tokenInfo, DeviceId};
      }
      // userAccessDetails = []; //167589
      const parsedUserInfo = JSON.parse(UserInfo); //167547
      // const parsedUserInfo = {...parsedUserInf,tokenInfo}; //167589
      let currentUserLoginInfo = userAccessDetails && userAccessDetails.filter((x) => x.userName === Id );  
      if(currentUserLoginInfo == null || currentUserLoginInfo.length == 0){
        // const parsedUserInfo = JSON.parse(UserInfo);//167547
        userAccessDetails.push(parsedUserInfo);
        currentUserLoginInfo.push(parsedUserInfo);
      }
      //167547
      else if(parsedUserInfo.loggedInUserId !=  currentUserLoginInfo[0].loggedInUserId){            
        removeOldAndAddNewAccessDetail(parsedUserInfo);
        currentUserLoginInfo = null;
        currentUserLoginInfo.push(parsedUserInfo);      
      }
      currentUserDetail = currentUserLoginInfo[0];      
    }
    catch (e) {
      loggerInfo({code: "error", message: `User Info not found : URL ${req.url}`, res, logid});
      await inActiveTokenResponse({ req, res });
      return null;
    }
//167589
    const { loggedInUserId, loggedInAppIndication, userName, loggedInReferenceId} = currentUserDetail;
    req.body = {
      ... req.body,
      loggedInUserId,
      loggedInAppIndication,
      userName, //167589
      loggedInReferenceId
    }

    return {tokenInfo, currentUserDetail};
}

const authorizeUser = async ({url, currentUserDetail, logid}) =>{
  try{
    const removedIndex = url.lastIndexOf("/");
    let apiURL = url.substring(0, removedIndex);
    const apiName = url.split("/").reverse()[0];
    const routerName = `${apiURL}_${apiName}`.substring(1);
    if(apiURL === "" && apiName !== ""){
      apiURL = url;
    }

    permission =
      (routerConstant[routerName] && routerConstant[routerName].permission) ||
      (routerConstant["publicAPIRouterConstant"][routerName] && routerConstant["publicAPIRouterConstant"][routerName].permission);

      if(permission === "O"){ // return true if api is declared as open
        return {routerName, isAuthorized: true};
      }

      const requestedMenu = currentUserDetail.menus.filter( (x) => x.url === apiURL);

      if(requestedMenu == null || requestedMenu.length == 0){
        return null;
      }

      const isAuthorized =  await checkPermission({ result:requestedMenu, permission });
      return {routerName, isAuthorized};
  }
  catch(e){
    loggerInfo({code: "error", message: `${e}`,logid });
    return null;
  }
}

/**
 * @author "Khushbu Shah"
 */
const validateUser = async (req, res, next) => {
  try{

    logid = await loggerInfo({ code: "log", message: "", res });
    req.body = {...req.body, logid};
    const { userName } = req.body;
    let currentUserDetail = null, tokenInfo = null, routerName = "";

    // Start: store client log
    if (req.url === routerConstant.insertClientLog.url) {
      loggerInfo({ code: "error", message: `${JSON.stringify(req.body)}`, isClientLog: true });
      res.sendStatus(200);
      return;
    }
    // End: store client log

    let isPublicAPIHeader = req.headers["ispublicapi"] || false;
    isPublicAPIHeader = isPublicAPIHeader == 'true' || isPublicAPIHeader == 'True' || isPublicAPIHeader == true;
    const versionHeader = req.headers["accept-version"];
    const deviceIdHeader = req.headers["deviceid"];
    const userId = req.headers["id"];
    

    const url = req.url;

    // Start: Check if version is proper
    const versionDetail = version && version.filter((version) => version.version === versionHeader);

    if (versionDetail.length <= 0 || versionDetail[0].deprecated) {
      const message = Message({ code: "VersionDeprecated" });
      req.result = {
        isSuccess: false,
        statusCode: 405,
        isValidate: true,
        validationList: [],
        message
      };
      sendResponse(req, res);
      return;
    }

    // End: Check if version is proper

    // Start: Allow public API to work without any validation
    if (
      "OPTIONS" === req.method ||
      url === "/login" ||
      url === "/logOut" ||
      url === "/publicAPILogin" ||
      url === "/isAuthorizedUser" ||
      url === "/userRegistration/insertData" ||
      url === "/version/getData" ||
      url === "/gpsTracer/insertData" ||
      url === "/forgotPassword" ||
      url === "/sendMail" ||
      url === "/deviceConfiguration/insertData" ||
      url === "/downloadFile" ||
      // url === "/refreshToken" ||
      url == "/documentType/getData" ||
      url == "/documentType/getDocumentData" ||
      url == "/gpsTracer/getDataByDateTimeAndEmployee" ||
      url == "/diseaseMaster/getDiseaseMaster" ||
      url == "/treatment/updateDisease"
    ) {
      req.body = {
        companyId: CompanyId,
        userName: userName || '',

        ...req.body
      };
      req.url = `/${versionHeader}${url}/`;
      next();
      return;
    }
    // End: Allow public API to work without any validation
    if(userId != null)
    {
      req.body = {...req.body, userId: userId}
    }


    //Start: Validate Token (Authenticate user)
    const isUserAuthenticated = await authenticateUser({req, res})
    if(isUserAuthenticated == null){
      next();
      return;
    }
    currentUserDetail = isUserAuthenticated.currentUserDetail;
    tokenInfo = isUserAuthenticated.tokenInfo;
    //End: Validate Token (Authenticate user)
    
    //Start: Check menu permissions for request only for SL and WEB, not required for stockist/superstockist/chemist
    //if(tokenInfo.loggedInAppIndication == 3)
    //{
      const isAuthorized = await authorizeUser({url, currentUserDetail, logid});
      if (isAuthorized === null){
        req.result = unAuthorized({ req, res });
        return;
      }
      routerName = isAuthorized.routerName;
    //}
    //End: Check menu permissions for request


    //Strat: Check if deviceId header is present and same is matching with actual deviceid
    const DeviceId = tokenInfo.DeviceId
    if(Environment === "Dev")
    {
      //some code for dev envirnment
    }
    else if (tokenInfo.loggedInAppIndication == 3 && deviceIdHeader && deviceIdHeader !== "" && DeviceId != deviceIdHeader) {
      req.result = unAuthorized({ req, res });
      return;
    }
    //End: Check if deviceId header is present and same is matching with actual deviceid


    //Start: Check body content and correct the content if not proper as per system requirement
    let body = req.body;
    trimRequestValidation = 0;
    if (req.body.objArr) {
      body = JSON.parse(req.body.objArr)[0];
    }
    const { isValid, formattedBody } = await trimRequest({ bodyData: { ...body } });
    if (isValid === false || trimRequestValidation > 0) {
      req.result = await inValidDataTypeResponse({ req, res });
      return;
    }

    req.body = { ...formattedBody };
    //End: Check body content and correct the content if not proper as per system requirement


    if(designationDetails == null || designationDetails.length === 0 )
    {
      await getDesignationDetails();
    }


    //isRestricted, usersMobNoListToAccessAppOnRestriction
    if(isRestricted)
    {
      let loggedUserName = tokenInfo.userName ? tokenInfo.userName : currentUserDetail.userName;
      if(usersMobNoListToAccessAppOnRestriction.indexOf(loggedUserName) == -1)
      {
        req.result = {
          isValidate: false,
          isSuccess:true,
          validationList: [],
          message:"Application under maintenance."
        };
        sendResponse(req, res);
        return;
      }
    }

    try {
      let loggedInDesignationId,
      loggedInUserId,
      userName,
      loggedInAppIndication,
      loggedInDivisionId,
      loggedInReferenceId;

      loggedInDesignationId = tokenInfo.loggedInDesignationId;
      loggedInUserId = tokenInfo.loggedInUserId;
      loggedInAppIndication = tokenInfo.loggedInAppIndication;
      loggedInDivisionId = tokenInfo.loggedInDivisionId;      
      userName = tokenInfo.userName;
      loggedInReferenceId = tokenInfo.loggedInReferenceId;

      const bodyData = {
        loggedInUserId,
        companyId: CompanyId,
        countryId: CountryId,
        loggedInDivisionId,
        loggedInDesignationId,
        loggedInAppIndication, 
        userName,
        loggedInReferenceId,               
        ...req.body
      };
      req.body = bodyData;

      req.url = `/${versionHeader}${url}`;

      next();
      return;
    } catch (e) {
      loggerInfo({code: "error", message: `${e}`,logid });
      handleError(e, res);
    }
  }
  catch(e){
    loggerInfo({code: "error", message: `${e}`,logid });
    await inActiveTokenResponse({ req, res });
    return null;
  }
      
};

/**
 * @author "Khushbu Shah"
 */
const unAuthorized = ({ req, res, e = {} }) => {
  const message = e.message || Message({ code: "UNAUTH" });
  const name = e.name || "Error";
  req.result = {
    statusCode: 401,
    isValidate: false,
    validationList: [{ [name]: message }],
    message
  };
  sendResponse(req, res);
};

/**
 * @author "Khushbu Shah"
 */
const sendResponse = (req, res) => {
  try{
    const result = req.result;
    const logid = req.body.logid;
    const {
      statusCode = 200,
      isSuccess = false,
      data = {},
      isCamelCase = false,
      message = ""
    } = result;
    const camelCase = isCamelCase
      ? JSON.parse(caseConverter.toCamelCase(JSON.stringify(data)))
      : caseConverter.toCamelCase(data);
    const response = {
      ...result,
      statusCode,
      isSuccess,
      data: camelCase
    };
    const { userName = '' } = req.body;
    let bodydata = "";
    let logMode = "";
    if (!(statusCode == 200 && isSuccess == true))
    {
      logMode = "FAILED: "
      bodydata = "|BODY|=> "+JSON.stringify(req.body);
    }
    loggerInfo({ code: "log", message: `${logMode}Response End:`+ JSON.stringify(message)+bodydata, res, logid });
    res.status(statusCode).json({ ...response });
}
catch(e){
  loggerInfo({ code: "error", message: `sendResponse Response Error`+JSON.stringify(e), res, logid });
  res.status(500).json({ ...response });
}
};

/**
 * @author "Khushbu Shah"
 */ //167589
const getAuthInfo = async ({
  userName,
  loggedInDesignationId,
  loggedInReferenceId,
  loggedInUserId,
  loggedInDivisionId,
  isPublicAPI = false,
  loggedInAppIndication = 3,
  menus = null,
  StockistLogin //167589
}) => {
  const currentDate = moment()
    .utcOffset("+05:30")
    .format("YYYY-MM-DD HH:mm:ss");
  let expireTokenTime;
  if (isPublicAPI) {
    expireTokenTime = moment()
      .add(publicAPITokenExpiretime, publicAPITokenTimeIn)
      .utcOffset("+05:30")
      .format("YYYY-MM-DD HH:mm:ss");
  } else {
    expireTokenTime = moment()
      .add(expiretime, tokenTimeIn)
      .utcOffset("+05:30")
      .format("YYYY-MM-DD HH:mm:ss");
  }
//167589
  if(StockistLogin)
  {
    const { token, key } = await checkStockistTokenInDb({userName});
    
    if(token)
    {
      return {
        key,
        currentDate,
        expireTokenTime,
        authInfo: {
          loggedInDesignationId,
          userName,
          loggedInUserId,
          loggedInReferenceId,
          token,
          refrshIntervalInMs
        }
      };
    }
  }

  const { token, key } = createAccessToken({
    userName,
    loggedInDesignationId,
    loggedInReferenceId,
    loggedInUserId,
    loggedInDivisionId,
    currentDate,
    isPublicAPI,
    loggedInAppIndication,    
    menus
  });

  return {
    key,
    currentDate,
    expireTokenTime,
    authInfo: {
      loggedInDesignationId,
      userName,
      loggedInUserId,
      loggedInReferenceId,
      token,
      refrshIntervalInMs
    }
  };
};

/**
 * @author "Parth Suthar"
 */
const applicationLocked = async ({ req, res }) => {
  const message = Message({ code: "APPLICATIONBLOCK" });
  req.result = {
    statusCode: 218,
    isValidate: true,
    validationList: [],
    message
  };
  sendResponse(req, res);
};

/**
 * @author "Khushbu Shah"
 */
const inActiveTokenResponse = async ({ req, res }) => {
  const { isInfoChange } = req.body;
  const message = isInfoChange
    ? Message({ code: "INFOCHANGE" })
    : Message({ code: "INACTIVETOKEN" });
  const url = req.url;
  const isSuccess = url === "/logOut" ? true : false;
  req.result = {
    statusCode: url === "/logOut" ? 200 : 440,
    isValidate: true,
    validationList: [],
    message,
    isSuccess
  };
  sendResponse(req, res);
};

/**
 * @author "Khushbu Shah"
 */
const addOrReplaceAccessDetail = async (object) => {
  const index = userAccessDetails.findIndex(
    (x) => x.userName === object.userName
  );

  if (index !== -1) {
    userAccessDetails[index] = {
      ...userAccessDetails[index],
      token: object.token,
      key: object.key,
      menus: object.menus == null ? userAccessDetails[index].menus : object.menus
    };
  } else {
    userAccessDetails.push(object);
  }
};

//167547
/**
 * @author "Imran Patwa"
 */
 const removeOldAndAddNewAccessDetail = async (object) => {
  const index = userAccessDetails.findIndex(
    (x) => x.userName === object.userName
  );
  if (index !== -1) { 
    userAccessDetails[index] = object;
  }
};

//167589
/**
 * @author "Imran Patwa"
 */
 const updateAccessMenuDetail = async (object) => {
  const index = userAccessDetails.findIndex(
    (x) => x.userName === object.userName
  );

  if (index !== -1) {
    userAccessDetails[index] = {
      ...userAccessDetails[index],
      menus: object.menus == null ? userAccessDetails[index].menus : object.menus
    };
  } 
};

/**
 * @author "Khushbu Shah"
 */
const inValidDataTypeResponse = async ({ req, res }) => {
  const message = Message({ code: "SPECIALCHAR" });
  const name = "Error";
  req.result = {
    statusCode: 200,
    isValidate: false,
    isSuccess: true,
    validationList: [{ [name]: message }],
    message
  };
  sendResponse(req, res);
};

/**
 * @author "Khushbu Shah"
 */
const trimRequest = async ({ bodyData }) => {
  let isValid = true;
  const formattedBody = Object.keys(bodyData).reduce((acc, curr) => {
    if (isValid === true) {
      acc[curr] = bodyData[curr];
      if (
        acc[curr] &&
        acc[curr] !== null &&
        curr !== "image" &&
        typeof acc[curr] === "string" &&
        /^[\na-zA-Z0-9 <>?!@#|:,’‘/\$%\^\&*\)\(\]\[+=._\{\}-]+$/.test(acc[curr]) ===
          false
      ) {
        isValid = false;
        trimRequestValidation = trimRequestValidation + 1;
      }
      if (
        isValid === true &&
        acc[curr] &&
        acc[curr] !== null &&
        typeof acc[curr] !== "object" &&
        typeof acc[curr] !== "number" &&
        (acc[curr].toString().includes("\\n") ||
          acc[curr].toString().includes("\\t") ||
          acc[curr].toString().includes("\n"))
      ) {
        acc[curr] = acc[curr].toString().replace(/\\n/g, " ");
        acc[curr] = acc[curr].toString().replace(/\\t/g, " ");
        acc[curr] = acc[curr].toString().replace(/\n/g, "\\n");
      }

      if (
        isValid === true &&
        acc[curr] &&
        acc[curr] !== null &&
        typeof acc[curr] === "string"
      )
        acc[curr] = acc[curr].toString().trim();

      if (
        isValid === true &&
        acc[curr] &&
        acc[curr] !== null &&
        (acc[curr].toString().includes("'") ||
          acc[curr].toString().includes("’") ||
          acc[curr].toString().includes("‘")) &&
        typeof acc[curr] === "string"
      ) {
        acc[curr] = acc[curr].toString().replace(/'/g, "''");
        acc[curr] = acc[curr].toString().replace(/’/g, "''");
        acc[curr] = acc[curr].toString().replace(/‘/g, "''");
      }

      if (
        acc[curr] !== null &&
        acc[curr] !== undefined &&
        typeof acc[curr] === "object" &&
        Object.prototype.toString.call(acc[curr]) === "[object Array]" &&
        Object.prototype.toString.call(acc[curr][0]) !== "[object Number]"
      ) {
        let newAcc = [];

        // acc[curr] = acc[curr].map(async (x) => {
        //   x = await trimRequest({ bodyData: x }).then((a2) => {
        //     let a = a2.formattedBody;
        //     if (a2.isValid === false) {
        //       trimRequestValidation = trimRequestValidation + 1;
        //     }
        //     return a;
        //   });
        //   newAcc.push(x);
        // });
        const trimmedValues = Promise.all(acc[curr].map(async (x) => {
          const trimmedBody = await trimRequest({ bodyData: x });
          if(trimmedBody.isValid === false)
          {
            trimRequestValidation = trimRequestValidation + 1;
          }
          x = trimmedBody.formattedBody;

          newAcc.push(x);
        })
        );

        
        acc[curr] = newAcc;
      }

      if (
        acc[curr] !== null &&
        acc[curr] !== undefined &&
        typeof acc[curr] === "object" &&
        Object.prototype.toString.call(acc[curr]) === "[object Object]"
      ) {
        Object.keys(acc[curr]).forEach(async function (key) {
          const a2 = await trimRequest({ bodyData: acc[curr] });
          const { formattedBody } = a2;
          acc[curr] = formattedBody;
        });
      }
      return acc;
    }
  }, {});
  return { isValid, formattedBody, trimRequestValidation };
};

/**
 * @author "Khushbu Shah"
 */
const getNoOfGroupShow = async ({ totalRecords, startFrom }) => {
  if (totalRecords === undefined || totalRecords === "") {
    totalRecords = 0;
  }
  let noOfGroupShow = "";
  if (totalRecords.toString() !== "0") {
    if (startFrom && startFrom !== "") {
      noOfGroupShow = `LIMIT ${startFrom - 1}`;
    } else {
      noOfGroupShow = `LIMIT 0`;
    }
    noOfGroupShow = `${noOfGroupShow},${totalRecords}`;
  }
  return noOfGroupShow;
};

/**
 * @author "Khushbu Shah"
 */
const dateMonthYearRange = ({
  startMonth = 0,
  endMonth = 0,
  isFinancialYear = false,
  startYear = 0,
  endYear = 0
}) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let startDate, endDate;
  if (isFinancialYear) {
    const currentMonthYear = moment()
      .utcOffset("+05:30")
      .format("YYYY-MM")
      .split("-");
    const startYearRange = parseInt(currentMonthYear[0]) + parseInt(startYear);
    const endYearRange = parseInt(currentMonthYear[0]) + parseInt(endYear);
    const currentMonth = parseInt(currentMonthYear[1]);
    if (currentMonth <= 3) {
      startDate = startYearRange - 1 + "-04-01";
      endDate = endYearRange + "-03-31";
    } else {
      startDate = startYearRange + "-04-01";
      endDate = endYearRange + 1 + "-03-31";
    }
  } else {
    startDate = moment()
      .utcOffset("+05:30")
      .add(startMonth, "M")
      .format("YYYY-MM-DD");
    endDate = moment()
      .utcOffset("+05:30")
      .add(endMonth, "M")
      .format("YYYY-MM-DD");
  }

  if(startDate < ProjectStartDate)
    startDate = ProjectStartDate;
  const start = startDate.split("-");
  const end = endDate.split("-");
  const startYears = parseInt(start[0]);
  const endYears = parseInt(end[0]);
  const dates = [];

  for (let i = startYears; i <= endYears; i++) {
    const endMon = i != endYears ? 11 : parseInt(end[1]) - 1;
    const startMon = i === startYears ? parseInt(start[1]) - 1 : 0;
    for (let j = startMon; j <= endMon; j = j > 12 ? j % 12 || 11 : j + 1) {
      const month = j + 1;
      const displayMonth = month < 10 ? month : month;
      let monthValue = {
        label: [monthNames[displayMonth - 1], i].join("-"),
        value: [displayMonth, i].join("-")
      };
      dates.push(monthValue);
    }
  }
  return dates;
};

/**
 * @author "Khushbu Shah"
 */
const dateYearRange = ({ startYear, endYear }) => {
  const currentYear = JSON.parse(moment().utcOffset("+05:30").format("YYYY"));
  let ProjectStartYear = parseInt(ProjectStartDate.split("-")[0]);
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  let ConsiderYearStart = (currentYear + startYear) < ProjectStartYear ? currentYear :  currentYear + startYear; 
  let yearList = range(currentYear + endYear, ConsiderYearStart, -1);
  yearList = yearList.reverse().map((year) => {
    year = { label: year, value: year };
    return year;
  });
  return yearList;
};

const checkCurrentTime = ({ currentTime }) => {
  const now = moment().utcOffset("+05:30");
  const formattedCurrentTime = moment(currentTime, "YYYY-MM-DD HH:mm:ss");
  const duration = moment.duration(now.diff(formattedCurrentTime));
  let diffInMinutes = duration.asMinutes();
  if (diffInMinutes < 0) diffInMinutes = -diffInMinutes;
  return diffInMinutes < bufferTimeForServerDateInMinute;
};

const getLocation = async ({ lat, lon }) => {
  const options = {
    provider: "google",
    apiKey: googleAPIKey,
    formatter: null
  };

  try {
    const geocoder = NodeGeocoder(options);
    const response = await geocoder.reverse({ lat, lon });
    return response && response[0]
      ? response[0].formattedAddress
      : "No Address Found";
  } catch (e) {
    loggerInfo({
      code: "error",
      message: `${e}`
    });
    return "No Address Found";
  }
};

module.exports = {
  payLoadValidation,
  sendResponse,
  validateUser,
  getAuthInfo,
  addOrReplaceAccessDetail,
  userAccessDetails,
  getNoOfGroupShow,
  dateMonthYearRange,
  dateYearRange,
  checkCurrentTime,
  applicationLocked,
  getLocation,
  trimRequest,
  inValidDataTypeResponse,
  designationDetails, 
  updateAccessMenuDetail //167589
};
