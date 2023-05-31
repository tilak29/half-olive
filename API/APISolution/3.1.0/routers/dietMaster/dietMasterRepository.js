const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");
const js2xml = require("js2xml").Js2Xml

/**
 * @author "Vishal Thakkar"
 */
const getDietMaster = async ({ rowData, filterStatus }) => {
  const qry = `DECLARE @abc nvarchar(max) ='${rowData.DiseaseId}'
               SELECT DISTINCT tm.DietId,tm.DietName,td.DiseaseName,tm.Description,
                (CASE WHEN tm.IsActive=1 THEN 'YES' ELSE 'NO' END)'Active',tm.IsActive,
	              concat('[',
                    STUFF(
                    (
                      select ',' + CONVERT(VARCHAR(MAX),TTD.DiseaseId) from diseaseMaster as TTD
                      where TTD.DiseaseId = tm.DiseaseId and TTD.DeletedBy is Null
                      for xml path('')
                    ),1,1,''),']')
                    DiseaseId
                FROM dietmaster tm
                JOIN diseaseMaster td ON tm.DiseaseId=td.DiseaseId
                WHERE ${filterStatus} IS NULL OR tm.IsActive = ${filterStatus}
                      AND tm.DeletedBy IS NULL
                      AND (td.DiseaseId  in (select SplitValue from dbo.Split(@abc,',')))
                      AND td.DeletedBy IS NULL`
  return await asyncDML({ qry });
};

/**
 * @author "Vishal Thakkar"
 * @author "Bhargav Bhagiya"
 */
const saveDietMaster = async ({ data }) => {
  var jsdata = JSON.parse(data);
  const AddMealData = jsdata.dietMealData;
  const AddMealDataXML = new js2xml("ArrayOfMealType", AddMealData);
  if (jsdata.dietMealData.length != 0) {
    const qry = `IF EXISTS(SELECT 1 FROM  [dbo].[dietmaster] WHERE [DietName] = '${jsdata.dietName}' AND DeletedBy IS NULL)
           BEGIN
             SELECT Count= 1
           END
           ELSE
           BEGIN
             SELECT Count= 0
             DECLARE @value nvarchar(max) = '${jsdata.DiseaseId}';
             INSERT INTO [dbo].[dietmaster]
             ([CompanyId],[DiseaseId],[DietName],[Description],[isActive],[CreatedBy],[CreatedDate])
             SELECT ${CompanyId},SplitValue,'${jsdata.dietName}','${jsdata.description}','${jsdata.isActive}','${jsdata.loggedInReferenceId}',GETDATE()
             FROM dbo.split(@value,',') 
           
             DECLARE @DietId INT = (SELECT TOP(1) DietId FROM dietmaster ORDER BY DietId DESC)
             DECLARE @MealTypeDataXML XML
             SET @MealTypeDataXML ='${AddMealDataXML}'
           
               DECLARE @MealTypeData AS TABLE
               (
                  value int,
                  menu nvarchar(3000)
               )
               INSERT INTO @MealTypeData
               SELECT 
                   d.v.value('value[1]','int'),
                   d.v.value('menu[1]','nvarchar(3000)')
               FROM @MealTypeDataXML.nodes('/ArrayOfMealType/item') d(v)
               INSERT INTO [dbo].[DietMealMaster]
                        ([CompanyId]
                        ,[DietId]
                        ,[MealTypeId]
                        ,[Menu]
                        ,[LatestRecord]
                        ,[CreatedBy]
                        ,[CreatedDate])
               SELECT ${CompanyId},@DietId,value,menu,1,${jsdata.loggedInReferenceId},GETDATE() FROM(SELECT value,menu FROM @MealTypeData) AS DATA
           END `
    return await asyncDML({ qry });
  }
  else {
    const qry = `IF EXISTS(SELECT 1 FROM  [dbo].[dietmaster] WHERE [DietName] = '${jsdata.dietName}' AND DeletedBy IS NULL)
    BEGIN
      SELECT Count= 1
    END
    ELSE
    BEGIN
      SELECT Count= 0
      DECLARE @value nvarchar(max) = '${jsdata.DiseaseId}';
      INSERT INTO [dbo].[dietmaster]
      ([CompanyId],[DiseaseId],[DietName],[Description],[isActive],[CreatedBy],[CreatedDate])
      SELECT ${CompanyId},SplitValue,'${jsdata.dietName}','${jsdata.description}','${jsdata.isActive}','${jsdata.loggedInReferenceId}',GETDATE()
      FROM dbo.split(@value,',')  
      END`
    return await asyncDML({ qry });
  }
};

/**
 * @author "Vishal Thakkar"
 * @author "Bhargav Bhagiya"
 */
const updateDietMaster = async ({ data }) => {
  var jsdata = JSON.parse(data);
  const UpdateMealData = jsdata.dietMealData;
  const UpdateMealDataXML = new js2xml("ArrayOfMealType", UpdateMealData);
  const qry = `DECLARE @abc nvarchar(max) ='${jsdata.DiseaseId}'
              INSERT INTO [dbo].[dietmaster]
                       ([CompanyId],
                        [DiseaseId],
                        [DietName],
                        [Description],
                        [isActive],
                        [CreatedBy],
                        [CreatedDate])
              SELECT '${CompanyId}', SplitValue,'${jsdata.dietName}','${jsdata.description}','${jsdata.isActive}','${jsdata.loggedInReferenceId}',GETDATE() 
              FROM(
              SELECT SplitValue FROM dbo.Split(@abc,',')
              EXCEPT
              SELECT DiseaseId FROM dietmaster WHERE DietName='${jsdata.dietName}' AND DeletedBy IS NULL
              )AS DATA
              UPDATE [dbo].[dietmaster]
              SET [DeletedBy] = '${jsdata.loggedInReferenceId}'   
                 ,[DeletedDate] = GETDATE()
              WHERE DietName='${jsdata.dietName}' AND DiseaseId IN (
              SELECT DiseaseId FROM dietmaster WHERE DietName='${jsdata.dietName}' AND DeletedBy IS NULL
              EXCEPT
              SELECT SplitValue FROM dbo.Split(@abc,','))

               DECLARE @TodayDate SMALLDATETIME = (SELECT CONVERT(varchar(10),GETDATE(),111))
               DECLARE @CreatedDate NVARCHAR(max) = (SELECT TOP(1) CONVERT(varchar(10),CreatedDate,111) AS CREATED_DATE FROM DietMealMaster WHERE DietId=${jsdata.dietId} AND LatestRecord = 1 AND DeletedBy IS NULL)
 
               IF(@CreatedDate = @TodayDate)
               BEGIN
                  DECLARE @MealTypeDataXML XML
                  SET @MealTypeDataXML ='${UpdateMealDataXML}'

                  DECLARE @MealTypeData AS TABLE(value INT,menu NVARCHAR(3000))
                  INSERT INTO @MealTypeData
                  SELECT 
                    d.v.value('value[1]','int'),
                    d.v.value('menu[1]','nvarchar(3000)')
                  FROM @MealTypeDataXML.nodes('/ArrayOfMealType/item') d(v)

                  UPDATE DMM
                  SET	 Menu=MTD.menu,
                       LatestRecord = 1,
                       Updatedby= ${jsdata.loggedInReferenceId},
                       UpdatedDate= GETDATE()
                  FROM DietMealMaster DMM 
                  INNER JOIN @MealTypeData MTD ON DMM.MealTypeId = MTD.value
                  AND DMM.DietId=${jsdata.dietId} AND DMM.MealTypeId = MTD.value AND DMM.LatestRecord=1
               END
               ELSE
               BEGIN
                  UPDATE DietMealMaster SET LatestRecord = 0,UpdatedBy=${jsdata.loggedInReferenceId},UpdatedDate=GETDATE()
                  WHERE DietId = ${jsdata.dietId} AND DeletedBy IS NULL

                  DECLARE @UpdateMealTypeDataXML XML
                  SET @UpdateMealTypeDataXML ='${UpdateMealDataXML}'

                  DECLARE @UpdateMealTypeData AS TABLE
                  (
                    value int,
                    menu nvarchar(3000)
                  )
                  INSERT INTO @UpdateMealTypeData
                  SELECT 
                    d.v.value('value[1]','int'),
                    d.v.value('menu[1]','nvarchar(3000)')
                  FROM @UpdateMealTypeDataXML.nodes('/ArrayOfMealType/item') d(v)
                  INSERT INTO [dbo].[DietMealMaster]
                  ([CompanyId]
                  ,[DietId]
                  ,[MealTypeId]
                  ,[Menu]
                  ,[LatestRecord]
                  ,[CreatedBy]
                  ,[CreatedDate])
                  SELECT ${CompanyId},${jsdata.dietId},value,menu,1,${jsdata.loggedInReferenceId},GETDATE() FROM(SELECT value,menu FROM @UpdateMealTypeData) AS DATA
               END`;
  return await asyncDML({ qry });
};

/**
 * @author "Vishal Thakkar"
 */
const getDelete = async (bodyData) => {
  const qry = ` UPDATE [dbo].[dietmaster]
                SET
                   [DeletedBy] = ${bodyData.loggedInReferenceId}      
                  ,[DeletedDate] = GETDATE()
                WHERE dietId = ${bodyData.dietId} AND CompanyId=${CompanyId}

                UPDATE [dbo].[DietMealMaster]
                SET [LatestRecord] = 0
	                 ,[DeletedBy] = ${bodyData.loggedInReferenceId}
                   ,[DeletedDate] = GETDATE()
                WHERE DietId = ${bodyData.dietId} AND LatestRecord = 1 AND CompanyId = ${CompanyId}`;
  return await asyncDML({ qry });
};

/**
 * @author "Vishal Thakkar"
 */
const getDietCategories = async () => {
  const qry = `SELECT DiseaseName AS Label,DiseaseId AS Value FROM diseaseMaster WHERE DeletedBy IS NULL AND IsActive = 1 ORDER BY DiseaseName`;
  return await asyncDML({ qry });
};

/**
 * @author "Bhargav Bhagiya"
 */
const viewMealData = async ({ DietId }) => {
  const qry = `SELECT DM.MealTypeId,SD.StaticName as MealName,DM.Menu from DietMealMaster DM
	             JOIN staticdata SD on SD.StaticId = DM.MealTypeId
	             WHERE DietId = ${DietId} AND LatestRecord = 1 AND DM.DeletedBy IS NUll`
  return await asyncDML({ qry });
};

module.exports = {
  getDietMaster,
  getDietCategories,
  saveDietMaster,
  updateDietMaster,
  getDelete,
  viewMealData
};