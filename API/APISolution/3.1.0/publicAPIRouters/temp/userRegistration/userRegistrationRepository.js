const { asyncDML } = require("../../../dbutils");

/**
 * @author "Khushbu Shah"
 */
const userRegistrationSaveData = async ({
  loggedInEmployeeId,
  data,
  operationType
}) => {
  const qry = `SET @op_IsSuccess=NULL, @op_Flag=NULL;
  CALL CS_SaveRegisteredUserDetail(${loggedInEmployeeId},'${data}',${operationType},@op_IsSuccess, @op_Flag);
  SELECT @op_IsSuccess, @op_Flag;`;
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const userRegistrationGetData = async ({ noOfGroupShow, statusId = null, year = null }) => {
  const qry = `SET @documentURL = FNGetConfigurationValueByCode('REGISTRATION_DOCUMENT_URL', NULL);
                SELECT ur.RequestId, ur.Name, ur.Address,
                        ur.Area, ur.City, ur.State as StateName,
                        -- sm.StateName, 
                        ur.MobileNumber, ur.Email,
                        ur.RegisteredAs,
                        CASE WHEN ur.RegisteredAs = 0 THEN 'Stockist' WHEN ur.RegisteredAs = 1 THEN 'Super Stockist' WHEN ur.RegisteredAs = 2 THEN 'Chemist' END AS RegisteredAsStr,
                        ur.Status, ur.Remarks, ur.UpdatedBy,
                        ur.UpdatedDate, ContactPerson, ur.DocumentTypeId,
                        DM.DocumentCode, CONCAT(@documentURL,'/',ur.DocumentName) AS DocumentName,
                        ur.PinCode, DM.DocumentGroupId,
                        (CASE WHEN ur.UpdatedBy IS NULL OR ur.UpdatedBy = 0 THEN '' ELSE CONCAT(em.FirstName,' ',em.LastName) END) 'Updator'
                FROM userregistrationrequest ur
                LEFT JOIN employeemaster em ON ur.UpdatedBy = em.EmployeeId
                -- JOIN statemaster sm on sm.StateId=ur.State
                LEFT JOIN documenttypemaster DM ON DM.DocumentTypeId = ur.DocumentTypeId
                WHERE ur.Status= IFNULL(${statusId},65) AND year(ur.CreatedDate) = ${year}
                ORDER BY RequestId DESC ${noOfGroupShow};`;  
  return await asyncDML({ qry });
};

/**
 * @author "Aadilkhan"
 */
const userRegistrationUpdateDataById = async ({loggedInEmployeeId, registrationId, statusId, remarks, updatedDate}) => {
  const qry = `UPDATE userregistrationrequest
              SET Status = ${statusId}
                  ,UpdatedBy = ${loggedInEmployeeId}
                  ,UpdatedDate = CURRENT_TIMESTAMP
                  ,Remarks = '${remarks}'
              WHERE RequestId = ${registrationId} 
              AND Status = 65`;
              return await asyncDML({ qry });
};

/**
 * @author "Aadilkhan"
 */
const getMatchingChemistList = async ({loggedInEmployeeId, registrationId}) => {
  const qry = `CALL GetMatchingChemistList(${loggedInEmployeeId}, ${registrationId})`;
  return await asyncDML({ qry });
};


module.exports = {
  userRegistrationSaveData,
  userRegistrationGetData,
  userRegistrationUpdateDataById,
  getMatchingChemistList
};
