const { asyncDML } = require("../../../dbutils");

/**
 * @author "Khushbu Shah"
 */
const invoiceGetData = async ({
  statusId,
  stateId,
  cityId,
  month,
  year,
  loggedInEmployeeId,
  loggedInAppIndication
}) => {
  if (stateId === null) stateId = JSON.stringify([]);
  else stateId = JSON.stringify(stateId);
  const qry = `CALL GetInvoiceDetailByStatus_310(${loggedInEmployeeId},${loggedInAppIndication},'${stateId}',${cityId},${statusId},${month},${year});`;
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const invoiceSaveData = async ({
  loggedInEmployeeId,
  invoiceMasterJson,
  invoiceDetailJson,
  operationType
}) => {
  const invoiceDetail =
    invoiceDetailJson && operationType === 1
      ? `'${JSON.stringify(invoiceDetailJson)}'`
      : null;
  const qry = `SET @op_IsSuccess = 0, @op_Flag = 0, @notificationObject = null;
	CALL SaveInvoiceData(${loggedInEmployeeId},'${JSON.stringify(
    invoiceMasterJson[0]
  )}',${invoiceDetail},${operationType},@op_IsSuccess, @op_Flag, @notificationObject);
  SELECT @op_IsSuccess, @op_Flag, @notificationObject;`;
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const invoiceGetDataForMobile = async ({
  loggedInEmployeeId,
  chemistMobileNumber = null
}) => {
  const qry = `CALL CS_GetInvoiceDetailByChemist(${loggedInEmployeeId}, ${chemistMobileNumber});`;  
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const invoiceGetDetailData = async ({ invoiceId, loggedInEmployeeId }) => {
  const qry = `CALL CS_GetInvoiceItemDetailByInvoiceId(${loggedInEmployeeId},${invoiceId});`;
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const invoiceCheckDuplicate = async ({
  loggedInEmployeeId,
  invoiceNumber,
  stockistId,
  pageNo
}) => {
//   const qry = `SELECT CONCAT('Invoice Number ',
//   IM.InvoiceNumber,
//         ' is associated with ',
//         CM.ChemistName,
//         ' chemist with ',
//         DATE_FORMAT(IM.InvoiceDate, '%d-%m-%Y'),
//         ' date and ',
//         SD.StaticName,' status.') AS DuplicateMessage
// , true AS IsDuplicate
// FROM invoicemaster IM
// INNER JOIN chemistmaster CM ON IM.ChemistId = CM.ChemistId
// INNER JOIN staticdata SD ON SD.StaticId = IM.Status
// WHERE InvoiceNumber = '${invoiceNumber}' AND PageNo = ${pageNo} AND StockistId = ${stockistId};`;
const qry = `CALL GetDuplicateInvoiceList(${loggedInEmployeeId}, '${invoiceNumber}', ${stockistId}, ${pageNo})`;
return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const invoiceGetMasterData = async ({
  loggedInEmployeeId,
  pointFlag = 0,
  loggedInAppIndication
}) => {
  const qry = `SELECT IM.InvoiceId,
    IFNULL(CONCAT(IM.InvoiceNumber,'-',IM.PageNo), CP.Remarks) AS InvoiceNumber,
    IM.GrandTotal AS GrandTotal,
    CP.Point AS Points,
    IFNULL(IM.InvoiceDate, DATE(CP.CreatedDate)) AS InvoiceDate,
    IFNULL(IM.IsReturnInvoice, 0) AS IsReturnInvoice,
    IF(CP.ReferenceTable IS NULL OR CP.ReferenceTable = 'manual', 1, 0) AS IsManuallyAdded,
    CP.CreatedDate
  FROM customerpointhistory CP
  LEFT JOIN invoicemaster IM ON CP.ReferenceTable = 'invoicemaster' AND CP.ReferenceId = IM.InvoiceId AND IM.Status = 88 -- 88: Approved invoice
  WHERE CP.CustomerId = ${loggedInEmployeeId} AND ${loggedInAppIndication} = 2
  AND CP.ReferenceTable != 'redeemrequest'
  AND CP.PointType = CASE WHEN ${pointFlag} = 0 THEN 17 -- 17: Box point
              WHEN ${pointFlag} = 1 THEN 16 -- 16: Purchase(value) point
              WHEN ${pointFlag} = 2 THEN 97 -- 97: Scan point
      END
ORDER BY IM.CreatedDate DESC;`;
  return await asyncDML({ qry });
};

/**
 * @author "Aadilkhan"
 */
const returnInvoiceUpdateData = async ({
  loggedInEmployeeId,
  invoiceMasterJson,
  invoiceDetailJson,
  operationType
}) => {
  const invoiceDetail =
    invoiceDetailJson && operationType === 1
      ? `'${JSON.stringify(invoiceDetailJson)}'`
      : null;
  const qry = `SET @op_IsSuccess = 0, @op_Flag = 0;
	CALL UpdateReturnInvoiceData(${loggedInEmployeeId},'${JSON.stringify(
    invoiceMasterJson[0]
  )}',${invoiceDetail},${operationType},@op_IsSuccess, @op_Flag);
  SELECT @op_IsSuccess, @op_Flag;`;
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const invoiceGetByEmployeeAndDate = async ({
  loggedInEmployeeId,
  startDate,
  endDate
}) => {
  const filStartDate = startDate == null ? null : `'${startDate}'`;
  const filEndDate = endDate == null ? null : `'${endDate}'`;
  const qry = `CALL GetInvoiceListByEmployeeAndDate(${loggedInEmployeeId},${filStartDate},${filEndDate});`;
  return await asyncDML({ qry });
};

/**
 * @author "Imran Patwa"
 */
const invoiceGetItemData = async ({ invoiceId, loggedInEmployeeId }) => {
  const qry = `-- 170581 new changes of cte.
  SET @ChemistId = (SELECT ChemistId FROM invoicemaster WHERE InvoiceId = ${invoiceId});
  WITH CTE_PreviousInvoices AS(
    SELECT InvoiceId,IM.Status,StockistId,InvoiceNumber,PageNo,InvoiceDate,
      IM.SBoxPoints,
       IM.PurchasePoints,
       IM.BoxPoints
      FROM invoicemaster IM
      WHERE IM.ChemistId = @ChemistId 
      AND IM.InvoiceId < ${invoiceId}
      AND IM.DeletedBy IS NULL
        ORDER BY IM.InvoiceId DESC
      LIMIT 3
  ),CTE_ItemCount AS
  (
    SELECT ID.InvoiceId,COUNT(1) 'NoOfItems' FROM invoicedetail ID 
    WHERE ID.InvoiceId IN (SELECT InvoiceId FROM CTE_PreviousInvoices)    
    GROUP BY ID.InvoiceId
  )
  
  SELECT 
    (
      SELECT JSON_ARRAYAGG(JSON_OBJECT("itemId",ID.ItemId,"brand",iIM.Brand,"pack",iIM.Pack, "qty",ID.Qty))
      FROM invoicedetail ID
      INNER JOIN itemmaster iIM ON ID.ItemId = iIM.ItemId
      WHERE ID.InvoiceId = ${invoiceId}
          ) AS InvoiceItems,
          (
            SELECT JSON_ARRAYAGG(JSON_OBJECT("itemId",ID.ItemId,"brand",iIM.Brand,"pack",iIM.Pack, "qty",ID.Qty,"totalPrice",ID.TotalAmount,"MRP",IP.MRP,"PTR",IP.PTR))
            FROM invoicedetail ID
            INNER JOIN itemmaster iIM ON ID.ItemId = iIM.ItemId
            INNER JOIN (
                  SELECT ItemId
                                  ,MAX(iIP.ItemPriceId) MaxItemPriceId
                  FROM itemprice iIP
                  WHERE DeletedBy IS NULL
                  AND iIP.EffectiveStartDate <= CURRENT_DATE
                  
                  GROUP BY iIP.ItemId
            ) II ON II.ItemId = ID.ItemId
            INNER JOIN itemprice IP ON IP.ItemId = ID.ItemId AND IP.ItemPriceId = II.MaxItemPriceId AND IP.DeletedBy IS NULL
            WHERE ID.InvoiceId = ${invoiceId}
          ) AS InvoiceItemsWithMRP,
          (
      SELECT JSON_ARRAYAGG(InvoiceData)
              FROM (
        SELECT JSON_OBJECT("stockistName",ISM.StockistName,
          "invoiceNumber", IIM.InvoiceNumber,
       "pageNo", IIM.PageNo,
          "invoiceDate",IIM.InvoiceDate,
          "noOfItems",IFNULL(CT.NoOfItems,0),
          -- "noOfItems",(SELECT COUNT(1) FROM invoicedetail iID WHERE iID.InvoiceId = IIM.InvoiceId), --170581
            "purchasePoints",IIM.PurchasePoints,
                "boxPoints",IIM.BoxPoints,
                            "sboxPoints",IIM.SBoxPoints,
          
          /* --170581
                "purchasePoints",(MAX(CASE WHEN PointType = 16 THEN Point END)),
                "boxPoints",(MAX(CASE WHEN PointType = 17 THEN Point END)),
                            "sboxPoints",(MAX(CASE WHEN PointType = 97 THEN Point END)),*/
          "statusText",ISD.StaticName) AS InvoiceData
        FROM CTE_PreviousInvoices IIM
        INNER JOIN staticdata ISD ON ISD.StaticId = IIM.Status
        INNER JOIN stockistmaster ISM ON ISM.StockistId = IIM.StockistId
        LEFT JOIN CTE_ItemCount CT ON IIM.InvoiceId = CT.InvoiceId
      -- LEFT JOIN customerpointhistory CPH ON CPH.ReferenceTable = 'invoicemaster' AND CPH.ReferenceId = IIM.InvoiceId --170581     
        ORDER BY IIM.InvoiceId DESC      
              ) AS DT
          ) AS InvoiceChemistHistory;
  
  `;    
  return await asyncDML({ qry });
};

module.exports = {
  invoiceGetData,
  invoiceSaveData,
  invoiceGetDataForMobile,
  invoiceGetDetailData,
  invoiceCheckDuplicate,
  invoiceGetMasterData,
  returnInvoiceUpdateData,
  invoiceGetByEmployeeAndDate,
  invoiceGetItemData
};
