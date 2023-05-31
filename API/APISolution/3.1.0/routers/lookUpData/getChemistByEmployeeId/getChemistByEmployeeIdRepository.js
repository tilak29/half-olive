const { asyncDML } = require("../../../../dbutils");
const { CompanyId } = require("../../../../Config.json");

/**
 * @author "Khushbu Shah"
 */
const getLookupData = async ({ loggedInEmployeeId }) => {
  const qry = `
  select cm.Mobile as 'Value',cm.ChemistName as 'Label', cm.ChemistId as 'ChemistId' from employeeroutes rm join employeemaster e on e.EmployeeId=rm.EmployeeId 
  join chemistmaster cm on cm.RouteId=rm.RouteId where e.EmployeeId=${loggedInEmployeeId} and cm.CompanyId=${CompanyId} and cm.IsActive=1;`;
  return await asyncDML({ qry });
};

module.exports = {
  getLookupData
};
