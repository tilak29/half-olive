const { asyncDML } = require("../../../dbutils");

/**
 * @author "Fahad Shaikh"
 */

const getApprovalLeave =async ({ }) => {
  const qry = `SELECT LM.LeaveId,concat(E.FirstName,' ',E.LastName) as EmployeeName,LM.LeaveStatus,LM.Reason,LM.Category,LM.StartDate,LM.EndDate,LM.LeaveType,LM.Day,SD.StaticName,LM.CreatedDate 
  FROM Leave LM
  join employeemaster E on LM.EmployeeId=E.EmployeeId 
  join staticdata SD on LM.LeaveStatus=SD.StaticId
  WHERE LM.DeletedBy is Null `;
  return await asyncDML({ qry });
};

/**
 * @author "Fahad Shaikh"
 */

const updateApprovalLeave =async ({data,operationType}) => {
  var jsdata = JSON.parse(data);
  var qry = ''
  if (operationType == 0) {
     qry = ` UPDATE [dbo].[Leave] 
                SET [LeaveStatus]	= ${jsdata.leaveStatus}
                   ,[UpdatedBy] = ${jsdata.loggedInReferenceId}      
                   ,[UpdatedDate] = GETDATE()
                    WHERE LeaveId = ${jsdata.leaveId}`;
  }
  return await asyncDML({ qry });
};

module.exports = {
    getApprovalLeave,
    updateApprovalLeave
  };
  