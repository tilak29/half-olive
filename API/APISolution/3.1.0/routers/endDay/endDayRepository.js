const { asyncDML } = require("../../../dbutils");

/**
 * @author "Khushbu Shah"
 */
const endDayInsertData = async ({ loggedInEmployeeId }) => {
  const qry = `SET @op_IsSuccess = 0;SET @op_Flag = 0; 
  CALL EndDay(${loggedInEmployeeId},@op_IsSuccess,@op_Flag);
  SELECT @op_IsSuccess, @op_Flag;`;
  return await asyncDML({ qry });
};

module.exports = {
  endDayInsertData
};
