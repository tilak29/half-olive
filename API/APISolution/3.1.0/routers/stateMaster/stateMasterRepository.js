const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");

/**
 * @author "Parth Suthar"
 */
const stateGetData = async ({ countryId, noOfGroupShow }) => {
  const qry = `SELECT * FROM statemaster WHERE (DeletedBy is null or DeletedBy='') and CountryId = ${countryId} and CompanyId=${CompanyId} ${noOfGroupShow}`;
  return await asyncDML({ qry });
};

/**
 * @author "Parth Suthar"
 */
const stateSaveData = async ({ data, operationType }) => {
  const qry = `SET @op_IsSuccess = 0;SET @op_Flag = 0; CALL SaveStateMaster('${data}',${operationType},@op_IsSuccess, @op_Flag);SELECT @op_IsSuccess, @op_Flag;`;
  return await asyncDML({ qry });
};

module.exports = {
  stateGetData,
  stateSaveData
};
