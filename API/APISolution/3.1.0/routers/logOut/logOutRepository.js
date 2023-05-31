const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");

/**
 * @author "Khushbu Shah"
 */
const logOut = async ({ loggedInUserId }) => {
  const qry = `UPDATE logininfo SET logOuttime=CURRENT_TIMESTAMP,IsActive=0 where UserId=${loggedInUserId};`;
  return await asyncDML({ qry });
};

module.exports = {
  logOut
};
