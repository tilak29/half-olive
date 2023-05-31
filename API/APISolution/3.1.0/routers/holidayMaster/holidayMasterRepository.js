const { asyncDML } = require("../../../dbutils");
const { CompanyId, CountryId } = require("../../../Config.json");

/**
 * @author "Dileep Lohar"
 */
const holidayGetData = async ({  year }) => {
  const qry = `select HolidayId,Name,HolidayDate,Remark from holiday where (DeletedBy is null or DeletedBy='' )  and CompanyId=${CompanyId} and YEAR(HolidayDate)=${year};`;
  return await asyncDML({ qry });
};

const holidaySaveData = async ({ data}) => {
  const qry = `IF EXISTS(SELECT 'True' FROM holiday  
  where ((Name = '${data.holidayName}' and YEAR(HolidayDate)=YEAR('${data.holidayDate}') or HolidayDate='${data.holidayDate}') and DeletedBy is null and DeletedDate is null 
  and CompanyId=${CompanyId}))
  BEGIN
    SELECT Count= 1
  END
  ELSE
  BEGIN
    SELECT Count= 0
    INSERT INTO [dbo].[holiday]
  ([CompanyId]
  ,[Name]
  ,[HolidayDate]
  ,[Remark]
  ,[CreatedBy]
  ,[CreatedDate])
VALUES
  (${CompanyId}
  ,'${data.holidayName}'
  ,'${data.holidayDate}'
  ,'${data.remarks}'
  ,${data.loggedInUserId}
  ,GETDATE())
  END`;
  return await asyncDML({ qry });
};

const holidayUpdateData = async ({ data}) => {
  const qry = `IF EXISTS(SELECT 'True' FROM holiday  
  where (((Name = '${data.holidayName}' or HolidayDate= '${data.holidayDate}') and YEAR(HolidayDate)=YEAR('${data.holidayDate}'))
  and DeletedBy is null and DeletedDate is null and HolidayId != ${data.holidayId}
  and CompanyId=${CompanyId}))
  BEGIN
    SELECT Count= 1
  END
  ELSE
  BEGIN
    SELECT Count= 0
   UPDATE [dbo].[holiday]
   SET [CompanyId] = ${CompanyId}
      ,[Name] = '${data.holidayName}'
      ,[HolidayDate] = '${data.holidayDate}'
      ,[Remark] = '${data.remarks}'
      ,[UpdatedBy] = ${data.loggedInUserId}
      ,[UpdatedDate] = GETDATE()
 WHERE HolidayId = ${data.holidayId}
  END`;
  return await asyncDML({ qry });
};

const holidayDeleteData = async ({ data}) => {
  const qry = `UPDATE [dbo].[holiday]
  SET [DeletedBy] = ${data.loggedInUserId}
     ,[DeletedDate] = GETDATE()
WHERE HolidayId = ${data.holidayId}`;
  return await asyncDML({ qry });
};


module.exports = {
  holidayGetData,
  holidaySaveData,
  holidayUpdateData,
  holidayDeleteData
};
