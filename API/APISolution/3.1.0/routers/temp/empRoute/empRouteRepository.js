const { asyncDML } = require("../../../dbutils");
// const { CompanyId } = require("../../../Config.json");

/**
 * @author "Harsh Patel"
 */
const routeGetData = async ({ stateId, cityId, employeeId, isActive }) => {
  const state = stateId ? stateId : null;
  const city = cityId ? cityId : null;
  const isActiveValue = isActive ? isActive : null;
  const qry = `SELECT C.CityName,R.RouteId,R.RouteName,E.RouteTypeId,SD.StaticName as RouteTypeValue,E.DistanceFromHQ,E.TPVisitPerMonth,R.IsActive,R.UpdatedDate
      ,(SELECT COUNT(1) FROM chemistmaster CM where CM.routeid = R.RouteId AND CM.stateId=IFNULL(${state},R.StateId) AND CM.cityId=IFNULL(${city},R.CityId) AND CM.DeletedBy IS NULL AND IsActive = 1) AS 'No Of Chemist'
    FROM routemaster R
    JOIN statemaster S on S.StateId=R.StateId
    JOIN citymaster C on C.CityId=R.CityId
    JOIN employeeroutes E on E.RouteId=R.RouteId
    JOIN staticdata SD on SD.StaticId=E.RouteTypeId
    where R.DeletedBy IS NULL 
    AND E.DeletedBy IS NULL
    AND R.StateId=IFNULL(${state},R.StateId) 
    AND R.CityId=IFNULL(${city},R.CityId) 
    AND E.EmployeeId=${employeeId} 
    AND E.IsActive=IFNULL(${isActiveValue},R.IsActive) 
    ORDER BY RouteName;`;
  return await asyncDML({ qry });
};

const routeDownloadData = async ({ employeeId, stateId }) => {
  const state = stateId ? stateId : null;
  const qry = `SELECT RouteName,ER.RouteTypeId,SD.StaticName as RouteTypeName,ER.DistanceFromHQ,ER.TPVisitPerMonth
  from routemaster RM 
  INNER JOIN employeeroutes ER ON RM.RouteId = ER.RouteId
  JOIN staticdata SD on SD.StaticId=ER.RouteTypeId
  WHERE ER.EmployeeId=${employeeId} AND ER.DeletedBy IS NULL and StateId=IFNULL(${state},StateId) and ER.IsActive=1;
  SELECT StaticId as RouteTypeId,StaticName as RouteType  
  FROM staticdata 
  WHERE ParentId in(SELECT StaticId from staticdata where Code='RouteTypes' and IsActive=1);`;
  return await asyncDML({ qry });
};

module.exports = {
  routeGetData,
  routeDownloadData
};
