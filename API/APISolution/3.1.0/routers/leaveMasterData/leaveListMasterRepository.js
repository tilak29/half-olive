const { asyncDML } = require("../../../dbutils");
const { EncryptionDecryptionKey, CompanyId } = require("../../../Config.json");

/**
 * @author "Dileep Lohar"
 */


const getLeaveMaster = async ({ EmployeeId }) => {
  const qry =
    `select FirstName,LastName,Category,LeaveId, Reason,StartDate,EndDate,LeaveType,Day,LeaveStatus from Leave LM 
    join employeemaster EM ON LM.EmployeeId = EM.EmployeeId
    where LM.EmployeeId IN (${EmployeeId}) and (LM.DeletedBy is null or LM.DeletedDate= '') and LM.CompanyId=${CompanyId}
    ORDER BY LM.CreatedDate DESC`;
    console.log("qry :: ",qry);
  return await asyncDML({ qry });

}
const saveLeaveMaster = async ({ data }) => {
  var jsdata = JSON.parse(data)
  const qry = `IF EXISTS(SELECT 'True' FROM Leave  
  where (('${jsdata.StartDate}' between StartDate and EndDate) or 
('${jsdata.EndDate}' between StartDate and EndDate) or ('${jsdata.StartDate}'= StartDate) or ('${jsdata.EndDate}'= EndDate)) 
and EmployeeId=${jsdata.loggedInReferenceId} and DeletedBy is null and DeletedDate is null and CompanyId=${CompanyId}) 
  BEGIN
    SELECT Count= 1
  END
  ELSE
  BEGIN
    SELECT Count= 0
    INSERT INTO [dbo].[Leave]
    ([Category]
    ,[CompanyId]
    ,[Reason]
    ,[StartDate]
    ,[EndDate]
    ,[LeaveStatus]
    ,[EmployeeId]
    ,[LeaveType]
    ,[Day]
    ,[CreatedBy]
    ,[CreatedDate])
  VALUES
      ('${jsdata.Category}',
        ${CompanyId},
      '${jsdata.Reason}',
      '${jsdata.StartDate}',
      '${jsdata.EndDate}',
      ${jsdata.Status},
      ${jsdata.loggedInReferenceId},
      '${jsdata.LeaveType}',
      ${jsdata.Day},
      ${jsdata.loggedInUserId},
    GETDATE())
  END`;
  return await asyncDML({ qry });
}


const updateLeaveMaster = async ({ data }) => {
  var qry = `
          UPDATE [dbo].[Leave]
          SET [Category] = '${data.Category}'
          ,[Reason] = '${data.Reason}'
          ,[StartDate] = '${data.StartDate}'
          ,[EndDate] = '${data.EndDate}'
          ,[LeaveType] = '${data.LeaveType}'
          ,[Day] = ${data.Day}
          ,[UpdatedBy] = ${data.loggedInUserId}
          ,[UpdatedDate] = GETDATE()
          WHERE LeaveId = ${data.LeaveId} and CompanyId=${CompanyId}`;
  return await asyncDML({ qry });
}

const deleteLeaveMaster = async ({ data }) => {
  const qry =
    `UPDATE [dbo].[Leave]
    SET [DeletedBy] = ${data.loggedInUserId}
        ,[DeletedDate] = GETDATE()
    WHERE LeaveId = ${data.LeaveId} and CompanyId=${CompanyId}`;
  return await asyncDML({ qry });
}

module.exports = { getLeaveMaster, saveLeaveMaster, updateLeaveMaster, deleteLeaveMaster }