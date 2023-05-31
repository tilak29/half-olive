const { asyncDML } = require("../../../dbutils");

/**
 * @author "Khushbu Shah"
 */
const GetMenuListForConfig = async ({ loggedInEmployeeId, menuId }) => {
  const qry = `CALL GetMenuListForConfig(${loggedInEmployeeId}, ${menuId});`;
  return await asyncDML({ qry });
};

const SaveMenuRole = async ({ data }) => {
  const qry = `SET @op_IsSuccess = 0;SET @op_Flag = 0; 
  CALL SaveMenuRole('${data}', @op_IsSuccess, @op_Flag);SELECT @op_IsSuccess, @op_Flag;`;
  return await asyncDML({ qry });
};

module.exports = {
    GetMenuListForConfig, 
    SaveMenuRole
};
