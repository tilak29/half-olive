const { asyncDML } = require("../../../dbutils");
const { EncryptionDecryptionKey, CompanyId } = require("../../../Config.json");

/**
 * @author "Arpankumar patel"
 */

const getLoginDetails = async ({ data }) => {
  const qry =  "EXEC GetLoginDetails '" + data.userName +"','" + data.password + "'";
  // const qry = `select ConsultantId,Mobile,DesignationId,IsActive,UserName=FirstName+' '+LastName  from ConsultantMaster as CM
  // where
  // CM.DeletedBy IS NULL
  // AND CM.LoginName = '${data.params.userName}'
  // AND CM.Password = '${data.params.password}'`;
  return await asyncDML({ qry });
  // if (Consultant.isSuccess && Consultant.recordset.length > 0) {
  //   result.ConsultantDetail = Consultant.recordset[0];
  //   if (Consultant.recordset[0].IsActive == null) {
  //     result.flag = 0;
  //     return result;
  //   } else if (Consultant.recordset[0].IsActive != 1) {
  //     result.flag = 2;
  //     return result;
  //   } else {
  //     const qry1 =
  //       "EXEC GetLoginDetails " + Consultant.recordset[0].DesignationId;
  //     const menus = await asyncDML({ qry1 });
  //     if (menus.isSuccess && menus.recordset.length > 0) {
  //       result.ConsultantDetail = menus.recordset[0];
  //       return result;
  //     }
  //   }
  // }
};

const getMenuDetails = async ({ DesignationId }) => {
  const qry = "EXEC GetMenuDetails " + DesignationId;
  return await asyncDML({ qry });
};

const getDesignationConfigurationData = async () => {
  const qry = `SELECT Name, Value, Description, Code
  FROM configurationmaster 
  WHERE Code IN ('ADMIN_DESIGNATIONS',
        'ASL_AND_ABOVE_DESIGNATIONS',
                  'SL_DESIGNATIONS',
                  'ADMIN_NSL_DESIGNATIONS',
                  'JR_ADMIN_DESIGNATIONS');`;
  return await asyncDML({ qry });
};

const setLoginDetails = async ({
  loggedInUserId,
  token,
  deviceId,
  currentDate,
  expireTokenTime,
  key,
  tokenRefreshInternal= null,
  userInfo
}) => {
  const device = deviceId ? `'${deviceId}'` : null;
  const qry =
    "EXEC InsertUpdateDataInLoginInfo '" +
    CompanyId +
    "','" +
    loggedInUserId +
    "','" +
    token +
    "'," +
    device +
    ",'1','" +
    currentDate +
    "','" +
    expireTokenTime +
    "','" +
    key +
    "'," +
    tokenRefreshInternal +
    ",'" +
    userInfo+"'";
  // const qry = `CALL InsertUpdateDataInLoginInfo_220(${CompanyId},${loggedInMobileNumber},'${token}',${device},1,'${currentDate}','${expireTokenTime}','${key}',${tokenRefreshInternal},'${userInfo}',@op_isChangePassword);
  // select @op_isChangePassword AS isChangePassword;`;
  // console.log("qry", qry);
  return await asyncDML({ qry });
};

//167589 
const updateMenuDetailsInLogin = async ({
  loggedInUserId,
  userInfo
}) => {
  const qry = `UPDATE logininfo
              SET UserInfo = '${userInfo}',
              isActive = 1
              WHERE UserId = ${loggedInUserId};`;
  return await asyncDML({ qry });
};

module.exports = {
  getLoginDetails,
  getMenuDetails,
  setLoginDetails,  
  getDesignationConfigurationData,
  updateMenuDetailsInLogin //167589 
};
