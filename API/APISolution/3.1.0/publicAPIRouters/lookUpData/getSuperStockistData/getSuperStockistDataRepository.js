const { asyncDML } = require("../../../../dbutils");
const { CompanyId } = require("../../../../Config.json");

/**
 * @author "Khushbu Shah"
 */
const getLookupData = async ({loggedInEmployeeId, loggedInAppIndication, divisionId = null}) => {
  const roleId = loggedInAppIndication;
  const mobileNumber = loggedInEmployeeId;
  const qry = `Select StockistId as Value,StockistName as Label, StockistName as name
  from stockistmaster SM
  Where SM.IsSuperStockist=1 and SM.IsActive=1 and SM.CompanyId =${CompanyId}
  AND ( 
      ${roleId} is null 
      or ${roleId} != 0 
      OR (
          ${roleId} = 0 
          and JSON_CONTAINS((select ISM.SuperStockistId from stockistmaster ISM where ISM.StockistId = '${loggedInEmployeeId}'), CONVERT(SM.StockistId,CHAR)) = 1
          )
      )
  AND (${divisionId} IS NULL OR JSON_CONTAINS(DivisionId, '${divisionId}') = 1 );`;
  return await asyncDML({ qry });
};

module.exports = {
  getLookupData
};
