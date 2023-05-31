const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");

/**
 * @author "Khushbu Shah"
 */
const cityGetData = async ({ stateId, noOfGroupShow }) => {
  const qry = `SELECT C.*
  ,(SELECT COUNT(1) FROM chemistmaster CM where CM.CityId = C.CityId and CM.StateId=C.StateId AND CM.DeletedBy IS NULL AND IsActive = 1) AS 'No Of Chemist'
   FROM citymaster C WHERE (C.DeletedBy is null or C.DeletedBy='') and C.StateId = ${stateId} and C.CompanyId=${CompanyId} ORDER BY C.CityName ${noOfGroupShow}`;
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const citySaveData = async ({ data, operationType }) => {
  const qry = `SET @op_IsSuccess = 0;SET @op_Flag = 0; 
  CALL SaveCityMaster('${data}',${operationType},@op_IsSuccess, @op_Flag);SELECT @op_IsSuccess, @op_Flag;`;
  return await asyncDML({ qry });
};

module.exports = {
  cityGetData,
  citySaveData
};
