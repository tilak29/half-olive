const { asyncDML } = require("../../../../dbutils");
const { CompanyId } = require("../../../../Config.json");

/**
 * @author "Parth Suthar"
 */
const getLookupData = async ({ employeeId }) => {
  const qry = `SELECT RM.RouteId AS value,RM.RouteName AS label 
  FROM routemaster RM
  INNER JOIN employeeroutes ER ON RM.RouteId = ER.RouteId
  where RM.DeletedBy is null 
  AND ER.IsActive=1  
  AND ER.DeletedBy IS NULL
  AND RM.CompanyId=${CompanyId} 
  AND ER.EmployeeId = ${employeeId} 
  ORDER BY RouteName; `;
  return await asyncDML({ qry });
};

module.exports = {
  getLookupData
};
