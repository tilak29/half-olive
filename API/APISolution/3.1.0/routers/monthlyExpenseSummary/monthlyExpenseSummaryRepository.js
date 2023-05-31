const { asyncDML } = require("../../../dbutils");
const { EncryptionDecryptionKey, CompanyId } = require("../../../Config.json");

/**
 * @author "Dileep Lohar"
 */


const getMonthiyExpense = async ({ EmployeeId,Month }) => {
  const qry =
    `SELECT * FROM monthlyleavesummary WHERE EmployeeId = ${EmployeeId} AND Month = ${Month} AND DeletedBy IS NULL OR DeletedDate= '' and CompanyId=${CompanyId}`;
  return await asyncDML({ qry });
}


module.exports = { getMonthiyExpense  }