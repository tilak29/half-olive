const { asyncDML } = require("../../../../dbutils");

/**
 * @author "Khushbu Shah"
 */
const getLookupData = async ({
  employeeId,
  loggedInEmployeeId,
  isSelRequired = false,
  isManager = false,
  stateId,
  designationIds,
  isReportingRequired = false,
  isNameRequired = true,
  loggedInDivisionId
}) => {
  const id = employeeId ? employeeId : loggedInEmployeeId;
  const designationIdList = designationIds ? `'${designationIds}'` : null;
  let stateIdList = null;
  if(stateId && stateId !== "" && stateId && stateId != null)
  {
    stateId = stateId instanceof Array ? stateId[0] instanceof Object ? null : stateId[0] : stateId;
  }
  stateIdList = stateId != null ? `'[${stateId}]'` : null;
  const qry = `CALL GetSLOrManagerListByEmployeeId(${id},${stateIdList},${designationIdList},${isManager},${isSelRequired},${isReportingRequired},${isNameRequired},'${loggedInDivisionId}');`;
  return await asyncDML({ qry });
};

module.exports = {
  getLookupData
};
