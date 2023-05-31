const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");


/**
 * @author "Fahad Shaikh"
 */

const getTherapySlot = async ({ filterStatus,filterTherapy }) => {
        const qry = `SELECT tsm.TherapySlotId,ttm.TypeName,tsm.type,tsm.Capacity,tsm.StartTime,tsm.EndTime,
        (CASE WHEN tsm.IsActive = ${filterStatus} THEN 'Yes' ELSE 'No' END) 'Active',tsm.IsActive 
        FROM TherapySlotMaster as tsm
        JOIN TherapyTypeMaster as ttm ON tsm.Type=ttm.TherapyId
        WHERE tsm.CompanyId= ${CompanyId} AND tsm.DeletedBy IS NULL  
        AND (${filterStatus} IS NULL OR tsm.IsActive = ${filterStatus}) AND (${filterTherapy} IS NULL OR tsm.Type = ${filterTherapy} )`;
    return await asyncDML({ qry });
};
const getTherapyCategory = async () => {
        const qry = `SELECT TherapyId as Value,TypeName as Label FROM TherapyTypeMaster WHERE CompanyId= ${CompanyId} AND DeletedBy IS NULL AND IsActive = 1 Order By TypeName`;
    return await asyncDML({ qry });
};

/**
 * @author "Fahad Shaikh"
 */

const saveTherapySlot = async ({ data, operationType }) => {
    var jsdata = JSON.parse(data);
    var qry = "";
    if (operationType == 0) {
        qry = `
           INSERT INTO [dbo].[TherapySlotMaster]
           ([Type],[CompanyId],[Capacity],[StartTime],[EndTime],[IsActive],[CreatedBy],[CreatedDate])
           VALUES(${jsdata.typeName},${CompanyId},'${jsdata.capacity}','${jsdata.startTime}','${jsdata.endTime}',${jsdata.isActive},'${jsdata.loggedInReferenceId}',GETDATE())
           `;
    }
     else if (operationType == 1) {
        qry = `
    UPDATE [dbo].[TherapySlotMaster]
       SET [Type] = '${jsdata.typeName}'
          ,[Capacity] = '${jsdata.capacity}'
          ,[StartTime] = '${jsdata.startTime}'
          ,[EndTime] = '${jsdata.endTime}'
          ,[IsActive] = ${jsdata.isActive}
          ,[UpdatedBy] = ${jsdata.loggedInReferenceId}      
          ,[UpdatedDate] = GETDATE()
     WHERE TherapySlotId = ${jsdata.therapySlotId}`;
    }
    else if (operationType == 2) {
        qry = `
    UPDATE [dbo].[TherapySlotMaster]
       SET [DeletedBy] = ${jsdata.loggedInReferenceId}      
          ,[DeletedDate] = GETDATE()
     WHERE TherapySlotId = ${jsdata.therapySlotId}`;
    }
    return await asyncDML({ qry });
};

module.exports = {
    getTherapySlot,
    saveTherapySlot,
    getTherapyCategory
};
