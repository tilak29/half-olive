const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");

/**
 * @author "Khushbu Shah"
 */
const stockistGetData = async ({
  loggedInEmployeeId,
  stateId,
  isActive,
  search,
}) => {
  var qry = "";
  if (search == null)
    qry = `CALL GetStockistMasterData(${loggedInEmployeeId},${CompanyId},${stateId},${isActive}, null, null);`;
  else
    qry = `CALL GetStockistMasterData(${loggedInEmployeeId},${CompanyId},${stateId},${isActive}, null, '${search}');`;
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const stockistSaveData = async ({ data, operationType }) => {
  const qry = `SET @op_IsSuccess = 0;SET @op_Flag = 0; 
  CALL SaveStockistMaster_200('${data}',${operationType},@op_IsSuccess, @op_Flag);
  SELECT @op_IsSuccess, @op_Flag;`;
  return await asyncDML({ qry });
};

module.exports = {
  stockistGetData,
  stockistSaveData,
};
