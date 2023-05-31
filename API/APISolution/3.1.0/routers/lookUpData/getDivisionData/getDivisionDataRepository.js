const { asyncDML } = require("../../../../dbutils");
const { CompanyId } = require("../../../../Config.json");

/**
 * @author "Parth Suthar"
 */
const getLookupData = async ({loggedInDivisionIds, loggedInAppIndication}) => {

  const qry = `SELECT DivisionId AS value,DivisionName AS label
  FROM divisionmaster
  WHERE DeletedBy is null
  AND IsActive=1
  AND CONVERT( DATE,FormedDate) <= GETDATE()
  AND CompanyId=${CompanyId}   
  AND (${loggedInAppIndication} IN (0,1,2) OR DivisionId IN (${loggedInDivisionIds}))
  ORDER BY DivisionName`;
  return await asyncDML({ qry });
};

/**
 * @author "Kishan Sirodariya"
 */

const getAllLookupData = async () => {

  const qry = `SELECT DivisionId AS value,DivisionName AS label
  FROM divisionmaster
  WHERE DeletedBy is null
  AND IsActive=1
  AND CONVERT( DATE,FormedDate) <= GETDATE()
  AND CompanyId=${CompanyId} 
  ORDER BY DivisionName`;
  return await asyncDML({ qry });
};


/**
 * @author "Imran Patwa"
 */
 const getStockistAssignedDivisionData = async ({loggedInMobileNumber}) => {

  const qry = `SET @loggedInDivisionIds = (SELECT DivisionId FROM stockistmaster where mobilenumber = ${loggedInMobileNumber} );
    SELECT DivisionId AS value,DivisionName AS label
    FROM divisionmaster
    WHERE DeletedBy is null
    AND IsActive=1
    AND CONVERT( DATE,FormedDate) <= GETDATE()   
    AND DivisionId IN (SELECT Id FROM JSON_TABLE(@loggedInDivisionIds, '$[*]' COLUMNS(Id INT PATH '$')) AS D )
    ORDER BY DivisionName;`; 
    console.log(qry)   ;
  return await asyncDML({ qry });
};

module.exports = {
  getLookupData,
  getAllLookupData,
  getStockistAssignedDivisionData
};
