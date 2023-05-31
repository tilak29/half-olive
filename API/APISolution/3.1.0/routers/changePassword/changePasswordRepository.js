const { asyncDML } = require("../../../dbutils");
const { CompanyId, EncryptionDecryptionKey } = require("../../../Config.json");

/**
 * @author "Khushbu Shah"
 */
const setPassword = async ({
  loggedInEmployeeId,
  newPassword,
  oldPassword,
  loggedInAppIndication
}) => {
  const qry = `SET @op_IsSuccess = 0;SET @op_Flag = 0; 
  CALL ChangePassword('${loggedInEmployeeId}','${newPassword}','${oldPassword}','${EncryptionDecryptionKey}',${CompanyId}, ${loggedInAppIndication},@op_IsSuccess, @op_Flag);
  SELECT @op_IsSuccess, @op_Flag;`;
  return await asyncDML({ qry });
};

module.exports = {
  setPassword
};
