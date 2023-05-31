const { asyncDML } = require("../../../dbutils");

/**
 * @author "Parth Suthar"
 */
const userPanelGetData = async ({ stateId, divisionId = null, loggedInDivisionId }) => {
  const qry = `select EM.EmployeeId,
                      CONCAT(EM.FirstName,' ',EM.LastName) AS UserName,
                      CM.CityName,
                      DM.DesignationCode,
                      EM.MobileNumber,
                      CAST(AES_DECRYPT(Password,'P@ssw0rd12') as CHAR) as Password,
                      EM.ReportingPeriod,
                      EM.UpdatedBy,
                      EM.UpdatedDate
              from employeemaster EM
              join citymaster CM on CM.CityId = EM.CityId 
              join designationmaster DM on DM.DesignationId = EM.DesignationId 
              where EM.StateId = ${stateId}
              AND (
                  (${divisionId} IS NOT NULL AND JSON_CONTAINS(EM.DivisionId, '${divisionId}') = 1)
                  OR
                  (${divisionId} IS NULL AND EXISTS (SELECT 1 FROM JSON_TABLE('${loggedInDivisionId}', '$[*]' COLUMNS(Id VARCHAR(3) PATH '$')) AS D WHERE JSON_CONTAINS(EM.DivisionId, Id) = 1))
              )
              ORDER BY CONCAT(EM.FirstName,' ',EM.LastName)`;
  return await asyncDML({ qry });
};

/**
 * @author "Parth Suthar"
 */
const userPanelUpdateData = async ({
  reportingPeriod,
  loggedInEmployeeId,
  updatedDate,
  employeeId
}) => {
  const getQry = `SELECT UpdatedDate FROM employeemaster WHERE EmployeeId=${employeeId}`;
  const result = await asyncDML({ qry:getQry });

  if (updatedDate !== result[0].UpdatedDate) {
    return { isSuccess: false, flag: "Concurrency" };
  }

  const qry = `UPDATE employeemaster SET ReportingPeriod = ${reportingPeriod},UpdatedBy=${loggedInEmployeeId},UpdatedDate =CURRENT_TIMESTAMP WHERE EmployeeId=${employeeId};
              SET @Mobile = (SELECT MobileNumber FROM employeemaster WHERE employeeid=${employeeId});
              SET @LoginId = IFNULL((SELECT MAX(iLI.LoginId) FROM logininfo iLI WHERE iLI.employeeid = @Mobile),0);
              UPDATE logininfo LI SET IsInfoChanged = 1 ,isActive = 0 ,ExpirationTime = CURRENT_TIMESTAMP
              WHERE LI.LoginId = @LoginId
              AND ${reportingPeriod} = 0`;
  return await asyncDML({ qry });
};

module.exports = {
  userPanelGetData,
  userPanelUpdateData
};
