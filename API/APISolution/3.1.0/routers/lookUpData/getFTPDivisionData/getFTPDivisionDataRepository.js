const { asyncDML } = require("../../../../dbutils");

/**
 * @author "Khushbu Shah"
 */
const getLookupData = async () => {
  const qry = `SELECT DivisionCode AS value,DivisionName AS label
  FROM ftpdivision
  WHERE DeletedBy is null
  ORDER BY DivisionName`;
  return await asyncDML({ qry });
};

module.exports = {
  getLookupData
};
