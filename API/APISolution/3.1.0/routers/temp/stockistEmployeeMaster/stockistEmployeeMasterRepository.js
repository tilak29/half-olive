const { asyncDML } = require("../../../dbutils");

/**
 * @author "Khushbu Shah"
 */
const stockistEmployeeGetData = async ({ employeeId, stateId, loggedInEmployeeId }) => {
  const qry = `CALL GetAssignStockistToEmployee (${employeeId},${stateId},null,${loggedInEmployeeId});`;
  return await asyncDML({ qry });
};

const stockistAssignedEmployeeGetData = async ({ loggedInEmployeeId, stateId, cityId }) => {
  const qry = `CALL GetStockistListBasedOnHierarchy (${loggedInEmployeeId},${stateId},${cityId});`;
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const stockistEmployeeSaveData = async ({
  stockistJsonArray,
  loggedInEmployeeId,
  employeeId
}) => {
  const qry = `SET @op_IsSuccess = 0;SET @op_Flag = 0; 
  CALL SaveEmployeeAssignedStockist(${loggedInEmployeeId},${employeeId},'[${stockistJsonArray}]',@op_IsSuccess, @op_Flag);
  SELECT @op_IsSuccess, @op_Flag;`;
  return await asyncDML({ qry });
};

module.exports = {
  stockistEmployeeGetData,
  stockistAssignedEmployeeGetData,
  stockistEmployeeSaveData
};
