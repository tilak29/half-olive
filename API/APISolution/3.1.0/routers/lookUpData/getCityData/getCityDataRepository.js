const { asyncDML } = require("../../../../dbutils");
const { CompanyId } = require("../../../../Config.json");

/**
 * @author "Parth Suthar"
 */
const getLookupData = async () => {
  const qry = `SELECT stateId, CityId as value,CityName as label FROM citymaster where (DeletedBy is null) and CompanyId=${CompanyId} ORDER BY CityName;`;
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const getLookupAllData = async ({
  loggedInReferenceId,
  loggedInDesignationId,
  companyId
}) => {
  const qry = `CALL GetCityNameOfAssignedStateLookupByEmployeeId(${loggedInReferenceId}, ${companyId},${loggedInDesignationId});`;
  return await asyncDML({ qry });
};
module.exports = {
  getLookupData,
  getLookupAllData
};
