const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");

/**
 * @author "Bhargav Bhagiya"
 */
const locationGetData = async ({ filterStatus }) => {
  const qry = `getLocationList ${filterStatus},${CompanyId}`
  return await asyncDML({ qry });
};
/**
 * @author "Bhargav Bhagiya"
 */
const locationSaveData = async ({ data, operationType }) => {
  var jsdata = JSON.parse(data);
  var qry = '';
  if (operationType == 0) {
    qry = `InsertLocation '${jsdata.locationName}','${jsdata.description}',${jsdata.isActive},${jsdata.loggedInReferenceId},${CompanyId}`
  }
  else if (operationType == 1) {
    qry = `UpdateLocation ${jsdata.locationId},'${jsdata.locationName}','${jsdata.description}',${jsdata.isActive},${jsdata.loggedInReferenceId}`
  }
  else if (operationType == 2) {
    qry = `DeleteLocation ${jsdata.locationId},${jsdata.loggedInReferenceId},${CompanyId}`
  }

  return await asyncDML({ qry });
};

module.exports = {
  locationGetData,
  locationSaveData,
};