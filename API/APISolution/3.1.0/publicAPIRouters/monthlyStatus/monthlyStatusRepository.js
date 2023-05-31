const { asyncDML } = require("../../../dbutils");

/**
 * @author "Khushbu Shah"
 */
const monthlyStatusGetData = async ({
  loggedInEmployeeId,
  loggedInAppIndication
}) => {
  const qry = `SELECT SUM(CASE WHEN orderstatus = 45 THEN IFNULL(TotalOrders,0) ELSE 0 END) AS PendingOrders,
  SUM(CASE WHEN orderstatus = 45 THEN IFNULL(OrderAmount,0) ELSE 0 END) AS PendingOrderAmount,
  SUM(CASE WHEN orderstatus = 46 THEN IFNULL(TotalOrders,0) ELSE 0 END) AS SupplyedOrders,
  SUM(CASE WHEN orderstatus = 46 THEN IFNULL(OrderAmount,0) ELSE 0 END) AS SupplyedOrderAmount,
  SUM(CASE WHEN orderstatus = 47 THEN IFNULL(TotalOrders,0) ELSE 0 END) AS DeliveredOrders,
  SUM(CASE WHEN orderstatus = 47 THEN IFNULL(OrderAmount,0) ELSE 0 END) AS DeliveredOrderAmount,
  SUM(CASE WHEN orderstatus = 48 THEN IFNULL(TotalOrders,0) ELSE 0 END) AS RejectedOrders,
  SUM(CASE WHEN orderstatus = 48 THEN IFNULL(OrderAmount,0) ELSE 0 END) AS RejectedOrderAmount,
  SUM(TotalOrders) AS ReceivedOrders,
  SUM(OrderAmount) AS ReceivedOrderAmount,
  SUM(OrderAmount) AS TotalOrderAmount
FROM (
SELECT orderstatus, SUM(IFNULL(ActualAmount,OrderAmount)) OrderAmount, COUNT(1) As TotalOrders
FROM ordermaster OM
INNER JOIN stockistmaster SM ON (${loggedInAppIndication} = 0 AND SM.StockistId = OM.StockistId AND OM.ChemistId != 0)
                                OR (${loggedInAppIndication} = 1 AND SM.StockistId = OM.SuperStockistID)
WHERE orderstatus IN (45, 46, 47, 48)
  AND OM.DeletedBy IS NULL
  AND SM.StockistId = ${loggedInEmployeeId}
  AND MONTH(OM.CreatedDate) = MONTH(CURDATE())
  AND YEAR(OM.CreatedDate) = YEAR(CURDATE())
GROUP BY orderstatus
) DT;`;
  
  return await asyncDML({ qry });
};

module.exports = {
  monthlyStatusGetData
};
