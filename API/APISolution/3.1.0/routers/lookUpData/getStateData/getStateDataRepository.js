const { asyncDML } = require("../../../../dbutils");
const { CompanyId, CountryId } = require("../../../../Config.json");

/**
 * @author "Khushbu Shah"
 */
const getLookupData = async () => {
  const qry = `SELECT StateId as value,StateName as label FROM statemaster where (DeletedBy is null) and CountryId = ${CountryId} and CompanyId=${CompanyId} ORDER BY StateName;`;
  return await asyncDML({ qry });
};
const getLookupAllData = async ({ loggedInEmployeeId, companyId }) => {
  const qry = `CALL GetAssignedStateLookupByEmployeeId(${loggedInEmployeeId}, ${companyId});`;
  return await asyncDML({ qry });
};
module.exports = {
  getLookupData,
  getLookupAllData
};
