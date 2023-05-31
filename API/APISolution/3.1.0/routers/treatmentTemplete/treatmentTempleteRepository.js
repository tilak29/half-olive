const { asyncDML } = require("../../../dbutils");
/**
 * @author "Vishal Thakkar"
 */
const getTreatment = async ({ TreatmentId }) => {
//   const qry = ` 
//   DECLARE @p_Data NVARCHAR(MAX) = '${TreatmentId}'   
//   select distinct
// 	CONCAT ('[',
// 	STUFF
// 	(
// 		(
// 			select ',' + CONVERT(VARCHAR(MAX),TreatmentID) from Treatmentmaster cross apply dbo.split(DiseaseId,',') 
// 			where SplitValue in (select SplitValue from dbo.Split(@p_Data,','))
// 			and DeletedBy is null and IsActive= 1
// 			for xml path('')
// 		),1,1,''
// 	),']' )treatmentId from Treatmentmaster
//   `;
const qry=`DECLARE @p_Data NVARCHAR(MAX) = '${TreatmentId}'   
select distinct
	CONCAT ('[',
	STUFF
	(
		(
			select ',' + CONVERT(VARCHAR(MAX),TreatmentID) from Treatmentmaster cross apply dbo.split(DiseaseId,',') 
			where SplitValue in (select SplitValue from dbo.Split(@p_Data,','))
			and DeletedBy is null and IsActive= 1
			for xml path('')
		),1,1,''
	),']' )treatmentId,
	CONCAT ('[',
	STUFF
	(
		(
			select ',' + CONVERT(VARCHAR(MAX),DietId) from dietmaster cross apply dbo.split(DiseaseId,',') 
			where SplitValue in (select SplitValue from dbo.Split(@p_Data,','))
			and DeletedBy is null and IsActive= 1
			for xml path('')
		),1,1,''
	),']' )dietId
	from Treatmentmaster`;
  return await asyncDML({ qry });

  // const qry=`
  //      select TreatmentName as label,TreatmentID as value from Treatmentmaster WHERE DeletedBy IS NULL AND IsActive = 1 ORDER BY TreatmentName asc`;
  // return await asyncDML({qry})
};

const getTreatmentdetail = async () => {
  const qry=`
    select TreatmentName as label,TreatmentID as value from Treatmentmaster WHERE DeletedBy IS NULL AND IsActive = 1 ORDER BY TreatmentName asc`;
  return await asyncDML({qry})
}
/**
 * @author "Vishal Thakkar"
 */
const getDiet = async ({ TreatmentId }) => {
  // const qry = `DECLARE @p_Data NVARCHAR(MAX) = '${TreatmentId}'
  //    select DM.DietName as label,DM.DiseaseId ,DM.DiseaseId,DM.DietId as value from dietmaster as DM join dbo.Split(@p_Data,',') as Sp on DM.DiseaseId = Sp.SplitValue and  (DeletedBy is null or DeletedDate= '') and IsActive = 1 order by DietName asc`;
  // return await asyncDML({ qry });

  const qry = `select DietName  as label,DietId as value from dietmaster WHERE DeletedBy IS NULL AND IsActive = 1 ORDER BY DietName asc`
  return await asyncDML({ qry });
};
/**
 * @author "Vishal Thakkar"
 */
const getDiseaseList = async ({ filterStatus, filterCategory }) => {
  const qry = `
    Select distinct tm.TreatmentTempleteId,tm.TemplateName,dm.DiseaseName,tm.Description,
    (CASE WHEN tm.IsActive=1 THEN 'YES' ELSE 'NO' END)'Active',tm.IsActive,
	  concat('[',
        STUFF(
        (
          select ',' + CONVERT(VARCHAR(MAX),TTD.DietId) from TreatmentTempleteDiet as TTD
          where TTD.TreatmentTempleteId = tm.TreatmentTempleteId and TTD.DeletedBy is Null
          for xml path('')
        ),1,1,''),']')
        dietId,
        concat('[',
        STUFF(
        (
          select ',' + CONVERT(VARCHAR(MAX),TTT.TreatmentID) from TreatmentTempleteTreatment as TTT
          where TTT.TreatmentTempleteId = tm.TreatmentTempleteId and TTT.DeletedBy is Null
          for xml path('')
        ),1,1,''),']')
        treatmentId,
          concat('[',
        STUFF(
        (
          select ',' + CONVERT(VARCHAR(MAX),TTD.DiseaseId) from TreatmentTempleteDisease as TTD
          where TTD.TreatmentTempleteId = tm.TreatmentTempleteId and TTD.DeletedBy is Null
          for xml path('')
        ),1,1,''),']')
        diseaseId
        from TreatmentTempleteMaster tm
        JOIN TreatmentTempleteDisease td ON tm.TreatmentTempleteId=td.TreatmentTempleteId
        JOIN diseaseMaster dm ON dm.DiseaseId=td.DiseaseId
        WHERE 
        ${filterStatus} IS NULL OR tm.IsActive = ${filterStatus}
          AND tm.DeletedBy IS NULL
          AND (${filterCategory} IS NULL OR dm.DiseaseId  = ${filterCategory})
          AND td.DeletedBy IS NULL`;
  return await asyncDML({ qry });
};
/**
 * @author "Vishal Thakkar"
 */
const gettempleteDiseaseCategories = async () => {
  const qry = `
      select distinct td.DiseaseId AS Value,dm.DiseaseName AS Label from TreatmentTempleteDisease td
      JOIN  diseaseMaster dm on dm.DiseaseId=td.DiseaseId
      where td.DeletedBy IS NULL ORDER BY dm.DiseaseName`;
  return await asyncDML({ qry });
};
/**
 * @author "Vishal Thakkar"
 */
const saveTemplete = async ({ data }) => {
  var jsdata = JSON.parse(data);

  const qry = `
    IF EXISTS(SELECT 'True' FROM TreatmentTempleteMaster WHERE TemplateName= '${jsdata.templateName}' and DeletedBy is null)
    BEGIN
      SELECT Count= 1
    END
    ELSE
    BEGIN
      SELECT Count= 0
      INSERT INTO [dbo].[TreatmentTempleteMaster]
        (
        [TemplateName]
        ,[Description]
        ,[IsActive]
        ,[CreatedBy]
        ,[CreatedDate])
    VALUES
        ('${jsdata.templateName}'
        ,'${jsdata.description}'
        ,${jsdata.isActive}
        ,${jsdata.loggedInUserId}
        ,GETDATE())

    DECLARE @treatmentdietid_Data NVARCHAR(MAX) = '${jsdata.dietId}'
    declare @data int
    set @data = (select top(1) TreatmentTempleteId from TreatmentTempleteMaster where DeletedBy is null order by TreatmentTempleteId desc)
    INSERT INTO [dbo].[TreatmentTempleteDiet]
               ([DietId]
               ,[TreatmentTempleteId]
               ,[CreatedBy]
               ,[CreatedDate]
               )
        SELECT 
        SplitValue,
        @data,
        ${jsdata.loggedInUserId},
          GETDATE() 
      from dbo.Split(@treatmentdietid_Data,',')


    DECLARE @treatmentdiseaseid NVARCHAR(MAX) = '${jsdata.diseaseId}'
    INSERT INTO [dbo].[TreatmentTempleteDisease]
               ([DiseaseId]
               ,[TreatmentTempleteId]
               ,[CreatedBy]
               ,[CreatedDate]
               )
       SELECT 
            SplitValue,
            @data
          ,${jsdata.loggedInUserId}
          ,GETDATE() 
      from dbo.Split(@treatmentdiseaseid,',')
  
    
    DECLARE @treatmentid NVARCHAR(MAX) = '${jsdata.treatmentId}'
    INSERT INTO [dbo].[TreatmentTempleteTreatment]
               ([TreatmentID]
               ,[TreatmentTempleteId]
               ,[CreatedBy]
               ,[CreatedDate]
               )
       SELECT 
          SplitValue
          ,@data
          ,${jsdata.loggedInUserId}
          ,GETDATE() 
      from dbo.Split(@treatmentid,',')
    GO
END`;
  return await asyncDML({ qry });
};
/**
 * @author "Vishal Thakkar"
 */
const updatetemplete = async ({ data }) => {
  var jsdata = JSON.parse(data);

  const qry = `
  UPDATE [dbo].[TreatmentTempleteMaster]
    SET [TemplateName] = '${jsdata.templateName}'
       ,[Description] = '${jsdata.description}'
       ,[IsActive] = ${jsdata.isActive}
       ,[UpdatedBy] = ${jsdata.loggedInUserId}
       ,[UpdatedDate] = GETDATE()
  WHERE TreatmentTempleteId=${jsdata.treatmentTempleteId}
      
DECLARE @DietId NVARCHAR(MAX) = '${jsdata.dietId}'
INSERT INTO [dbo].[TreatmentTempleteDiet]
           ([DietId]
           ,[TreatmentTempleteId]
          ,[CreatedBy]
           ,[CreatedDate]
           )
select SplitValue,${jsdata.treatmentTempleteId},${jsdata.loggedInUserId},getdate() 
FROM 		   (
select SplitValue from dbo.Split(@DietId,',')
EXCEPT
select DietId from TreatmentTempleteDiet where TreatmentTempleteId=${jsdata.treatmentTempleteId} and DeletedBy is null
)as data

update TreatmentTempleteDiet set DeletedBy=${jsdata.loggedInUserId} , DeletedDate=GETDATE() where TreatmentTempleteId=${jsdata.treatmentTempleteId} and DietId in(
select DietId from TreatmentTempleteDiet where TreatmentTempleteId=${jsdata.treatmentTempleteId} and DeletedBy is null
except
select SplitValue from dbo.Split(@DietId,',')
)

DECLARE @DiseaseId NVARCHAR(MAX) = '${jsdata.diseaseId}'
    INSERT INTO [dbo].[TreatmentTempleteDisease]
               ([DiseaseId]
               ,[TreatmentTempleteId]
              ,[CreatedBy]
               ,[CreatedDate]
               )
    select SplitValue,${jsdata.treatmentTempleteId},${jsdata.loggedInUserId},getdate() 
    FROM 		   (
    select SplitValue from dbo.Split(@DiseaseId,',')
    EXCEPT
    select DiseaseId from TreatmentTempleteDisease where TreatmentTempleteId=${jsdata.treatmentTempleteId} and DeletedBy is null
    )as data

    update TreatmentTempleteDisease set DeletedBy=${jsdata.loggedInUserId} , DeletedDate=GETDATE() where TreatmentTempleteId=${jsdata.treatmentTempleteId} and DiseaseId in(
    select DiseaseId from TreatmentTempleteDisease where TreatmentTempleteId=${jsdata.treatmentTempleteId} and DeletedBy is null
    except
    select SplitValue from dbo.Split(@DiseaseId,',')
    )
 
	DECLARE @TreatmentID NVARCHAR(MAX) = '${jsdata.treatmentId}'
  INSERT INTO [dbo].[TreatmentTempleteTreatment]
             ([TreatmentID]
             ,[TreatmentTempleteId]
            ,[CreatedBy]
             ,[CreatedDate]
             )
  select  SplitValue,${jsdata.treatmentTempleteId},${jsdata.loggedInUserId},getdate() 
  FROM 		   (
  select SplitValue from dbo.Split(@TreatmentID,',')
  EXCEPT
  select TreatmentID from TreatmentTempleteTreatment where TreatmentTempleteId=${jsdata.treatmentTempleteId} and DeletedBy is null
  )as data

  update TreatmentTempleteTreatment set DeletedBy=${jsdata.loggedInUserId} , DeletedDate=GETDATE() where TreatmentTempleteId=${jsdata.treatmentTempleteId} and TreatmentID in(
  select TreatmentID from TreatmentTempleteTreatment where TreatmentTempleteId=${jsdata.treatmentTempleteId} and DeletedBy is null
  except
  select SplitValue from dbo.Split(@TreatmentID,',')
  )
  
  `;
  return await asyncDML({ qry });
};
/**
 * @author "Vishal Thakkar"
 */
const deletetemplete = async ({ data }) => {
  const qry = `UPDATE [dbo].[TreatmentTempleteMaster]
  SET [DeletedBy] = ${data.loggedInEmployeeId}      
     ,[DeletedDate] = GETDATE()
WHERE TreatmentTempleteId = ${data.TreatmentTempleteId}

UPDATE [dbo].[TreatmentTempleteDiet]
  SET [DeletedBy] = ${data.loggedInEmployeeId}      
     ,[DeletedDate] = GETDATE()
WHERE TreatmentTempleteId = ${data.TreatmentTempleteId}

UPDATE [dbo].[TreatmentTempleteDisease]
  SET [DeletedBy] = ${data.loggedInEmployeeId}      
     ,[DeletedDate] = GETDATE()
WHERE TreatmentTempleteId = ${data.TreatmentTempleteId}

UPDATE [dbo].[TreatmentTempleteTreatment]
  SET [DeletedBy] = ${data.loggedInEmployeeId}      
     ,[DeletedDate] = GETDATE()
WHERE TreatmentTempleteId = ${data.TreatmentTempleteId}`;
  return await asyncDML({ qry });
};
module.exports = {
  getDiet,
  getTreatment,
  getTreatmentdetail,
  saveTemplete,
  getDiseaseList,
  gettempleteDiseaseCategories,
  updatetemplete,
  deletetemplete,
};
