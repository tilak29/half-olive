const { asyncDML } = require("../../../dbutils");
const { EncryptionDecryptionKey, CompanyId } = require("../../../Config.json");

/**
 * @author "Dileep Lohar"
 */

const saveTreatmentMaster = async ({ data }) => {
  var jsdata = JSON.parse(data);
  const qry = `IF EXISTS(SELECT 'True' FROM Treatmentmaster WHERE TreatmentName= '${jsdata.TreatmentName}' and DeletedBy is null and CompanyId=${CompanyId} )
  BEGIN
    SELECT Count= 1
  END
  ELSE
  BEGIN
    SELECT Count= 0
    INSERT INTO [dbo].[Treatmentmaster]
      ([IsActive]
      ,[CompanyId]
      ,[DiseaseId]
      ,[EmployeeId]
      ,[StartTime]
      ,[EndTime]
      ,[TreatmentName]
      ,[CreatedBy]
      ,[CreatedDate])
  VALUES
      (${jsdata.Status}
      ,${CompanyId}
      ,'${jsdata.Disease}'
      ,'${jsdata.EmployeeId}'
      ,'${jsdata.StartTime}'
      ,'${jsdata.EndTime}'
      ,'${jsdata.TreatmentName}'
      ,${jsdata.loggedInUserId}
      ,GETDATE())
  END`;
  return await asyncDML({ qry });
};
// const saveTreatmentMaster = async ({ data }) => {
//   console.log("data :: ",data);
//   var jsdata = JSON.parse(data);
//   const qry = `IF EXISTS(SELECT 'True' FROM Treatmentmaster WHERE TreatmentName= '${jsdata.TreatmentName}' and DiseaseId= ${jsdata.Disease} and DeletedBy is null)
//   BEGIN
//     SELECT Count= 1
//   END
//   ELSE
//   BEGIN
//     SELECT Count= 0
//     INSERT INTO [dbo].[Treatmentmaster]
//       ([IsActive]
//       ,[DiseaseId]
//       ,[EmployeeId]
//       ,[StartTime]
//       ,[EndTime]
//       ,[TreatmentName]
//       ,[CreatedBy]
//       ,[CreatedDate])
//   VALUES
//       (${jsdata.Status}
//       ,'${jsdata.Disease}'
//       ,'${jsdata.EmployeeId}'
//       ,'${jsdata.StartTime}'
//       ,'${jsdata.EndTime}'
//       ,'${jsdata.TreatmentName}'
//       ,${jsdata.loggedInUserId}
//       ,GETDATE())
//   END`;
//   return await asyncDML({ qry });
// };

const updateTreatmentmaster = async ({ data }) => {
  var jsdata = JSON.parse(data)
  var qry = `
          UPDATE [dbo].[Treatmentmaster]
          SET [IsActive] = ${jsdata.Status}
          ,[StartTime] = '${jsdata.StartTime}'
          ,[EndTime] = '${jsdata.EndTime}'
          ,[EmployeeId] = '${jsdata.EmployeeId}'
          ,[DiseaseId] = '${jsdata.Disease}'
          ,[TreatmentName] = '${jsdata.TreatmentName}'
          ,[UpdatedBy] = ${jsdata.loggedInUserId}
          ,[UpdatedDate] = GETDATE()
          WHERE TreatmentID = ${jsdata.treatmentid} and CompanyId=${CompanyId} `;
  return await asyncDML({ qry });
}

const getTreatmentmaster = async ({bodyData}) => {

  const qry =
    ` select tm.TreatmentID,DiseaseName,FullName,tm.StartTime,tm.EndTime,tm.IsActive,tm.TreatmentName,'['+tm.DiseaseId+']' as DiseaseId,'['+tm.EmployeeId+']' as EmployeeId
    from Treatmentmaster tm
    inner join
    (
   SELECT  
       TreatmentID,
        DiseaseName = STUFF(
             (SELECT ', '+ CONVERT(VARCHAR(MAX),DS.DiseaseName)
               FROM diseaseMaster DS								
               WHERE DS.DiseaseId IN (SELECT SplitValue FROM dbo.Split(TM.DiseaseId,',') )								
               FOR XML PATH(''))
           ,1,1,''),	 
           FullName = STUFF(
            (SELECT ', '+ CONVERT(VARCHAR(MAX),FirstName + ' '+ LastName)
              FROM employeemaster EM								
              WHERE EM.EmployeeId IN (SELECT SplitValue FROM dbo.Split(TM.EmployeeId,',') )								
              FOR XML PATH(''))
          ,1,1,'')  
    FROM [Wellness].[dbo].[Treatmentmaster] TM
    )as data on tm.TreatmentID = data.TreatmentID
     where (tm.DeletedBy is null	or tm.DeletedDate= '' ) 
    and tm.IsActive in (${bodyData.Status}) and tm.CompanyId=${CompanyId} ORDER BY TM.CreatedDate DESC `;
  return await asyncDML({ qry });
}
// const getTreatmentmaster = async ({bodyData}) => {

//   const qry =
//     `select 
//     TM.EmployeeId,    
//     TM.TreatmentID,
//     TM.DiseaseId,
//     TM.StartTime,
//     TM.EndTime,
//     TM.IsActive,
//     TM.TreatmentName,
// 	  DS.DiseaseName,
	// FullName = STUFF(
	// 						(SELECT ', '+ CONVERT(VARCHAR(MAX),FirstName + ' '+ LastName)
	// 							FROM employeemaster EM								
	// 							WHERE EM.EmployeeId IN (SELECT SplitValue FROM dbo.Split(TM.EmployeeId,',') )								
	// 							FOR XML PATH(''))
	// 					,1,1,'')
//     from Treatmentmaster TM
// 	 join diseaseMaster DS ON TM.DiseaseId = DS.DiseaseId
// 	where (TM.DeletedBy is null	or TM.DeletedDate= '' ) and TM.IsActive in (${bodyData.Status}) and TM.CompanyId=${CompanyId} 
//    ORDER BY TM.CreatedDate DESC`;
//   return await asyncDML({ qry });
// }

const deleteTreatmentmaster = async ({data}) => {
  const qry =
    `UPDATE [dbo].[Treatmentmaster]
    SET [DeletedBy] = ${data.loggedInEmployeeId}
        ,[DeletedDate] = GETDATE()
    WHERE TreatmentID = ${data.TreatmentID} and CompanyId=${CompanyId}`;
  return await asyncDML({ qry });
}

const getAllDisease = async () => {
  const qry =
  `SELECT DiseaseId as value,DiseaseName as label
  from diseaseMaster where (DeletedBy is null or DeletedDate= '') and IsActive = 1 and CompanyId=${CompanyId}
  order by DiseaseName asc`;
return await asyncDML({ qry });
}

module.exports = { getTreatmentmaster, saveTreatmentMaster, updateTreatmentmaster,deleteTreatmentmaster,getAllDisease }