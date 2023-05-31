const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");
/**
 * @author "Fahad Shaikh"
 */

const getHealthDisease = async ({ guestId }) => {
  const qry = `
  select distinct GD.GuestId,HHD.Comments,STUFF((
    SELECT ',' + CONVERT(VARCHAR(MAX),GHD.DiseaseId) 
      FROM guestHealthDetails GHD
     WHERE GHD.GuestId = GD.GuestId AND DeletedBy IS NULL
     ORDER BY GHD.GuestId
       FOR XML PATH('')), 1, LEN(','), '') AS DiseaseId from guestdetails as GD  join healthHistoryDetails as HHD
	   on GD.GuestId = HHD.GuestId
	   where GD.GuestId=${guestId} AND CompanyId = ${CompanyId}and GD.DeletedBy is null;
    `;
  return await asyncDML({ qry });
};

/**
 * @author "Fahad Shaikh"
 */

const saveDiseaseList = async ({ data, operationType }) => {
  var jsdata = JSON.parse(data);
  var qry = '';
  if (operationType == 0) {
    qry = `
      Declare @value nvarchar(max) = '${jsdata.diseaseId}';
      IF(NOT EXISTS(SELECT  1 FROM [healthHistoryDetails] WHERE GuestId=${jsdata.guestId}))
      BEGIN
        SELECT Count = 1
            INSERT INTO [dbo].[healthHistoryDetails]
            ([CompanyId]
            ,[GuestId]
            ,[Comments]
            ,[CreatedBy]
            ,[CreatedDate])
          VALUES
            (${CompanyId}
            ,${jsdata.guestId}
            ,'${jsdata.comments}'
            ,${jsdata.loggedInUserId}
            ,GETDATE())

          INSERT INTO [guestHealthDetails]
          (DiseaseId,GuestId,CompanyId,CreatedBy,CreatedDate)
          SELECT SplitValue,${jsdata.guestId},${CompanyId},${jsdata.loggedInUserId},GETDATE() FROM
          (SELECT SplitValue FROM dbo.split(@value,','))AS DATA

      END
      ELSE
      BEGIN
        SELECT Count = 2
        UPDATE healthHistoryDetails
          SET [Comments] = '${jsdata.comments}',
            [UpdatedBy] = ${jsdata.loggedInUserId},
            [UpdatedDate] = GETDATE() 
          where GuestId = ${jsdata.guestId} and DeletedBy is null

          Update [guestHealthDetails]
          set [DeletedBy] = ${jsdata.loggedInUserId},
            [DeletedDate] = GETDATE() 
          Where DeletedBy is null
          and [GuestId]=${jsdata.guestId} AND [DiseaseId] in (
          select DiseaseId from [guestHealthDetails] where DeletedBy is null
          and [GuestId]=${jsdata.guestId}
          except
          select SplitValue
          from dbo.split(@value,',')
        )  

        INSERT INTO [guestHealthDetails]
          (DiseaseId,GuestId,CompanyId,CreatedBy,CreatedDate)
          SELECT SplitValue,${jsdata.guestId},${CompanyId},${jsdata.loggedInUserId},GETDATE() FROM
          (
            select SplitValue
            from dbo.split(@value,',')
            except
            select DiseaseId from [guestHealthDetails] where DeletedBy is null
            and GuestId=${jsdata.guestId}
            )as data
      END
    `;
  }

  return await asyncDML({ qry });
}
module.exports = {
  getHealthDisease,
  saveDiseaseList,
};