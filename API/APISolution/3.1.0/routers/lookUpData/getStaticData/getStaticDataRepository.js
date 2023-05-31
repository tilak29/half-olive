const { asyncDML } = require("../../../../dbutils");
const { CompanyId } = require("../../../../Config.json");

/**
 * @author "Parth Suthar"
 */
const getLookupData = async ({ code }) => {
  const qry = `SELECT SD.StaticId as value, SD.StaticName as label FROM staticdata SD
  JOIN staticdata SDParent ON SDParent.StaticId = SD.ParentId 
  AND SDParent.IsActive = 1 
  AND SDParent.DeletedBy IS NULL
  WHERE SDParent.Code = '${code}'
  AND SD.IsActive = 1
  AND SD.DeletedBy IS NULL
  AND SD.CompanyId=${CompanyId} ORDER BY SD.StaticName;`;
  console.log(qry);
  return await asyncDML({ qry });
};

module.exports = {
  getLookupData
};
