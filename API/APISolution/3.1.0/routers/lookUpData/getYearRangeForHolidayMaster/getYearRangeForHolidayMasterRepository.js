const { asyncDML } = require("../../../../dbutils");

/**
 * @author "Khushbu Shah"
 */
const getYearRangeForHolidayMaster = async () => {
  const qry = `SELECT Value FROM configurationmaster where Code='HolidayMasterYearRange';`;
  return await asyncDML({ qry });
};

module.exports = {
  getYearRangeForHolidayMaster
};
