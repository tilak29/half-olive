const { asyncDML } = require("../../../dbutils");
var async = require("async");

/**
 * @author "Parth Suthar"
 */
const getDCRCalendarData = async ({
  employeeId,
  loggedInEmployeeId,
  month,
  year,
}) => {
  const ipMonth = month ? `${month}` : null;
  const ipYear = year ? `${year}` : null;
  const id = employeeId ? employeeId : loggedInEmployeeId;
  const qry = `CALL GetDCRCalendarData(${id},${ipMonth},${ipYear},@op_IsTourPlanExists,@op_outputJson);
  select @op_IsTourPlanExists AS isTourPlanExists,@op_outputJson AS outputJson;`;
  return await asyncDML({ qry });
};

/**
 * @author "Parth Suthar"
 */
const getPreviewData = async ({ loggedInEmployeeId, date, employeeId }) => {
  const id = employeeId ? employeeId : loggedInEmployeeId;
  const qry = `CALL GetDCRPreviewDataByEmployeeAndDate('${date}',${id});`;
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const getIsLeaveApprovalPendingData = async ({ loggedInEmployeeId }) => {
  const qry = `SELECT FNGetIsLeaveApprovalPending(${loggedInEmployeeId})`;
  return await asyncDML({ qry });
};

/**
 * @author "Aadilkhan"
 */
const getDCRPreviewData = async ({ loggedInEmployeeId, date, employeeId }) => {
  if (employeeId == null || employeeId == 0) employeeId = loggedInEmployeeId;
  const employeeData = new Promise((resolve, reject) => {
    const qry_Employee = `
    SELECT FNGetFullNameByEmployeeId(${employeeId}) AS EmployeeName, CONCAT(FirstName,' ',LastName) Manager
    FROM employeemaster 
    WHERE employeeid = (SELECT managerId FROM employeemaster WHERE employeeid = ${employeeId})`;
    const employee = asyncDML({ qry: qry_Employee });
    resolve(employee);
  });

  const tourplanData = new Promise((resolve, reject) => {
    const qry_TourPlan = `SELECT TPD.Remarks, RM.RouteName AS PlannedRoutes
    FROM tourplan TP
    INNER JOIN tourplandetail TPD ON TP.TourPlanId = TPD.TourPlanId
    LEFT JOIN routemaster RM ON RM.RouteId = TPD.RouteId
    WHERE TP.EmployeeId =${employeeId}
    AND TP.Status = 34 
    AND TPD.WorkingDate = '${date}'
    AND TP.DeletedBy IS NULL
    -- 34:Approved
      ;`;
    const tour = asyncDML({ qry: qry_TourPlan });
    resolve(tour);
  });

  const attendanceData = new Promise((resolve, reject) => {
    const qry_Attendance = `SELECT DATE_FORMAT(AI.StartTime,'%d-%b-%Y %h:%i %p') AS PunchIn, DATE_FORMAT(AI.EndTime,'%d-%b-%Y %h:%i %p') AS PunchOut, MorningComments, EveningComments
    FROM attendanceinfo AI
    WHERE AI.EmployeeId = ${employeeId}
    AND AI.AttendanceDate = '${date}'
    AND AI.DeletedBy IS NULL
      ;`;
    const attendance = asyncDML({ qry: qry_Attendance });
    resolve(attendance);
  });

  const expenseData = new Promise((resolve, reject) => {
    const qry_expense = `SELECT TA, DAHQ, DAEX, DAOS, Hotel, Others
      ,IFNULL(TA,0)+IFNULL(DAHQ,0)+IFNULL(DAEX,0)+IFNULL(DAOS,0)+IFNULL(Hotel,0)+IFNULL(Others,0) AS Total
      , SD.StaticName, ED.RouteId, ED.Remarks AS ExpenseRemarks, RM.RouteName
    FROM expensedetails ED
    INNER JOIN staticdata SD ON ED.Status = SD.StaticId
    INNER JOIN routemaster RM ON RM.RouteId = ED.RouteId
    WHERE ED.Employeeid = ${employeeId}
    AND ED.DeletedBy IS NULL
    AND ED.ExpenseDate = '${date}'
    AND ED.Status != 43 -- 43: Rejected
    ;`;
    const expense = asyncDML({ qry: qry_expense });
    resolve(expense);
  });

  const visitData = new Promise((resolve, reject) => {
    const qry_visit = `
    DROP TEMPORARY TABLE IF EXISTS TempTable_VisitData;
    CREATE TEMPORARY TABLE TempTable_VisitData
    SELECT VL.VisitLogId, VL.RouteId, VL.ChemistId, VL.EmployeeId,
    VL.AreaId, VL.VisitTime, VL.ServerTime, 
          VL.POB, VL.ChemistRemarks , VL.WorkingWithId, VL.UpdatedDate, VL.VisitDate, VL.ChemistPOB, IFNULL(VL.SLPresent,0) AS SLPresent
    FROM visitlog VL 
    WHERE VL.DeletedBy IS NULL 
    AND VL.EmployeeId =${employeeId}
    AND VL.VisitDate = '${date}'
    ;

    SELECT VL.VisitLogId, VL.RouteId, CM.ChemistName, VL.EmployeeId,
        AM.AreaName, DATE_FORMAT(VL.VisitTime,'%h.%i %p') AS VisitTime, DATE_FORMAT(VL.ServerTime,'%h.%i %p') AS ServerTime, 
              VL.POB, VL.ChemistRemarks, VL.ServerTime AS ServerDateTime,
              CASE WHEN WW.EmployeeId = ${employeeId} THEN 'Individual' ELSE CONCAT(WW.FirstName,' ',WW.LastName) END AS WorkingWith
    FROM visitlog VL
    INNER JOIN chemistmaster CM ON CM.ChemistId = VL.ChemistId
    INNER JOIN areamaster AM ON AM.AreaId = VL.AreaId
    LEFT JOIN employeemaster WW ON WW.EmployeeId = VL.WorkingWithId    
    WHERE VL.VisitLogId IN (SELECT TVD.VisitLogId FROM TempTable_VisitData TVD)
    ORDER BY VL.VisitTime
    ;

    SELECT GROUP_CONCAT(CONCAT(GRM.RouteSr,'. ', GRM.RouteName) SEPARATOR ' | ') AS RoutesCovered
    FROM (
      SELECT DISTINCT IRM.RouteName, ROW_NUMBER() OVER(ORDER BY IRM.RouteId) AS RouteSr 
      FROM routemaster IRM
      WHERE IRM.RouteId IN (SELECT TVD.RouteId FROM TempTable_VisitData TVD)
    ) GRM
    ;
    
    DROP TEMPORARY TABLE IF EXISTS temptable_POBData;
    CREATE TEMPORARY TABLE temptable_POBData
    SELECT
      CM.ChemistName							
      ,0 AS CreatorRole
      ,VL.ChemistPOB
      ,VL.POB
      ,VL.VisitLogId
      ,VL.ChemistId
      ,VL.EmployeeId
      ,VL.AreaId
      ,AM.AreaName
      ,VL.WorkingWithId
      ,CASE WHEN WW.EmployeeId = ${employeeId} THEN 'Individual' ELSE CONCAT(WW.FirstName,' ',WW.LastName) END AS WorkingWith
      ,DATE_FORMAT(VL.VisitTime,'%h.%i %p') AS VisitTime
      ,DATE_FORMAT(VL.ServerTime,'%h.%i %p') AS ServerTime
      ,VL.ServerTime AS ServerDateTime
      ,VL.ChemistRemarks AS ChemistRemarks
      ,VL.UpdatedDate
      ,VL.SLPresent
    FROM TempTable_VisitData VL
    INNER JOIN chemistmaster CM ON VL.ChemistId = CM.ChemistId	
    INNER JOIN areamaster AM ON AM.AreaId = VL.AreaId
    LEFT JOIN employeemaster WW ON WW.EmployeeId = VL.WorkingWithId
    WHERE (DATE(VL.VisitDate) = '${date}') AND VL.EmployeeId = ${employeeId};
          
	  DROP TEMPORARY TABLE IF EXISTS temptable_POBChemistData;
    CREATE TEMPORARY TABLE temptable_POBChemistData
    SELECT
			VL.ChemistName							
			,0 AS CreatorRole
			,VL.ChemistPOB AS OrderAmount
			,VL.VisitLogId
			,VL.ChemistId
      ,VL.EmployeeId
			,VL.AreaId
			,VL.AreaName
			,VL.WorkingWithId
			,VL.WorkingWith
			,VL.VisitTime
			,VL.ServerTime
      ,VL.ServerDateTime
			,VL.ChemistRemarks
			,VL.UpdatedDate
	  FROM temptable_POBData VL
	  WHERE VL.ChemistPOB > 0;

    DROP TEMPORARY TABLE IF EXISTS temptable_POBEmpData;
    CREATE TEMPORARY TABLE temptable_POBEmpData
    SELECT
		VL.ChemistName
		,1 AS CreatorRole
		,(IFNULL(VL.POB,0) - VL.ChemistPOB) AS OrderAmount
		,VL.VisitLogId
		,VL.ChemistId
		,VL.AreaId
		,VL.AreaName
		,VL.WorkingWithId
		,VL.WorkingWith
		,VL.VisitTime
		,VL.ServerTime
        ,VL.ServerDateTime
		,VL.EmployeeId
		,VL.ChemistRemarks
		,VL.UpdatedDate
	FROM temptable_POBData VL
	WHERE (IFNULL(VL.POB,0) - VL.ChemistPOB) > 0 AND VL.SLPresent = 0;
    
    DROP TEMPORARY TABLE IF EXISTS temptable_POBSLData;
    CREATE TEMPORARY TABLE temptable_POBSLData
    SELECT
      VL.ChemistName
      ,1 AS CreatorRole
      ,(IFNULL(VL.POB,0) - VL.ChemistPOB) AS OrderAmount
      ,VL.VisitLogId
      ,VL.ChemistId
      ,VL.EmployeeId      
      ,VL.AreaId
      ,VL.AreaName
      ,VL.WorkingWithId
      ,VL.WorkingWith
      ,VL.VisitTime
      ,VL.ServerTime
      ,VL.ServerDateTime		
      ,VL.ChemistRemarks
      ,VL.UpdatedDate
	  FROM temptable_POBData VL
	  WHERE (IFNULL(VL.POB,0) - VL.ChemistPOB) >= 0 AND VL.SLPresent = 1;

    SELECT 
      ROW_NUMBER() OVER(ORDER BY a.VisitLogId ASC) SrNo
      ,a.* 
    FROM
      (
        SELECT * FROM temptable_POBChemistData
        UNION ALL
        SELECT * FROM temptable_POBEmpData
        UNION ALL
        SELECT * FROM temptable_POBSLData
      )a;       
      
    DROP TEMPORARY TABLE IF EXISTS temptable_POBData;
    DROP TEMPORARY TABLE IF EXISTS temptable_POBChemistData;
    DROP TEMPORARY TABLE IF EXISTS temptable_POBEmpData;
    DROP TEMPORARY TABLE IF EXISTS temptable_POBSLData;
    `;
    const visit = asyncDML({ qry: qry_visit });
    resolve(visit);
  });

  var p = Promise.all([
    employeeData,
    tourplanData,
    attendanceData,
    expenseData,
    visitData,
  ]);
  return p;
};

/**
 * @author "Aadilkhan"
 */
const getDCRCalendarDataAsync = async ({
  employeeId,
  loggedInEmployeeId,
  month,
  year,
}) => {
  if (employeeId == 0) employeeId = loggedInEmployeeId;
  const dateData = new Promise((resolve, reject) => {
    const qry_Dates = `
    CALL CreateMonthlyCalendarByMonthYear(${month}, ${year});
    SELECT MC.MonthDate, MC.DayName AS DateName, MC.DayIndex AS WeekDayIndex
    FROM monthlycalendar MC
    WHERE MC.Month = ${month}
    AND MC.Year = ${year};`;
    const dates = asyncDML({ qry: qry_Dates });
    resolve(dates);
  });

  const weekOffData = new Promise((resolve, reject) => {
    const qry_weekOff = `SELECT FNGetConfigurationValueByCode('WEEKOFFDAYS', convert('${year}-0${month}-01',DATE)) AS WeekOffDays;`;
    const weekOff = asyncDML({ qry: qry_weekOff });
    resolve(weekOff);
  });

  const tourplanData = new Promise((resolve, reject) => {
    const qry_tourplan = `SELECT CONVERT(TPD.WorkingDate,DATE) AS WorkingDate, TPD.DayOfWeek, ER.RouteTypeId,TPD.Remarks AS tpRemarks, TPD.WorkingWithId
    FROM tourplan TP
      INNER JOIN tourplandetail TPD ON TPD.TourPlanId = TP.TourPlanId      
      LEFT JOIN employeeroutes ER ON ER.RouteId = TPD.RouteId AND ER.EmployeeId = ${employeeId}
    WHERE TP.Month = ${month}
    AND TP.Year = ${year}
    AND TP.EmployeeId = ${employeeId}
    AND TP.DeletedBy IS NULL 
    AND ER.DeletedBy IS NULL
    AND TP.Status = 34 -- 34: Approved;`;
    const tourplan = asyncDML({ qry: qry_tourplan });
    resolve(tourplan);
  });

  const expenseData = new Promise((resolve, reject) => {
    const qry_expense = `SELECT ED.ExpenseDate, ED.RouteType
    FROM expensedetails ED
    WHERE ED.Status = 42 -- 42: Approved
    AND ED.DeletedBy IS NULL
    AND ED.EmployeeId = ${employeeId}
    AND ED.ExpenseDate BETWEEN '${year}-0${month}-01' AND LAST_DAY('${year}-0${month}-01')
    ;`;
    const expense = asyncDML({ qry: qry_expense });
    resolve(expense);
  });

  const attendanceData = new Promise((resolve, reject) => {
    const qry_attendance = `SELECT AI.WorkDayType, AI.AttendanceDate, AI.EndTime
    FROM attendanceinfo AI
    WHERE AI.DeletedBy IS NULL
    AND AI.EmployeeId = ${employeeId}
    AND AI.AttendanceDate BETWEEN '${year}-0${month}-01' AND LAST_DAY('${year}-0${month}-01')
      ;`;
    const attendance = asyncDML({ qry: qry_attendance });
    resolve(attendance);
  });

  const holidayData = new Promise((resolve, reject) => {
    const qry_holiday = `SELECT DISTINCT HM.HolidayDate
    FROM holidaymaster HM 
      INNER JOIN employeemaster EM ON HM.StateId = EM.StateId
    WHERE HM.DeletedBy IS NULL
    AND EM.EmployeeId = ${employeeId}
    AND HM.HolidayDate BETWEEN '${year}-0${month}-01' AND LAST_DAY('${year}-0${month}-01')
    ;`;
    const holiday = asyncDML({ qry: qry_holiday });
    resolve(holiday);
  });

  const leaveData = new Promise((resolve, reject) => {
    const qry_leave = `SELECT LM.LeaveType, LM.LeaveCategory, CONVERT(LM.StartDate,DATE) AS StartDate, CONVERT(LM.EndDate,DATE) AS EndDate
    FROM leavemaster LM
    WHERE LM.DeletedBy IS NULL 
    AND LM.EmployeeId = ${employeeId}
    AND LM.Status = 29 -- 29: Approved
      AND ((MONTH(LM.StartDate) = ${month} AND YEAR(LM.StartDate) = ${year})
      OR (MONTH(LM.EndDate) = ${month} AND YEAR(LM.EndDate) = ${year})
      )
      ;`;
    const leave = asyncDML({ qry: qry_leave });
    resolve(leave);
  });

  const visitlogData = new Promise((resolve, reject) => {
    const qry_visitlog = `SELECT CONVERT(VL.VisitDate,DATE) AS VisitDate, VL.POB
    FROM visitlog VL
    WHERE VL.employeeId = ${employeeId}
    AND VL.VisitDate BETWEEN '${year}-0${month}-01' AND LAST_DAY('${year}-0${month}-01')
    AND VL.DeletedBy IS NULL
      ;`;
    const visitlog = asyncDML({ qry: qry_visitlog });
    resolve(visitlog);
  });

  const unlockdcrData = new Promise((resolve, reject) => {
    const qry_unlockdcr = `SELECT UD.UnlockDate
    FROM unlockdcr UD
    WHERE UD.DeletedBy IS NULL
    AND UD.EmployeeId = ${employeeId}
    AND UD.Status = 38 -- 38: Approved
    AND CONVERT(IFNULL(UD.UpdatedDate,UD.CreatedDate), DATE) = CURRENT_DATE
      ;`;
    const unlockdcr = asyncDML({ qry: qry_unlockdcr });
    resolve(unlockdcr);
  });

  const reportingPeriodData = new Promise((resolve, reject) => {
    const qry_empRepPer = `select ReportingPeriod from employeemaster where employeeId = ${employeeId}`;
    const reportingPeriod = asyncDML({ qry: qry_empRepPer });
    resolve(reportingPeriod);
  });

  var p = Promise.all([
    dateData,
    weekOffData,
    tourplanData,
    expenseData,
    attendanceData,
    holidayData,
    leaveData,
    visitlogData,
    unlockdcrData,
    reportingPeriodData,
  ]);
  return p;
};

module.exports = {
  getDCRCalendarData,
  getPreviewData,
  getIsLeaveApprovalPendingData,
  getDCRPreviewData,
  getDCRCalendarDataAsync,
};
