const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");

/**
 * @author "Khushbu Shah"
 */
const getLoginDetails = async ({ data }) => {
  const qry = `CALL CS_ValidateOTPForLogin('${data}', @op_IsValide, @op_Response);
  SELECT @op_IsValide, @op_Response;`;
  return await asyncDML({ qry });
};

/**
 * @author "Aadilkhan"
 */
const saveRetailerLoginDetails = async ({ token, mobileNumber, deviceId = null }) => {
  deviceId = deviceId | "";
  const qry = `insert into logininforetailer(MobileNumber, Token, DeviceId, LoginTime)
  values ('${mobileNumber}','${token}','${deviceId}', current_timestamp)`;
  return await asyncDML({ qry });
};

/**
 * @author "Aadilkhan"
 */
const saveRetailerDeviceDetails = async ({ deviceId, mobileModal, osVersion, mobileNumber, appVersion, userType }) => {
try{
  
  const qry = `CALL SaveRetailerDeviceDetails('${deviceId}','${mobileModal}','${osVersion}','${mobileNumber}','${appVersion}','${userType}', @op_IsSuccess, @InsertedId);
  SELECT @op_IsSuccess, @InsertedId;`;
  // let qry = `SET @DeviceInfoId = (SELECT DeviceInfoId FROM retailerdeviceinfo WHERE MobileNumber = ${mobileNumber} AND DeviceId = '${deviceId}');
  //             INSERT INTO retailerdeviceinfo (DeviceInfoId, DeviceId, MobileModal, OSVersion, MobileNumber, AppVersion, UserType, CreatedBy, CreatedDate)
  //             VALUES (@DeviceInfoId, '${deviceId}','${mobileModal}','${osVersion}', ${mobileNumber}, '${appVersion}', ${userType}, ${mobileNumber}, CURRENT_TIMESTAMP)
  //             ON DUPLICATE KEY UPDATE MobileModal = '${mobileModal}', OSVersion = '${osVersion}', AppVersion = '${appVersion}', UpdatedBy = ${mobileNumber}, UpdatedDate = CURRENT_TIMESTAMP;
  //             SELECT LAST_INSERT_ID() AS InsertedId`;
  // console.log(qry);
  return await asyncDML({ qry });
}catch(e){
  console.log(new Date() + "===============================");
  console.log(`Error in inserting device infor: ${e}`);
}
};


module.exports = {
  getLoginDetails,
  saveRetailerLoginDetails,
  saveRetailerDeviceDetails
};
