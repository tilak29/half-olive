const { asyncDML } = require("../../../dbutils");
// const { CompanyId } = require("../../../Config.json");

/**
 * @author "Harsh Patel"
 */
const notificationGetData = async ({
    loggedInEmployeeId,
    loggedInAppIndication,
    loggedInMobileNumber
}) => {
    let qry;
    qry = `select NotificationMessage,
            DATE_FORMAT(CreatedDate,'%h:%i %p') AS NotificationTime
            from cs_notificationinfo
            WHERE ReceiverRoleId = '${loggedInAppIndication}'
            AND (ReceiverId = '${loggedInEmployeeId}' OR ReceiverId = '${loggedInMobileNumber}')
            AND CONVERT(CreatedDate,DATE) = CURRENT_DATE
            order by CreatedDate desc;
            
            UPDATE cs_notificationinfo
            SET IsRead = 1
            WHERE ReceiverRoleId = '${loggedInAppIndication}'
            AND (ReceiverId = '${loggedInEmployeeId}' OR ReceiverId = '${loggedInMobileNumber}');`;
    return await asyncDML({ qry });
};

/* Created By: Aadilkhan */
const notificationGetNewCount = async ({
    loggedInEmployeeId,
    loggedInAppIndication,
    loggedInMobileNumber
}) => {
    let qry;
    qry = `SELECT COUNT(1) AS Count
            FROM cs_notificationinfo
            WHERE ReceiverRoleId = '${loggedInAppIndication}'
            AND (ReceiverId = '${loggedInEmployeeId}' OR ReceiverId = '${loggedInMobileNumber}')
            AND IFNULL(IsRead,0) = 0
            ;
            
            WITH cte_MaxCPNotification AS(
                SELECT CP.CustomerPrescriptionId,MAX(NF.NotificationId) AS NotificationId
                FROM cp_notificationinfo NF
                JOIN customerprescription CP ON CP.CustomerPrescriptionId = NF.SenderId
                JOIN customerdetail CD ON CD.CustomerId = CP.CustomerId
                WHERE CD.deletedby IS NULL
                AND CP.DeletedBy IS NULL
                AND NF.ReceiverId = '${loggedInMobileNumber}'
                AND CP.NotificationType != 118 -- never notification type
                AND IFNULL(NF.IsRead,0) = 0
                GROUP BY CP.CustomerPrescriptionId
            )
            
            SELECT COUNT(1) AS CustomerNotificationCount
            FROM cte_MaxCPNotification
            ;`;
    return await asyncDML({ qry });
};

/**
 * @author "Harsh Patel"
 */

module.exports = {
    notificationGetData,
    notificationGetNewCount
};
