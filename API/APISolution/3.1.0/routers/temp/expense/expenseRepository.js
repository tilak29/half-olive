const { asyncDML } = require("../../../dbutils");

/**
 * @author "Parth Suthar"
 */
const expenseSaveData = async ({ data, loggedInEmployeeId, operationType }) => {
  const qry = `SET @op_IsSuccess = 0;SET @op_Flag = 0; 
  CALL SaveExpenseDetailByEmployeeId(${loggedInEmployeeId},'${data}',${operationType},@op_IsSuccess, @op_Flag,@op_NotificationMessage);
  SELECT @op_IsSuccess, @op_Flag,@op_NotificationMessage AS JSON;`;
  return await asyncDML({ qry });
};

/**
 * @author "Parth Suthar"
 */
const getCalculatedExpense = async ({
  routeId,
  routeType,
  distanceFromHq,
  employeeId,
  loggedInEmployeeId
}) => {
  const id = employeeId ? employeeId : loggedInEmployeeId;
  const qry = `SET @op_IsSuccess = 0;SET @op_Flag = 0; 
  CALL GetExpenseMasterDataByEffectiveDate(null,${routeId},${id},${routeType},${distanceFromHq});
  `;
  return await asyncDML({ qry });
};
module.exports = {
  expenseSaveData,
  getCalculatedExpense
};
