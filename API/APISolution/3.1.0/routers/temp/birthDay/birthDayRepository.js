const { asyncDML } = require("../../../dbutils");

const getBirthDayList = async ({ loggedInEmployeeId,empId }) => {
    const qry = `SET @SubOrdicateId = FNGetSubordinateIdsByEmployeeIdArray(JSON_ARRAY(${empId}),null,1);
                 SELECT distinct cm.ChemistId
                        ,cm.ChemistName
                        ,cm.Mobile AS ChemistNumber
                        ,sm.StateName AS State
                        ,ctm.CityName AS City
                        ,am.AreaName AS Area
       ,cm.DOB AS BirthDate
       ,rm.RouteName AS Route
    FROM chemistmaster cm
    INNER JOIN statemaster sm on cm.StateId = sm.StateId
    INNER JOIN citymaster ctm on cm.CityId = ctm.CityId
    INNER JOIN areamaster am on cm.AreaId = am.AreaId
    INNER JOIN routemaster rm on cm.routeId = rm.routeId
    INNER JOIN employeeroutes ER ON ER.RouteId = cm.RouteId
    WHERE DATE_ADD(cm.DOB, INTERVAL (YEAR(CURDATE()) - YEAR(cm.DOB)) YEAR) between curdate() and DATE_ADD(CURDATE(), INTERVAL 7 DAY)
    AND cm.DeletedBy IS NULL
    AND ER.DeletedBy IS NULL
    AND cm.IsActive = 1
    AND ER.EmployeeId IN (select Id from json_table(@SubOrdicateId, '$[*]' columns(Id BIGINT path '$')) AS D)
    ORDER BY DATE_FORMAT(cm.DOB, '%m'), DATE_FORMAT(cm.DOB, '%d')
    LIMIT 200;`;
    return await asyncDML({ qry });
}

module.exports = {
    getBirthDayList
}
