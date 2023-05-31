const moment = require("moment");

/**
 * @author "Khushbu Shah"
 */
const validDateRange = async ({ date }) => {
  const currentYear = moment()
    .utcOffset("+05:30")
    .format("YYYY");
  return currentYear <= date.substring(0, 4);
};

module.exports = {
  validDateRange
};
