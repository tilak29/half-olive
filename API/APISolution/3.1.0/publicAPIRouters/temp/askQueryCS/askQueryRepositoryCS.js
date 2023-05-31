const { asyncDML } = require("../../../dbutils");

/**
 * @author "Parth Suthar"
 */
const askQueryInsert = async ({ queryText, mobileNumber }) => {
  const qry = `INSERT INTO askquery(Date,QueryText,MobileNumber) VALUES (CURRENT_TIMESTAMP,'${queryText}','${mobileNumber}')`;
  return await asyncDML({ qry });
};

const getAskQueryDetailForChemistStockist = async ({ mobileNumber }) => {
  const qry = `SELECT GetStockistChemistFullNameByMobileNumber('${mobileNumber}') AS ChemistStockistName, FNGetConfigurationValueByCode('RETAILER_ASK_QUERY_TO_EMAIL', NULL) AS ToEmail`;
  return await asyncDML({ qry });
};

module.exports = {
  askQueryInsert,
  getAskQueryDetailForChemistStockist
};
