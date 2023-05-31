const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");

/**
 * @author "Parth Suthar"
 */
const getExpenseData = async ({ effectiveDate }) => {
  const qry = ` CALL GetExpenseMasterDataByEffectiveDate('${effectiveDate}',null,null,null,null);`;
  return await asyncDML({ qry });
};

const expenseConfigurationSaveData = async ({
  json,
  loggedInEmployeeId,
  effectiveDate
}) => {
  const qry = `CALL SaveExpenseMasterData('${effectiveDate}',${loggedInEmployeeId},'${JSON.stringify(
    json
  )}',@op_IsSuccess, @op_Flag);
    SELECT @op_IsSuccess, @op_Flag;`;
  return await asyncDML({ qry });
};
module.exports = {
  getExpenseData,
  expenseConfigurationSaveData
};
