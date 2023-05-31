const { asyncDML } = require("../../../dbutils");
const { CompanyId, EncryptionDecryptionKey } = require("../../../Config.json");

/**
 * @author "Khushbu Shah"
 */
const getPassword = async ({ mobileNumber, code }) => {
  const qry = `SELECT CAST(AES_DECRYPT(Password,'${EncryptionDecryptionKey}') as CHAR) as Password
                      ,FirstName 
              from employeemaster 
              WHERE MobileNumber='${mobileNumber}' 
              and CompanyId=${CompanyId}
              UNION
              SELECT CAST(AES_DECRYPT(Password,'${EncryptionDecryptionKey}') as CHAR) as Password
                      ,StockistName AS FirstName
              from stockistmaster 
              WHERE MobileNumber='${mobileNumber}' 
              and CompanyId=${CompanyId}
              LIMIT 1
  ;
  SELECT * FROM smstemplate WHERE Code = '${code}'`;
  return await asyncDML({ qry });
};

module.exports = {
  getPassword
};
