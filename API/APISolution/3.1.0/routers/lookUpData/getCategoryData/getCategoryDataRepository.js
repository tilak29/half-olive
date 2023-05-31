const { asyncDML } = require("../../../../dbutils");
const { CompanyId } = require("../../../../Config.json");

/**
 * @author "Parth Suthar"
 */
const getLookupData = async () => {
  const qry = `select CategoryId AS value,CategoryName AS label from categorymaster where IsActive = 1 AND CompanyId =${CompanyId} ;`;
  return await asyncDML({ qry });
};

module.exports = {
  getLookupData
};
