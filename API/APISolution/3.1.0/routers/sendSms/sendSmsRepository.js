const { asyncDML } = require("../../../dbutils");
const { EncryptionDecryptionKey } = require("../../../Config.json");

/**
 * @author "Parth Suthar"
 */
const sendSMSData = async ({ employeeId, code, mobileNumber }) => {  
  const id = employeeId ? employeeId : null;
  const number = mobileNumber ? `'${mobileNumber}'` : null;
  let qry = "";
  if (typeof id === "object" && id !== null) {
    qry = `SELECT CONCAT('[',GROUP_CONCAT(MobileNumber),']') AS MobileNumber FROM employeemaster WHERE EmployeeId in (${id}) or mobilenumber in (${number});SELECT * FROM smstemplate WHERE Code = '${code}';`;
  } else if (code === "ChemistBirthday") {
    qry = `SELECT Mobile as MobileNumber,ChemistName as FirstName FROM chemistmaster WHERE mobile = ${number};SELECT * FROM smstemplate WHERE Code = '${code}';`;
  } else
    qry = `SELECT MobileNumber,FirstName,CAST(AES_DECRYPT(Password,'${EncryptionDecryptionKey}') as CHAR) as Password FROM employeemaster WHERE EmployeeId = ${id} or mobilenumber = ${number};SELECT * FROM smstemplate WHERE Code = '${code}';`;  
  return await asyncDML({ qry });
};

/**
 * @author "Imran Patwa"
 */
const saveSMSData = async ({ employeeId, code, msg, loggedInEmployeeId}) => {
  const id = employeeId ? employeeId : 0;
  const smscode = code ? `'${code}'` : 'null';
  const smsmessage = msg ? `'${msg}'` : 'null';
  const qry = `INSERT INTO smsinfo (EmployeeId, SmsCode, SmsMessage, Date, CreatedDate, CreatedBy) 
  SELECT EmployeeId , ${smscode} , ${smsmessage} , CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ${loggedInEmployeeId} FROM employeemaster WHERE EmployeeId in (${id});`;  
  return await asyncDML({ qry,isDBLogCall:true });
};

module.exports = {
  sendSMSData,
  saveSMSData
};
