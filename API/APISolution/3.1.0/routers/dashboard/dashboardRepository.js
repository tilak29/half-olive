const { asyncDML } = require("../../../dbutils");

/**
 * @author "Khushbu Shah"
 */
const dashboardPobProductiveMonthlyCallGetData = async ({ employeeId }) => {
  const qry = `SET @Subordinates = FNGetSubordinateIdsByEmployeeIdArray(JSON_ARRAY(${employeeId}),null,1);
  select COUNT(1) AS TotalCall
	,IFNULL(SUM(IFNULL(POB,0)),0) AS POB
	,IFNULL(SUM(CASE WHEN IFNULL(POB,0) > 0 THEN 1 ELSE 0 END),0) AS ProductiveCall
  from visitlog
  where MONTH(VisitDate) = MONTH(CURRENT_DATE) AND YEAR(VisitDate) = YEAR(CURRENT_DATE) AND DeletedBy IS NULL
  AND EmployeeId IN (select Id from JSON_TABLE(@Subordinates,'$[*]' columns(Id BIGINT PATH '$')) AS D)`;
  return await asyncDML({ qry });
};

/**
 * @author "Parth Suthar"
 */
const getChemistBirthdayData = async () => {
  const qry = `SELECT ChemistId,ChemistName,Mobile,DOB
  FROM chemistmaster
  WHERE STR_TO_DATE(CONCAT(DAY(DOB),'-',MONTH(DOB),'-', IF(MONTH(DOB) > MONTH(CURDATE()),YEAR(CURDATE())-1, YEAR(CURDATE())) ,''),'%d-%m-%Y')
       BETWEEN DATE_ADD(CURDATE(), INTERVAL 0 DAY)
         AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)
         AND DeletedBy IS NULL AND IsActive = 1;`;
  return await asyncDML({ qry });
};

/**
 * @author "Harsh Patel"
 */
const getDashboardStateWiseCountData = async (flag) => {
  let qry = "";
  if (flag === 1) {
    qry = `select sm.stateId,sm.stateName,IFNULL(counts,0) as stateWiseCnt 
    from statemaster as sm 
    left join 
    ( 
      SELECT COUNT(1) counts, StateId FROM chemistmaster as cm WHERE cm.IsActive=1 and cm.DeletedBy is null group by StateId
    ) AS D on sm.StateId=D.StateId
    where sm.DeletedBy is null order by sm.stateName`;
  }
  else if (flag === 2) {
    qry = `select sm.stateId,sm.stateName,IFNULL(AppInstalledChemistCount,0) as stateWiseCnt 
    from statemaster as sm 
    where sm.DeletedBy is null
    order by sm.stateName`;
  }
  else if (flag === 3) {
    qry = `select sm.stateId,sm.stateName,IFNULL(Counts,0) as stateWiseCnt 
    from statemaster as sm 
    left join (
      SELECT count(DISTINCT stm.StockistId) Counts, State AS StateId
      FROM stockistmaster stm
      inner join retailerdeviceinfo as rdi on stm.MobileNumber=rdi.MobileNumber and rdi.UserType=0
      GROUP BY State
    ) AS D ON D.StateId=sm.StateId order by sm.stateName`;
  }
  else if (flag === 4) {
    qry = `select sm.stateId,sm.stateName,SUM(IFNULL(counts,0)) as stateWiseCnt 
    from statemaster as sm 
    left join (
        select count(1) as counts, im.ChemistId, cm.StateId
        FROM chemistmaster as cm 
        inner join invoicemaster im on cm.ChemistId=im.ChemistId
        WHERE NOT (im.InvoiceNumber IS NULL AND im.Status = 88)
        group by im.ChemistId, cm.StateId HAVING count(1) = 1
    ) AS D ON D.StateId = sm.stateId GROUP BY sm.stateId order by sm.stateName`;
  }
  else if (flag === 5) {
    qry = `select sm.stateId,sm.stateName,ifnull(ScanPoints,0) as stateWiseCnt 
    from statemaster as sm 
    left join 
    (
      SELECT SUM(im.Point) AS ScanPoints, StateId
        FROM chemistmaster as cm
      INNER JOIN customerpoint as im on cm.ChemistId=im.CustomerId AND im.PointType = 97
        GROUP BY StateId
    ) D ON D.StateId = sm.Stateid
    order by sm.stateName -- 97: scan point`;
  }
  else if (flag === 6) {
    qry = `select sm.stateId,sm.stateName,ifnull(GrandTotal,0) as stateWiseCnt 
    from statemaster as sm 
    left join 
    (
      SELECT SUM(im.GrandTotal) AS GrandTotal, StateId
        FROM chemistmaster as cm
        INNER JOIN invoicemaster as im on cm.ChemistId=im.ChemistId
        WHERE not (im.status=88 and im.invoicenumber is null)
        AND im.GrandTotal IS NOT NULL AND CONVERT(im.CreatedDate,Date) = CURRENT_DATE
        GROUP BY StateId
    ) D ON D.StateId = sm.Stateid
    order by sm.stateName`;
  }
  else if (flag === 7) {
    qry = `select sm.stateId,sm.stateName,IFNULL(counts,0) as stateWiseCnt 
    from statemaster as sm 
    left join 
    (
      SELECT COUNT(1) AS counts, StateId
        FROM chemistmaster as cm
        INNER JOIN invoicemaster as im on cm.ChemistId=im.ChemistId
        WHERE not (im.status=88 and im.invoicenumber is null)
        AND CONVERT(im.CreatedDate,Date) = CURRENT_DATE
        GROUP BY StateId
    ) D ON D.StateId = sm.Stateid
    order by sm.stateName`;
  }
  else if (flag === 8) {
    qry = `select sm.stateId,sm.stateName,ifnull(GrandTotal,0) as stateWiseCnt 
    from statemaster as sm 
    left join 
    (
      SELECT SUM(im.GrandTotal) AS GrandTotal, StateId
        FROM chemistmaster as cm
        INNER JOIN invoicemaster as im on cm.ChemistId=im.ChemistId
        WHERE not (im.status=88 and im.invoicenumber is null)
        AND im.GrandTotal IS NOT NULL AND MONTH(im.CreatedDate) = MONTH(CURRENT_DATE) AND YEAR(im.CreatedDate) = YEAR(CURRENT_DATE)
        GROUP BY StateId
    ) D ON D.StateId = sm.Stateid
    order by sm.stateName`;
  }
  else if (flag === 9) {
    qry = `select sm.stateId,sm.stateName,IFNULL(counts,0) as stateWiseCnt 
    from statemaster as sm 
    left join 
    (
      SELECT COUNT(1) AS counts, StateId
        FROM chemistmaster as cm
        INNER JOIN invoicemaster as im on cm.ChemistId=im.ChemistId
        WHERE not (im.status=88 and im.invoicenumber is null)
        AND MONTH(im.CreatedDate) = MONTH(CURRENT_DATE) AND YEAR(im.CreatedDate) = YEAR(CURRENT_DATE)
        GROUP BY StateId
    ) D ON D.StateId = sm.Stateid
    order by sm.stateName`;
  }
  else if (flag === 10) {
    qry = `SELECT a.stateId,a.stateName,IFNULL(SUM(PendingOrdersForMonth),0) as stateWiseCnt 
    FROM statemaster a 
    LEFT JOIN (
    SELECT COUNT(1) PendingOrdersForMonth, CM.StateId
    FROM ordermaster OM INNER JOIN chemistmaster CM ON OM.chemistId = CM.chemistId
    WHERE OrderStatus = 45 AND OM.DeletedBy IS NULL GROUP BY CM.StateId
    UNION
    SELECT COUNT(1) PendingOrdersForMonth, SM.State AS StateId
    FROM ordermaster OM INNER JOIN stockistmaster SM ON OM.stockistId = SM.stockistid AND OM.ChemistId = 0
    WHERE OrderStatus = 45 AND OM.DeletedBy IS NULL GROUP BY SM.State
    ) AS D on a.StateId = D.StateId
    GROUP BY  a.stateId
    ORDER BY a.stateName`;
  }

  return await asyncDML({ qry });
};

const getDashboardCountData = async ({ }) => {

  let qry = "";

  qry = `SELECT count(1) TotalChemist FROM chemistmaster cm WHERE cm.IsActive=1 AND cm.DeletedBy IS NULL;

  SELECT sum(AppInstalledChemistCount) AppInstalledByChemist FROM statemaster WHERE DELETEDBY IS NULL;
  
  SELECT count(1) AppInstalledByStockist FROM retailerdeviceinfo RI WHERE usertype = 0;
  
  SELECT COUNT(1) AS FirstTimeInvoiceScannedCount
  FROM(
      SELECT chemistId, COUNT(1) InvoiceCount FROM invoicemaster WHERE chemistid > 0 AND NOT (InvoiceNumber IS NULL AND Status = 88) GROUP BY chemistId HAVING COUNT(1) = 1
  ) AS D;

  SELECT IFNULL(SUM(IM.Point),0) AS ScannedPoints
  FROM customerpoint IM;
  
  SELECT IFNULL(SUM(IM.GrandTotal),0) AS TotalInvoiceAmountForDay
  FROM invoicemaster IM 
  WHERE IM.chemistid > 0 AND NOT (InvoiceNumber IS NULL AND Status = 88) AND CONVERT(IM.CreatedDate,DATE) = CURRENT_DATE  ;

  SELECT COUNT(1) AS TotalInvoiceCountForDay
  FROM invoicemaster IM 
  WHERE IM.chemistid > 0 AND NOT (InvoiceNumber IS NULL AND Status = 88) AND CONVERT(IM.CreatedDate,DATE) = CURRENT_DATE  ;
  
  SELECT IFNULL(SUM(IM.GrandTotal),0) AS TotalInvoiceAmountForMonth
  FROM invoicemaster IM 
  WHERE IM.chemistid > 0 AND NOT (InvoiceNumber IS NULL AND Status = 88) 
  AND MONTH(IM.CreatedDate) = MONTH(CURRENT_DATE) AND YEAR(IM.CreatedDate) = YEAR(CURRENT_DATE)  ;

  SELECT COUNT(1) AS TotalInvoiceCountForMonth
  FROM invoicemaster IM 
  WHERE IM.chemistid > 0 AND NOT (InvoiceNumber IS NULL AND Status = 88) 
  AND IM.Status IN (85, 87, 88, 86)
  AND MONTH(IM.CreatedDate) = MONTH(CURRENT_DATE) AND YEAR(IM.CreatedDate) = YEAR(CURRENT_DATE)  ;

  SELECT COUNT(1) PendingOrdersForMonth FROM ordermaster WHERE OrderStatus = 45 AND DeletedBy IS NULL;

  SELECT COUNT(1) PendingRegApprovalCount FROM userregistrationrequest WHERE status=65 AND deletedby IS NULL;

  SELECT COUNT(1) PendingInvVerificationCount FROM invoicemaster WHERE status = 85;

  SELECT COUNT(1) PendingRedmApprovalCount FROM redeemrequest WHERE status IN(77,78,82);

  SELECT COUNT(1) FeatureEndingCount 
  FROM featuremenu
  WHERE EndDate <= DATE_ADD(CURDATE(), INTERVAL 3 DAY)
  AND IsActive = 1
  AND IsTogglable = 1
  AND DeletedBy IS NULL;

  `;
  return await asyncDML({ qry });
}

const getDashboardStateWiseData = async (stateId, flag) => {
  let qry = "";
  if (flag === 1) {
    qry = `SELECT  cm.ChemistName as Name
    ,sm.StateName
    ,cmm.CityName
    ,am.AreaName
    ,cm.Mobile
    FROM chemistmaster as cm 
    join statemaster sm on cm.StateId = sm.StateId
    join citymaster cmm on cm.CityId = cmm.CityId
    join areamaster am on cm.AreaId = am.AreaId
    WHERE cm.IsActive=1 
    and cm.StateId = ${stateId}
    and cm.DeletedBy is null
    ORDER BY cm.ChemistName;`;
  }
  else if (flag === 2) {
    qry = `SELECT DISTINCT  cm.ChemistName as Name
    ,sm.StateName
    ,cmm.CityName
    ,am.AreaName
    ,cm.Mobile
    FROM chemistmaster as cm 
    inner join retailerdeviceinfo as rdi on cm.Mobile=rdi.MobileNumber and rdi.UserType=2
    join statemaster sm on cm.StateId = sm.StateId
    join citymaster cmm on cm.CityId = cmm.CityId
    join areamaster am on cm.AreaId = am.AreaId
    WHERE cm.IsActive=1 
    and cm.StateId = ${stateId}
    and cm.DeletedBy is null
    ORDER BY cm.ChemistName;`;
  }
  else if (flag === 3) {
    qry = `SELECT DISTINCT  sm.StockistName as Name
    ,smm.StateName
    ,cmm.CityName
    ,am.AreaName
    ,sm.MobileNumber as Mobile
    FROM stockistmaster as sm
    inner join retailerdeviceinfo as rdi on sm.MobileNumber=rdi.MobileNumber and rdi.UserType=0
    join statemaster smm on sm.state = smm.StateId
    join citymaster cmm on sm.City = cmm.CityId
    join areamaster am on sm.AreaId = am.AreaId
    WHERE sm.IsActive=1 
    and sm.state = ${stateId} 
    and sm.DeletedBy is null
    ORDER BY sm.StockistName;`;
  }
  else if (flag === 4) {
    qry = `select cm.ChemistName as Name
	  ,sm.StateName
	  ,cmm.CityName
	  ,am.AreaName
    ,cm.Mobile
    ,count(1) AS Data
FROM chemistmaster as cm 
INNER JOIN invoicemaster im on cm.ChemistId=im.ChemistId
JOIN statemaster sm on cm.StateId = sm.StateId
JOIN citymaster cmm on cm.CityId = cmm.CityId
JOIN areamaster am on cm.AreaId = am.AreaId
WHERE NOT (im.InvoiceNumber IS NULL AND im.Status = 88)
and cm.StateId = ${stateId} 
group by im.ChemistId, cm.StateId HAVING count(1) = 1
    ORDER BY cm.ChemistName;`;
  }
  else if (flag === 5) {
    qry = `SELECT SUM(im.Point) AS Data
          ,cm.ChemistName as Name
          ,sm.StateName
          ,cmm.CityName
          ,am.AreaName
          ,cm.Mobile
          ,cm.ChemistId
    FROM chemistmaster as cm
    INNER JOIN customerpoint as im on cm.ChemistId = im.CustomerId AND im.PointType = 97
    JOIN statemaster sm on cm.StateId = sm.StateId
    JOIN citymaster cmm on cm.CityId = cmm.CityId
    JOIN areamaster am on cm.AreaId = am.AreaId
    WHERE cm.StateId = ${stateId}
    GROUP BY cm.ChemistId
    ORDER BY cm.ChemistName`;
  }
  else if (flag === 6) {
    qry = `SELECT cm.ChemistName as Name
                  ,sm.StateName
                  ,cmm.CityName
                  ,am.AreaName
                  ,cm.Mobile
                  ,ifnull(im.GrandTotal,0) as Data 
    FROM chemistmaster as cm
    INNER JOIN invoicemaster as im on cm.ChemistId=im.ChemistId
    JOIN statemaster sm on cm.StateId = sm.StateId
    JOIN citymaster cmm on cm.CityId = cmm.CityId
    JOIN areamaster am on cm.AreaId = am.AreaId
    where cm.StateId = ${stateId} 
    AND (im.status=88 and im.invoicenumber is null)
    AND im.GrandTotal IS NOT NULL 
    AND CONVERT(im.CreatedDate,Date) = CURRENT_DATE
    group by cm.ChemistId
    ORDER BY cm.ChemistName;`;
  }
  else if (flag === 7) {
    qry = `SELECT cm.ChemistName as Name
                 ,sm.StateName
                 ,cmm.CityName
                 ,am.AreaName
                 ,cm.Mobile
                 ,ifnull(im.GrandTotal,0) as Data 
        FROM chemistmaster as cm
        INNER JOIN invoicemaster as im on cm.ChemistId=im.ChemistId
        JOIN statemaster sm on cm.StateId = sm.StateId
        JOIN citymaster cmm on cm.CityId = cmm.CityId
        JOIN areamaster am on cm.AreaId = am.AreaId
        WHERE not (im.status=88 and im.invoicenumber is null)
        AND CONVERT(im.CreatedDate,Date) = CURRENT_DATE
        AND cm.StateId = ${stateId} 
        GROUP BY im.ChemistId
        ORDER BY cm.ChemistName;`;
  }
  else if (flag === 8) { 
    qry = `SELECT cm.ChemistName as Name
                 ,sm.StateName
                 ,cmm.CityName
                 ,am.AreaName
                 ,cm.Mobile
                 ,ifnull(im.GrandTotal,0) as Data 
          FROM chemistmaster as cm
          INNER JOIN invoicemaster as im on cm.ChemistId = im.ChemistId
          JOIN statemaster sm on cm.StateId = sm.StateId
          JOIN citymaster cmm on cm.CityId = cmm.CityId
          JOIN areamaster am on cm.AreaId = am.AreaId
          WHERE not (im.status=88 and im.invoicenumber is null)
          AND im.GrandTotal IS NOT NULL 
          AND MONTH(im.CreatedDate) = MONTH(CURRENT_DATE) 
          AND YEAR(im.CreatedDate) = YEAR(CURRENT_DATE)
          AND cm.StateId = ${stateId} 
          GROUP BY cm.ChemistId
          ORDER BY cm.ChemistName`;
  }
  else if (flag === 9) { 
    qry = `SELECT cm.ChemistName as Name
          ,sm.StateName
          ,cmm.CityName
          ,am.AreaName
          ,cm.Mobile
          ,ifnull(im.GrandTotal,0) as Data 
    FROM chemistmaster as cm
    INNER JOIN invoicemaster as im on cm.ChemistId=im.ChemistId
    JOIN statemaster sm on cm.StateId = sm.StateId
    JOIN citymaster cmm on cm.CityId = cmm.CityId
    JOIN areamaster am on cm.AreaId = am.AreaId
    WHERE not (im.status=88 and im.invoicenumber is null)
    AND MONTH(im.CreatedDate) = MONTH(CURRENT_DATE) 
    AND YEAR(im.CreatedDate) = YEAR(CURRENT_DATE)
    AND cm.StateId = ${stateId} 
    GROUP BY cm.ChemistId
    ORDER BY cm.ChemistName`; 
  }
  else if (flag === 10) {
    qry = `SELECT distinct cm.ChemistName as Name
          ,smm.StateName
          ,cmm.CityName
          ,am.AreaName
          ,cm.Mobile
          ,OM.OrderAmount AS Data
    FROM ordermaster OM 
    INNER JOIN chemistmaster cm ON OM.chemistId = cm.chemistId
    JOIN statemaster smm on cm.StateId = smm.StateId
    JOIN citymaster cmm on cm.CityId = cmm.CityId
    JOIN areamaster am on cm.AreaId = am.AreaId
    WHERE OM.OrderStatus = 45 
    AND OM.DeletedBy IS NULL 
    AND cm.StateId = ${stateId}
    GROUP BY OM.OrderMasterId
    UNION ALL
          SELECT distinct sm.StockistName as Name
          ,smm.StateName
          ,cmm.CityName
          ,am.AreaName
          ,sm.MobileNumber as Mobile
          ,OM.OrderAmount
  FROM ordermaster OM 
  INNER JOIN stockistmaster sm ON OM.stockistId = sm.stockistid AND OM.ChemistId = 0
  JOIN statemaster smm on sm.State = smm.StateId
  JOIN citymaster cmm on sm.City = cmm.CityId
  JOIN areamaster am on sm.AreaId = am.AreaId
  WHERE OrderStatus = 45 
  AND OM.DeletedBy IS NULL
  AND sm.State = ${stateId}
  GROUP BY OM.OrderMasterId `;
  }

  return await asyncDML({ qry });
};

module.exports = {
  dashboardPobProductiveMonthlyCallGetData,
  getChemistBirthdayData,
  getDashboardCountData,
  getDashboardStateWiseCountData,
  getDashboardStateWiseData
};
