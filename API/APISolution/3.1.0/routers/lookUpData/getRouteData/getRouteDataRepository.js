const { asyncDML } = require("../../../../dbutils");

/**
 * @author "Parth Suthar"
 */
const getLookupData = async ({
  loggedInEmployeeId,
  date,
  employeeId,
  isOfficialRoutesRequired = null
}) => {
  const effectiveDate = date ? `'${date}'` : null;
  const id = employeeId ? `'${employeeId}'` : `'[${loggedInEmployeeId}]'`;
  const qry = `CALL GetRouteLookupByEmployeeId(${id}, ${effectiveDate},${isOfficialRoutesRequired});`;
  return await asyncDML({ qry });
};

module.exports = {
  getLookupData
};
