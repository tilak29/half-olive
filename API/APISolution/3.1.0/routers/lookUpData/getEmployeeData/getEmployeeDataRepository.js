const { asyncDML } = require("../../../../dbutils");
const { CompanyId } = require("../../../../Config.json");

/**
 * @author "Tejal Sali,Khushbu Shah"
 */
const getLookupData = async ({
  designationIds,
  stateIds,
  divisionIds = null,
  cityIds,
  loggedInReferenceId,
  loggedInDivisionId
}) => {
  const designation = designationIds || "DM.DesignationId";
  let state = stateIds;
  if(state == null || state.length == 0){
    state = "SM.StateId";}
  const city = cityIds || "CM.CityId";
  const qry = `DECLARE @AdminDesignations NVARCHAR(1000) = (SELECT dbo.FNGetConfigurationValueByCode('ADMIN_DESIGNATIONS',null))
  SET @AdminDesignations = REPLACE(REPLACE(@AdminDesignations,'[',''),']','')
  DECLARE @IsAdmin BIT = (SELECT ISNULL((SELECT TOP 1 1 FROM employeemaster 
              WHERE EmployeeId = ${loggedInReferenceId} 
              AND  DesignationId in (select splitvalue from dbo.Split(@AdminDesignations,','))),0))
                        
    -- SET @SubordinateList = IF(@IsAdmin = 0, FNGetSubordinateIdsByEmployeeIdArray(JSON_ARRAY(${loggedInReferenceId}),null,1), NULL);
    SELECT EM.EmployeeId AS value, CONCAT(EM.FirstName, ' ', EM.LastName, ' (', DM.DesignationCode, ' | ',CM.CityName, ' | ', DivM.DivisionName , ' | ',  SM.StateName,')') AS label
                  ,SM.StateId, EM.DivisionId, EM.EmployeeId
    FROM employeemaster EM
   INNER JOIN designationmaster DM ON DM.DesignationId = EM.DesignationId and DM.DesignationId in (${designation})
   INNER JOIN citymaster CM ON CM.CityId = EM.CityId and CM.CityId in (${city})
   INNER JOIN statemaster SM ON SM.StateId = EM.StateId and EM.CompanyId=${CompanyId} and SM.StateId in (${state})
   INNER JOIN divisionmaster DivM ON  DivM.DivisionId in (select splitvalue from dbo.Split(EM.DivisionId,',')) --JSON_CONTAINS(EM.DivisionId, CONVERT(DivM.DivisionId,CHAR)) = 1 
    Where 
     
     EM.IsActive=1
    AND EM.DesignationId not in (select splitvalue from dbo.Split(@AdminDesignations,','))
    -- and (${divisionIds} IS NULL OR JSON_CONTAINS(EM.DivisionId, CONVERT(${divisionIds},CHAR)) = 1)
    -- AND EXISTS (SELECT 1 FROM JSON_TABLE('${loggedInDivisionId}','$[*]' COLUMNS(Id VARCHAR(3) PATH '$')) AS D WHERE JSON_CONTAINS(EM.DivisionId, Id) = 1)
     -- AND (@IsAdmin = 1 OR (@SubordinateList IS NOT NULL AND EM.EmployeeId IN (select Id from JSON_TABLE(@SubordinateList,'$[*]' columns(Id BIGINT PATH '$')) AS D)))
    -- GROUP BY EM.EmployeeId
    ORDER BY CONCAT(EM.FirstName,' ',EM.LastName) `;
  return await asyncDML({ qry });
};

module.exports = {
  getLookupData
};
