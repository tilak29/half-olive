const { asyncDML } = require("../../../../dbutils");
const { CompanyId } = require("../../../../Config.json");

/**
 * @author "Parth Suthar"
 */
const getLookupData = async ({ cityId }) => {
  const qry = `SELECT AreaId as value, AreaName as label FROM areamaster where CityId =${cityId} and (DeletedBy is null) and CompanyId=${CompanyId} ORDER BY AreaName;`;
  return await asyncDML({ qry });
};

module.exports = {
  getLookupData
};
