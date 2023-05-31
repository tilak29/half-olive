const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");

/**
 * @author "Khushbu Shah"
 */
const authorizedUserGetData = async ({ data }) => {
  const qry = `CALL CS_ValidateMobileForLogin('${data}', @op_IsValide, @op_Response);
    SELECT @op_IsValide, @op_Response;`;
  return await asyncDML({ qry });
};

module.exports = {
  authorizedUserGetData
};
