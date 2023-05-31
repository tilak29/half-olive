const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");

/**
 * @author "Khushbu Shah"
 */
const setLoginDetails = async ({
  loggedInUserId,
  token,
  expireTokenTime,
  key,
  oldToken
}) => {
  const qry = `SET @IsStockist = 0; 
  UPDATE logininfo SET 
  OldToken = (CASE WHEN @IsStockist = 1 THEN NULL ELSE Token END), 
  OldTokenKey = (CASE WHEN @IsStockist = 1 THEN NULL ELSE TokenKey END), 
  Token='${token}', TokenKey='${key}', ExpirationTime='${expireTokenTime}', RefreshTime = CURRENT_TIMESTAMP 
  WHERE UserId=${loggedInUserId} and IsActive =1 AND IFNULL(IsInfoChanged,0)=0;`;
  return await asyncDML({ qry });
};

module.exports = {
  setLoginDetails
};
