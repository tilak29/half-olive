const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");


/**
 * @author "Fahad Shaikh"
 */

const getTherapyType = async ({ filterStatus }) => {
    const qry = `
                SELECT TherapyId,TypeName,Amount,EffectiveDate,(CASE WHEN DefaultType = 1 THEN 'Yes' ELSE 'No' END) 'Default',
                    (CASE WHEN IsActive = ${filterStatus} THEN 'Yes' ELSE 'No' END) 'Active'
                    FROM TherapyTypeMaster 
                    WHERE CompanyId= ${CompanyId} AND DeletedBy IS NULL  
                    AND ( ${filterStatus} IS NULL OR IsActive =  ${filterStatus})`;
    return await asyncDML({ qry });
};

/**
 * @author "Fahad Shaikh"
 */

const saveTherapyType = async ({ data, operationType }) => {
    var jsdata = JSON.parse(data);
    var qry = "";
    if (operationType == 0) {
        qry = `
           INSERT INTO [dbo].[TherapyTypeMaster]
           ([CompanyId],[TypeName],[Amount],[EffectiveDate],[IsActive],[DefaultType],[CreatedBy],[CreatedDate])
           VALUES(${CompanyId},'${jsdata.typeName}','${jsdata.amount}','${jsdata.effectiveDate}',${jsdata.isActive},${jsdata.default},'${jsdata.loggedInReferenceId}',GETDATE())
           `;
    } else if (operationType == 1) {
        qry = `
    UPDATE [dbo].[TherapyTypeMaster]
       SET [TypeName] = '${jsdata.typeName}'
          ,[Amount] = '${jsdata.amount}'
          ,[EffectiveDate] = '${jsdata.effectiveDate}'
          ,[Default] = ${jsdata.default}
          ,[IsActive] = ${jsdata.isActive}
          ,[UpdatedBy] = ${jsdata.loggedInReferenceId}      
          ,[UpdatedDate] = GETDATE()
     WHERE TherapyId = ${jsdata.therapyId}`;
    }
    else if (operationType == 2) {
        qry = `
    UPDATE [dbo].[TherapyTypeMaster]
       SET [DeletedBy] = ${jsdata.loggedInReferenceId}      
          ,[DeletedDate] = GETDATE()
     WHERE TherapyId = ${jsdata.therapyId}`;
    }
    return await asyncDML({ qry });
};

module.exports = {
    getTherapyType,
    saveTherapyType,

};
