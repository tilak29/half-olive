const { asyncDML } = require("../../../../dbutils");

/**
 * @author "Khushbu Shah"
 */
const getLookupData = async ({ employeeIds }) => {
  const qry = `SELECT CONCAT(RM.RouteName,'(',EM.FirstName,' ',EM.LastName,')') as Label,RM.RouteId as Value 
  from routemaster RM
  JOIN employeeroutes ER on ER.routeId=RM.RouteId
  INNER JOIN employeemaster EM ON EM.EmployeeId = ER.EmployeeId
    WHERE EM.EmployeeId in (${employeeIds}) AND ER.DeletedBy IS NULL and ER.IsActive=1 order by RouteName;`;
  return await asyncDML({ qry });
};

module.exports = {
  getLookupData,
};
