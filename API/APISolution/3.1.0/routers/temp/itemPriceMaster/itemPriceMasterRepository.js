const moment = require("moment");

const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");

/**
 * @author "Khushbu Shah"
 */
const itemPriceMasterGetData = async ({
  loggedInEmployeeId,
  effectiveStartDate,
  categoryId = null,
  divisionId = null,
  loggedInAppIndication = null
}) => {
  const currentDate = moment().utcOffset("+05:30").format("YYYY-MM-DD");
  const effectiveDate = effectiveStartDate
    ? `'${effectiveStartDate}'`
    : `'${currentDate}'`;
  const qry = `CALL GetItemPriceByEffectiveDate_300(${loggedInEmployeeId}, ${CompanyId},${effectiveDate},${categoryId},${divisionId}, ${loggedInAppIndication});`;
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const itemPriceMasterSaveData = async ({
  data,
  effectiveStartDate,
  loggedInEmployeeId
}) => {
  const qry = `SET @op_IsSuccess = 0;
  CALL SaveItemPriceByEffectiveDate ('${data}','${effectiveStartDate}',${loggedInEmployeeId},${CompanyId},@op_IsSuccess);
  SELECT @op_IsSuccess;`;
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const getItemPriceExportDates = async ({}) => {
  const qry = `SELECT distinct EffectiveStartDate FROM itemprice ORDER BY EffectiveStartDate DESC LIMIT 5;`;
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const itemPriceMasterDownloadData = async ({
  effectiveStartDate,
  loggedInEmployeeId
}) => {
  const qry = `CALL GetItemPriceByEffectiveDate(${loggedInEmployeeId}, ${CompanyId},'${effectiveStartDate}',null,null);`;
  return await asyncDML({ qry });
};

module.exports = {
  itemPriceMasterSaveData,
  itemPriceMasterGetData,
  getItemPriceExportDates,
  itemPriceMasterDownloadData
};
