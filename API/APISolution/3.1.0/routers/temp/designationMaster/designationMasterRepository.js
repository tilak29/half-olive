const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");

/**
 * @author "Parth Suthar"
 */
const designationGetData = async ({ noOfGroupShow }) => {
  const qry = `SELECT * FROM designationmaster WHERE DeletedBy is null AND IsRetailer IS NULL and CompanyId=${CompanyId} ${noOfGroupShow}`;
  return await asyncDML({ qry });
};

/**
 * @author "Parth Suthar"
 */
const designationSaveData = async ({ data, operationType }) => {
  const qry = `SET @op_IsSuccess = 0;SET @op_Flag = 0; 
  CALL SaveDesignationMaster('${data}',${operationType},@op_IsSuccess, @op_Flag);SELECT @op_IsSuccess, @op_Flag;`;
  return await asyncDML({ qry });
};

module.exports = {
  designationGetData,
  designationSaveData
};
