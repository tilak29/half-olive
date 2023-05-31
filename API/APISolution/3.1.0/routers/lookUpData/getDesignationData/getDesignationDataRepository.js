const { asyncDML } = require("../../../../dbutils");
const { CompanyId } = require("../../../../Config.json");

/**
 * @author "Parth Suthar"
 */
const getLookupData = async () => {
  const qry = `SELECT DesignationId as value,DesignationCode as label FROM designationmaster where DeletedBy is null AND IsRetailer IS NULL and IsActive=1 and CompanyId=${CompanyId} ORDER BY DesignationCode`;
  return await asyncDML({ qry });
};

module.exports = {
  getLookupData
};
