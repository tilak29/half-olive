const { asyncDML } = require("../../../dbutils");
const { CompanyId, CountryId } = require("../../../Config.json");
const { json } = require("express");
/**
 * @author "Parth Suthar"
 */
const chemistGetData = async ({
  loggedInEmployeeId,
  stateId,
  cityId,
  newAreaId,
  employeeId,
  routeId = null,
  page,
  pageSize,
  orderBy,
  orderDirection,
  search,
  loggedInAppIndication
}) => {
  const employee = employeeId ? `'${employeeId}'` : null;
  const state = stateId ? `'${stateId}'` : null;
  const area = newAreaId ? `'${newAreaId}'` : null;
  const searchtext = search ? `'${search}'` : null;
  const orderBytext = orderBy ? `'${orderBy}'` : null;
  const orderDir = orderDirection ? `'${orderDirection}'` : null;
  const qry = `CALL GetChemistMasterData(${loggedInEmployeeId},${CompanyId},${state},${cityId},${area},${employee},${routeId},${page},${pageSize},${orderBytext},${orderDir},${searchtext}, ${loggedInAppIndication})`;
  return await asyncDML({ qry });
};

/**
 * @author "Parth Suthar"
 */
const chemistSaveData = async ({ data, operationType }) => {
  const qry = `SET @op_IsSuccess = 0;SET @op_Flag = 0; 
  CALL SaveChemistMaster_200('${data}',${operationType},@op_IsSuccess, @op_Flag);
  SELECT @op_IsSuccess, @op_Flag;`;
  return await asyncDML({ qry });
};

/**
 * @author "Parth Suthar"
 */

const chemistListMobile = async ({
  routeId,
  visitDate,
  loggedInEmployeeId
}) => {
  const date = visitDate ? `'${visitDate}'` : null;

  if(date == null)
  {
    const qry = `WITH cte_visits AS(
      SELECT OM.ChemistId FROM visitlog OM 
        WHERE OM.EmployeeId = ${loggedInEmployeeId}
        AND OM.DeletedBy IS NULL 
        AND OM.VisitDate = CURDATE() 
        GROUP BY OM.ChemistId
    )
    
    SELECT CM.ChemistId,
                    CM.ChemistName,
                    CM.AreaId,
                    AM.AreaName,
                    NULL AS VisitLogId,
                    NULL AS WorkingWithId,
                    NULL AS WorkingWithName,
                    NULL AS VisitTime,
                    NULL AS ChemistRemarks,
                    NULL AS POB,
                    NULL AS UpdatedDate,
                    
                    CM.BoxPoints AS BoxPoints,
                    CM.BalancePoints AS BalancePoints,
                    CM.SBoxPoints AS Scanpoints,

                    /*
                    CP.BoxPoint AS BoxPoints,
                    CP.PurchasePoint AS BalancePoints,
                    CP.ScanPoint AS Scanpoints,
                    */

                    Address AS Address,
                    IF(VL.ChemistId IS NULL, 0, 1) AS IsOrderCreated,
                    -- EXISTS(SELECT 1 FROM visitlog OM WHERE OM.EmployeeId = ${loggedInEmployeeId} AND OM.ChemistId = CM.ChemistId AND OM.DeletedBy IS NULL AND OM.VisitDate = CURDATE() LIMIT 1) AS IsOrderCreated,
                    IF(CS.ChemistId IS NULL, 2, 1) AS ChemistOrder
                FROM chemistmaster CM
                INNER JOIN areamaster AM ON CM.AreaId = AM.AreaId
                LEFT JOIN chemistsequence CS ON CS.EmployeeId = ${loggedInEmployeeId} AND CM.ChemistId = CS.ChemistId
                -- LEFT JOIN view_CustomerPoints CP ON CP.CustomerId = CM.ChemistId
                LEFT JOIN cte_visits VL ON CM.ChemistId = VL.ChemistId
                WHERE CM.RouteId = ${routeId}
                AND CM.DeletedBy IS NULL 
                AND CM.IsActive = 1
                ORDER BY ChemistOrder, AM.AreaName, CM.ChemistName
                ;`;
    return await asyncDML({ qry });
  }

  const qry = `SELECT VL.VisitLogId
	,CM.ChemistId
	,CM.ChemistName
  ,CM.AreaId
	,VL.WorkingWithId
  ,CONCAT(EM.FirstName,' ',EM.LastName) AS WorkingWithName
	,DATE_FORMAT(VL.VisitTime,'%h:%i %p') AS VisitTime
	,VL.ChemistRemarks
	,VL.POB
	,VL.UpdatedDate
	,CM.BoxPoints AS BoxPoints,
  CM.BalancePoints AS BalancePoints,
  CM.SBoxPoints AS Scanpoints

  /*
  CP.BoxPoint AS BoxPoints,
  CP.PurchasePoint AS BalancePoints,
  CP.ScanPoint AS Scanpoints,
  */
	,CM.Address
FROM chemistmaster CM
LEFT JOIN visitlog VL ON VL.ChemistId = CM.ChemistId AND VL.RouteId = CM.RouteId AND VL.VisitDate = ${date} AND VL.EmployeeId=${loggedInEmployeeId} 
LEFT JOIN employeemaster EM ON EM.EmployeeId = VL.WorkingWithId
-- LEFT JOIN view_CustomerPoints CP ON CP.CustomerId = CM.ChemistId
WHERE CM.RouteId = ${routeId};`;
  return await asyncDML({ qry });
};

/**
 * @author "Parth Suthar"
 */
const chemistUpdateRouteData = async ({ json, loggedInEmployeeId }) => {
  const qry = `CALL SaveChemistUpdateRoute(${loggedInEmployeeId},'${JSON.stringify(
    json
  )}',@op_IsSuccess, @op_Flag);
   SELECT @op_IsSuccess, @op_Flag;`;
  return await asyncDML({ qry });
};

/**
 * @author "Parth Suthar"
 */
const chemistGetProfile = async ({ chemistId }) => {
  const qry = `SELECT CM.ChemistId,CM.CompanyId,CM.ChemistName,S.StateId,S.StateName,CM.RouteId,RM.RouteName,A.AreaId,A.AreaName
  ,C.CityId,C.CityName,CM.CountryId,CM.Address,CM.PinCode,CM.Mobile,CM.Email,CM.IsActive,CM.Fax,CM.GSTIN
  ,CM.DOB,CM.DLNumber,CM.ContactPerson,CM.UpdatedDate
FROM chemistmaster AS CM
LEFT JOIN routemaster RM on CM.RouteId = RM.RouteId
JOIN statemaster S on S.StateId = CM.StateId
JOIN citymaster C on C.CityId = CM.CityId
JOIN areamaster A on A.AreaId = CM.AreaId
WHERE CM.ChemistId=${chemistId};`;
  return await asyncDML({ qry });
};


/**
 * @author "Aadilkhan"
 */
const chemistSaveEmployeewiseSorting = async ({ loggedInEmployeeId, chemistList }) => {
  const qry = `DELETE FROM chemistsequence WHERE EmployeeId = ${loggedInEmployeeId};
  
  INSERT INTO chemistsequence (EmployeeId, ChemistId, CreatedBy, CreatedDate)
  SELECT ${loggedInEmployeeId}, Id, ${loggedInEmployeeId}, CURRENT_TIMESTAMP
  FROM JSON_TABLE(
    '${JSON.stringify(chemistList)}',
    '$[*]'
    COLUMNS (Id BIGINT PATH '$')
  ) AS D;

  `;
  return await asyncDML({ qry });
};


module.exports = {
  chemistGetData,
  chemistSaveData,
  chemistListMobile,
  chemistUpdateRouteData,
  chemistGetProfile,
  chemistSaveEmployeewiseSorting
};
