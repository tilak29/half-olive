const { asyncDML } = require("../../../dbutils");
const getStatusFilter = async () => {
    const qry = "SELECT * from fnGetStatusFilterForManageBooking();";
    return await asyncDML({ qry });
};
module.exports = {
  getStatusFilter,
};
