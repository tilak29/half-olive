const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");

/**
 * @author "Parth Suthar,Khushbu Shah"
 */
const startDayInsertData = async ({ loggedInEmployeeId }) => {
  const qry = `SET @op_IsSuccess = 0;SET @op_Flag = 0; 
  CALL StartDay(${loggedInEmployeeId},${CompanyId},@op_IsSuccess,@op_Flag);
  SELECT @op_IsSuccess, @op_Flag;`;
  return await asyncDML({ qry });
};

module.exports = {
  startDayInsertData
};
