const { asyncDML } = require("../../../dbutils");
const getAmenityMaster = async ({filterStatus}) => {
  const qry = `SELECT am.AmenityId, am.Name,
  (CASE WHEN am.IsActive = 1 THEN 'Yes' ELSE 'No' END) 'Active',am.Description,am.IsActive 
  FROM amenitymaster am
  WHERE am.DeletedBy IS NULL  
  AND (${filterStatus} IS NULL OR am.IsActive = ${filterStatus})`;
  return await asyncDML({ qry });
};
const saveAmenityMaster = async ({data,operationType}) => {
  var jsdata = JSON.parse(data);
  var qry = "";
  if (operationType == 0) {
    qry = `INSERT INTO [dbo].[amenitymaster]
           ([Name],[Description],[IsActive],[CreatedBy],[CreatedDate])
           VALUES('${jsdata.name}','${jsdata.description}',${jsdata.isActive},'${jsdata.loggedInReferenceId}',GETDATE())`;
  } else if (operationType == 1) {
    qry = `
    UPDATE [dbo].[amenitymaster]
       SET [Name] = '${jsdata.name}'
          ,[Description] = '${jsdata.description}'   
          ,[IsActive] = ${jsdata.isActive}
          ,[UpdatedBy] = ${jsdata.loggedInReferenceId}      
          ,[UpdatedDate] = GETDATE()
     WHERE AmenityId = ${jsdata.amenityId}`;
  }
  return await asyncDML({ qry });
};
module.exports = {
  getAmenityMaster,
  saveAmenityMaster,
};
