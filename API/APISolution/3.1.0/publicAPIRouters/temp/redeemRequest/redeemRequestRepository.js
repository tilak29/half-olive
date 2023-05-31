const { asyncDML } = require("../../../dbutils");

/**
 * @author "Khushbu Shah"
 */
const redeemRequestSaveData = async ({
  loggedInEmployeeId,
  data,
  operationType
}) => {
  const qry = `SET @op_IsSuccess=NULL, @op_Flag=NULL, @notificationObject=null;
  CALL CS_SaveRedeemRequest(${loggedInEmployeeId},'${data}',${operationType},@op_IsSuccess, @op_Flag, @notificationObject);
  SELECT @op_IsSuccess, @op_Flag, @notificationObject;`;
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const redeemRequestGetRewardStatusData = async ({ loggedInEmployeeId }) => {
  const qry = `CALL CS_GetRedeemedRewardStatusByChemist(${loggedInEmployeeId});`;
  return await asyncDML({ qry });
};

/**
 * @author "Aadilkhan"
 */
const redeemRequestListGetData = async ({ loggedInEmployeeId, stateId, cityId, year, status, loggedInAppIndication}) => {
  const qry = `CALL GetRedemptionApprovalListByStatusCityStatus(${loggedInEmployeeId},${stateId},${cityId},${year},${status}, ${loggedInAppIndication});`;
  return await asyncDML({ qry });;
};

/**
 * @author "Aadilkhan"
 */
const redeemApprovalChemistMessage = async ({statusId, chemistName}) => {
  const qry = `SET @jsonData = (SELECT JSON_OBJECT('RedeemStatus',StaticName,'ChemistName','${chemistName}') 
                                FROM staticdata WHERE staticid = ${statusId});
	SELECT FNGetTemplateBodyByCode('RedemptionStatusUpdateRemark', @jsonData) AS message;`;
  return await asyncDML({ qry });;
};


module.exports = {
  redeemRequestSaveData,
  redeemRequestGetRewardStatusData,
  redeemRequestListGetData,
  redeemApprovalChemistMessage
};
