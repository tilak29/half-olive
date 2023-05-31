const { asyncDML } = require("../../../../dbutils");
const { CompanyId } = require("../../../../Config.json");

/**
 * @author "Khushbu Shah"
 */
const getLookupData = async ({ chemistId, loggedInEmployeeId,loggedInAppIndication }) => {
  const chemistIdValue = chemistId ? `${chemistId}` : `${loggedInEmployeeId}`;
  const qry = `SET @StateId = 0, @CityId = 0;
  select StateId, CityId INTO @StateId, @CityId from chemistmaster C 
  where IF(${loggedInAppIndication} = 3, C.Mobile, C.ChemistId) = ${chemistIdValue};
  Select S.StockistId as Value
  ,CONCAT(S.StockistName, IFNULL( CONCAT(' - ', AM.AreaName), '' ) ) as Label
  from stockistmaster S
  LEFT JOIN areamaster AM ON S.AreaId IS NOT NULL AND AM.AreaId = S.AreaId
  WHERE S.IsActive = 1
  AND S.IsSuperStockist = 0
  AND JSON_CONTAINS(S.MappingCity, CONVERT( @CityId,CHAR)) = 1 
--  AND S.State = @StateId
-- AND S.City = @CityId
;`;
  return await asyncDML({ qry });
};

module.exports = {
  getLookupData
};
