const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");


/**
 * @author "Fahad Shaikh"
 */

const getDiseaseMaster = async ({ filterStatus }) => {
  const qry = `SELECT dm.DiseaseId, dm.DiseaseName, dm.Description,
  (CASE WHEN dm.IsActive = ${filterStatus} THEN 'Yes' ELSE 'No' END) 'Active',dm.IsActive
  FROM diseaseMaster dm
  WHERE CompanyId= ${CompanyId} AND dm.DeletedBy IS NULL
  AND (${filterStatus} IS NULL OR dm.IsActive = ${filterStatus}) order by DiseaseName asc`;
  return await asyncDML({ qry });
};

/**
 * @author "Fahad Shaikh"
 */

const saveDiseaseMaster = async ({ data, operationType }) => {
  var jsdata = JSON.parse(data);
  var qry = "";
  if (operationType == 0) {
    qry = `IF (NOT EXISTS(SELECT 1 FROM [dbo].[diseaseMaster] WHERE [DiseaseName] = '${jsdata.diseaseName}'))
           INSERT INTO [dbo].[diseaseMaster]
           ([CompanyId],[DiseaseName],[Description],[IsActive],[CreatedBy],[CreatedDate])
           VALUES(${CompanyId},'${jsdata.diseaseName}','${jsdata.description}',${jsdata.isActive},'${jsdata.loggedInReferenceId}',GETDATE())`;
  } else if (operationType == 1) {
    qry = `
    UPDATE [dbo].[diseaseMaster]
       SET [DiseaseName] = '${jsdata.diseaseName}'
          ,[Description] = '${jsdata.description}'
          ,[IsActive] = ${jsdata.isActive}
          ,[UpdatedBy] = ${jsdata.loggedInReferenceId}      
          ,[UpdatedDate] = GETDATE()
     WHERE DiseaseId = ${jsdata.diseaseId}`;
  }
  else if (operationType == 2) {
    qry = `
    UPDATE [dbo].[diseaseMaster]
       SET [DeletedBy] = ${jsdata.loggedInReferenceId}      
          ,[DeletedDate] = GETDATE()
     WHERE DiseaseId = ${jsdata.diseaseId}`;
  }
  return await asyncDML({ qry });
};

module.exports = {
  getDiseaseMaster,
  saveDiseaseMaster,

};
