const { asyncDML } = require("../../../../dbutils");
const { CompanyId } = require("../../../../Config.json");

/**
 * @author "Khushbu Shah"
 */
const getLookupData = async () => {
  const qry = `SELECT CountryId as value,CountryName as label from countrymaster where (DeletedBy is null) and CompanyId=${CompanyId} ORDER BY CountryName;`;
  return await asyncDML({ qry });
};

module.exports = {
  getLookupData
};
