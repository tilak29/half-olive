const { asyncDML } = require("../../../../dbutils");

/**
 * @author "Khushbu Shah"
 */
const getLookupData = async ({loggedInEmployeeId}) => {
  const qry = `CALL GetDepotListBasedOnAssignedStockist(${loggedInEmployeeId}, null, null);`;
  return await asyncDML({ qry });
};

module.exports = {
  getLookupData
};
