const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");

/**
 * @author "Parth Suthar"
 */
const divisionGetData = async ({ noOfGroupShow }) => {
  const qry = `SELECT * FROM divisionmaster WHERE DeletedBy is null and CompanyId=${CompanyId} ${noOfGroupShow} ORDER BY IsActive DESC`;
  return await asyncDML({ qry });
};

/**
 * @author "Parth Suthar"
 */
const divisionSaveData = async ({ data, operationType }) => {
  // const qry = `SET @op_IsSuccess = 0;SET @op_Flag = 0; 
  // CALL SaveDivisionMaster('${data}',${operationType},@op_IsSuccess, @op_Flag);SELECT @op_IsSuccess, @op_Flag;`;
  var jsdata = JSON.parse(data);
  var qry = '';
  if (operationType == 0) {
    qry = `INSERT INTO [dbo].[divisionmaster]
           ([CompanyId],[DivisionName],[Description],[IsActive],[FormedDate],[CreatedBy],[CreatedDate])
           VALUES(${jsdata.companyId},'${jsdata.divisionName}','${jsdata.description}',${jsdata.isActive},'${jsdata.formedDate}','${jsdata.loggedInReferenceId}',GETDATE())`;
  }
  else if (operationType == 1) {
    qry = `
    UPDATE [dbo].[divisionmaster]
       SET [DivisionName] = '${jsdata.divisionName}'
          ,[Description] = '${jsdata.description}'
          ,[IsActive] = ${jsdata.isActive}
          ,[FormedDate] = '${jsdata.formedDate}'   
          ,[UpdatedBy] = ${jsdata.loggedInReferenceId}      
          ,[UpdatedDate] = GETDATE()
     WHERE divisionid = ${jsdata.divisionId}`;
  }

  return await asyncDML({ qry });
};

module.exports = {
  divisionGetData,
  divisionSaveData
};
