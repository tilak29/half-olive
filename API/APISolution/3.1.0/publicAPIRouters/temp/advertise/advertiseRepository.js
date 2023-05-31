const { asyncDML } = require("../../../dbutils");

/**
 * @author "Khushbu Shah"
 */
const advertiseGetData = async ({ noOfGroupShow }) => {
  const qry = `SELECT AdvertiseId,CONCAT(FNGetConfigurationValueByCode('ADVERTISEMASTER_IMAGE_BASE_URL',NULL),'/',File) AS File,URL,Sequence,IsActive,UpdatedBy,UpdatedDate FROM advertisemaster where IsActive=1 Order By Sequence ${noOfGroupShow};`;
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const advertiseSaveData = async ({ data, loggedInEmployeeId }) => {
  const qry = `SET @op_IsSuccess = 0;SET @op_Flag = 0;
  CALL CS_SaveAdvertiseMaster(${loggedInEmployeeId},'${data}',@op_IsSuccess, @op_Flag);SELECT @op_IsSuccess, @op_Flag;`;
  return await asyncDML({ qry });
};

module.exports = {
  advertiseGetData,
  advertiseSaveData
};
