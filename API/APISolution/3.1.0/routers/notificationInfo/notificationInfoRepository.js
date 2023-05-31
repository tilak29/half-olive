const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");

/**
 * @author "Harsh Patel"
 */
const notificationGetData = async ({
  loggedInEmployeeId,
  isAdmin,
  page = null,
  pageSize = null,
  orderBy = null,
  orderDirection,
  search,
  loggedInAppIndication,
  loggedInMobileNumber = null
}) => {
  const searchtext = search ? `'${search}'` : null;
  const orderBytext = orderBy ? `'${orderBy}'` : null;
  const orderDir = orderDirection ? `'${orderDirection}'` : null;
  const qry = `CALL GetNotificationData_300 (${loggedInEmployeeId},${CompanyId},${page},${pageSize},${orderBytext},${orderDir},${searchtext},${isAdmin},${loggedInAppIndication}, ${loggedInMobileNumber});UPDATE notificationinfo SET IsNotificationSent=1 WHERE ReceiverId = ${loggedInEmployeeId} AND CONVERT(Date,DATE)=CURRENT_DATE;`;
  return await asyncDML({ qry });
};

/**
 * @author "Parth Suthar"
 */
const notificationGetCount = async ({ loggedInEmployeeId, loggedInAppIndication,loggedInMobileNumber = null }) => {
  const qry = `SELECT GetNotificationCountByEmployeeId_300(${loggedInEmployeeId}, ${loggedInAppIndication}, ${loggedInMobileNumber}) AS Count;`;
  return await asyncDML({ qry });
};

/**
 * @author "Harsh Patel"
 */
const notificationSaveData = async ({ data, operationType }) => {
  const {
    notificationId,
    employeeId,
    divisionIds,
    stateIds,
    designationIds,
    message,
    loggedInEmployeeId
  } = data;
  let qry;
  if (operationType === 0) {
    qry = `INSERT INTO notificationinfo(CompanyId, ReceiverId, Date, DivisionIds, StateIds, DesignationIds, NotificationMessage, CreatedBy,CreatedDate) 
    VALUES (${CompanyId},${employeeId}, Current_Timestamp,'[${divisionIds}]','[${stateIds}]','[${designationIds}]','${message}',${loggedInEmployeeId},Current_Timestamp);`;
  } else if (operationType === 1)
    qry = `Update notificationinfo set DivisionIds='${divisionIds}',StateIds='${stateIds}',DesignationIds='[${designationIds}]',NotificationMessage='${message}',UpdatedBy=${loggedInEmployeeId},UpdatedDate=Current_Timestamp WHERE NotificationId=${notificationId}`;
  return await asyncDML({ qry });
};

module.exports = {
  notificationGetData,
  notificationSaveData,
  notificationGetCount
};
