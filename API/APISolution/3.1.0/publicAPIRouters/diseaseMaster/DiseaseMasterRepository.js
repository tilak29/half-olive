const { asyncDML } = require("../../../dbutils");

/**
 * @author "Dileep Lohar"
 */

const getDiseaseMaster = async ({ filterStatus }) => {
  const qry = `SELECT dm.DiseaseId, dm.DiseaseName, dm.Description,
        (CASE WHEN dm.IsActive = 1 THEN 'Yes' ELSE 'No' END) 'Active',dm.IsActive 
        FROM diseaseMaster dm
        WHERE dm.DeletedBy IS NULL  
        AND (${filterStatus} IS NULL OR dm.IsActive = ${filterStatus})`;
  return await asyncDML({ qry });
};

const saveDiseaseList = async ({ data, operationType }) => {
  console.log("data :::: ",data);
  var jsdata = JSON.parse(data);
  var qry = '';
  
  if (operationType == 0) {
    
    qry = `
    IF(NOT EXISTS(SELECT  1 FROM [guestHealthDetails] WHERE DiseaseId='${jsdata.diseaseId}'))
    IF(NOT EXISTS(SELECT  1 FROM [healthHistoryDetails] WHERE GuestId=${jsdata.guestId}))
    INSERT INTO [dbo].[healthHistoryDetails]
    (
     [GuestId]
    ,[Comments]
    ,[CreatedBy]
    ,[CreatedDate])
VALUES
    ('${jsdata.guestId}'
    ,'${jsdata.comments}'
    ,'${jsdata.guestId}'
    ,GETDATE())
    Declare @value nvarchar(max) = '${jsdata.diseaseId}';
    insert into [guestHealthDetails]
    (DiseaseId,GuestId,CreatedBy,CreatedDate)
    select SplitValue,'${jsdata.guestId}',${jsdata.guestId},GETDATE() FROM
    (
      select SplitValue
      from dbo.split(@value,',')
      except
      select DiseaseId from [guestHealthDetails] where DeletedBy is null
      and GuestId=${jsdata.guestId}
      )as data
      Update [guestHealthDetails]
    set [DeletedBy] = ${jsdata.guestId},
      [DeletedDate] = GETDATE() 
    Where DeletedBy is null
    and [GuestId]=${jsdata.guestId} AND [DiseaseId] in (
    select DiseaseId from [guestHealthDetails] where DeletedBy is null
    and [GuestId]=${jsdata.guestId}
    except
    select SplitValue
    from dbo.split(@value,','))  
    Update [healthHistoryDetails]
    set  [Comments] = '${jsdata.comments}',
    [UpdatedBy] = ${jsdata.guestId},
      [UpdatedDate] = GETDATE() 
    Where GuestId = ${jsdata.guestId}
    `;
  }

  return await asyncDML({ qry });
}

module.exports = {
  getDiseaseMaster,
  saveDiseaseList,

};
