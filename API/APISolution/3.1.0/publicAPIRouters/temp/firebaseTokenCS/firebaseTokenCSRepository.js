const { asyncDML } = require("../../../dbutils");

/**
 * @author "Khushbu Shah"
 */
const firebaseTokenCSSaveData = async ({
  loggedInEmployeeId,
  loggedInAppIndication,
  firebaseToken
}) => {
  let qry;
  if (loggedInAppIndication === 2)
    qry = `SET SQL_SAFE_UPDATES = 0; UPDATE chemistmaster SET FirebaseToken = '${firebaseToken}' WHERE ChemistId = ${loggedInEmployeeId};`;
  else
    qry = `SET SQL_SAFE_UPDATES = 0; UPDATE stockistmaster SET FirebaseToken = '${firebaseToken}' WHERE StockistId = ${loggedInEmployeeId};`;
  return await asyncDML({ qry });
};

module.exports = {
  firebaseTokenCSSaveData
};
