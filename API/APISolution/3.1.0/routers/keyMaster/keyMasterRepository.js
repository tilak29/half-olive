const { asyncDML } = require("../../../dbutils");

const getKeyMaster = async ({ filterStatus }) => {
  filterStatus = filterStatus ? filterStatus : null;
  const qry = `SELECT km.KeyId, km.KeyNo,
            (CASE WHEN km.IsActive = 1 THEN 'Yes' ELSE 'No' END) 'Active',
            km.Description,km.IsActive
            FROM keymaster km
            WHERE km.DeletedBy IS NULL
            AND (${filterStatus} IS NULL OR km.IsActive = ${filterStatus})`;
  return await asyncDML({ qry });
};
const saveKeyMaster = async ({ data, operationType }) => {
  var jsdata = JSON.parse(data);
  var qry = "";
  if (operationType == 0) {
    qry = `INSERT INTO [dbo].[keymaster]
           ([KeyNo],[Description],[IsActive],[CreatedBy],[CreatedDate])
           VALUES('${jsdata.keyNo}','${jsdata.description}',${jsdata.isActive},'${jsdata.loggedInReferenceId}',GETDATE())`;
  } else if (operationType == 1) {
    qry = `
    UPDATE [dbo].[keymaster]
       SET [keyNo] = '${jsdata.keyNo}'
          ,[Description] = '${jsdata.description}'   
          ,[IsActive] = ${jsdata.isActive}
          ,[UpdatedBy] = ${jsdata.loggedInReferenceId}      
          ,[UpdatedDate] = GETDATE()
     WHERE KeyId = ${jsdata.keyId}`;
  }
  return await asyncDML({ qry });
};
module.exports = {
  getKeyMaster,
  saveKeyMaster,
};
