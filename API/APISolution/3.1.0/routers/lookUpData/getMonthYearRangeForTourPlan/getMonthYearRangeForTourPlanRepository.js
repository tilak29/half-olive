const { asyncDML } = require("../../../../dbutils");

/**
 * @author "Khushbu Shah"
 */
const getMonthYearRangeForTourPlan = async () => {
  const qry = `SELECT Value FROM configurationmaster where Code='TourPlanMonthYearRange';`;
  return await asyncDML({ qry });
};

module.exports = {
  getMonthYearRangeForTourPlan
};
