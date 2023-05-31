const { asyncDML } = require("../../../dbutils");

/**
 * @author "Khushbu Shah"
 */
const broadcastMobileNewsGetData = async ({ loggedInEmployeeId }) => {
  const qry = `SELECT BroadcastId,DivisionIds,StateIds,DesignationIds,Message,StartDate,EndDate
      ,(SELECT  GROUP_CONCAT(StateName SEPARATOR ', ')
          FROM statemaster
          WHERE JSON_CONTAINS(StateIds, CONVERT(StateId,CHAR),'$')=1 ) AS StateName
      ,(SELECT  GROUP_CONCAT(DivisionName SEPARATOR ', ')
          FROM divisionmaster
          WHERE JSON_CONTAINS(DivisionIds, CONVERT(DivisionId,CHAR),'$')=1 ) AS DivisionName
      ,(SELECT  GROUP_CONCAT(DesignationCode SEPARATOR ', ')
          FROM designationmaster
          WHERE IsRetailer IS NULL AND JSON_CONTAINS(DesignationIds, CONVERT(DesignationId,CHAR),'$')=1 ) AS DesignationName
      ,IFNULL((
            select 1
                from employeemaster  em
            where JSON_CONTAINS(StateIds, CONVERT(em.StateId,CHAR),'$')=1
            AND EXISTS(SELECT Id FROM JSON_TABLE(em.DivisionId, '$[*]' COLUMNS(Id VARCHAR(10) PATH '$')) AS D WHERE JSON_CONTAINS(DivisionIds, Id,'$')=1)
            and JSON_CONTAINS(DesignationIds, CONVERT(em.DesignationId,CHAR),'$')=1
            and employeeId=${loggedInEmployeeId} and StartDate<=current_date and current_date<=EndDate
          ),0) as IsAllowBroadCast
    FROM broadcastmaster b WHERE IsActive = 1 AND DeletedBy IS NULL;`;
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const broadcastMobileNewsSaveData = async ({ data, operationType }) => {
  const {
    broadcastId,
    divisionIds,
    stateIds,
    designationIds,
    message,
    startDate,
    endDate,
    isActive,
    loggedInEmployeeId
  } = data;
  let qry;
  if (operationType === 0)
    qry = `Update broadcastmaster set IsActive=0,UpdatedBy=${loggedInEmployeeId},UpdatedDate=Current_Timestamp;INSERT INTO broadcastmaster(DivisionIds, StateIds, DesignationIds, Message, StartDate, EndDate, IsActive, CreatedBy,CreatedDate) VALUES ('[${divisionIds}]','[${stateIds}]','[${designationIds}]','${message}','${startDate}','${endDate}',${isActive},${loggedInEmployeeId},Current_Timestamp);`;
  else if (operationType === 1)
    qry = `Update broadcastmaster set DivisionIds='[${divisionIds}]',StateIds='[${stateIds}]',DesignationIds='[${designationIds}]',Message='${message}',StartDate='${startDate}',EndDate='${endDate}',IsActive=${isActive},UpdatedBy=${loggedInEmployeeId},UpdatedDate=Current_Timestamp WHERE BroadcastId=${broadcastId}`;
  return await asyncDML({ qry });
};

module.exports = {
  broadcastMobileNewsGetData,
  broadcastMobileNewsSaveData
};
