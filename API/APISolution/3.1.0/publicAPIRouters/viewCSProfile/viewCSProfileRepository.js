const { asyncDML } = require("../../../dbutils");

/**
 * @author "Khushbu Shah"
 */
const viewCSProfileGetData = async ({
  loggedInMobileNumber,
  loggedInAppIndication
}) => {
  const qry = `CALL CS_GetMyProfileData(${loggedInMobileNumber},${loggedInAppIndication});`;
  return await asyncDML({ qry });
};

/**
 * @author "Aadilkhan"
 */
const getChemistAssignedSLInfo = async ({loggedInMobileNumber}) =>{
  //=== This function is not in use

  const qry = `SET @RouteId = ( SELECT RouteId FROM chemistmaster WHERE Mobile = ${loggedInMobileNumber});
              SELECT IFNULL(JSON_ARRAYAGG(JSON_OBJECT('slName', CONCAT(FirstName, ' ', LastName), 'slMobileNumber', MobileNumber)),'[]') slList
              FROM employeemaster EM 
              WHERE EM.EmployeeId IN (
			                              SELECT RM.EmployeeId 
                                    FROM employeeroutes RM 
                                    WHERE RM.RouteId = @RouteId
                                    AND RM.DeletedBy IS NULL
		                              );
  `;
  return await asyncDML({ qry });
}


module.exports = {
  viewCSProfileGetData,
  getChemistAssignedSLInfo
};
