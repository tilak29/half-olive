const admin = require("firebase-admin");

const { Message } = require("../../../Messages");
const { asyncDML } = require("../../../dbutils");

/**
 * @author "Parth Suthar"
 */
const firebaseNotification = async ({ registrationToken, notificationMsg }) => {
  const payload = {
    notification: {
      body: notificationMsg
    }
  };
  const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };
  let response;

  if (registrationToken !== null && registrationToken != "") {
    response = await admin
      .messaging()
      .sendToDevice(registrationToken, payload, options);

    if (response.results[0].error) {
      response = {
        message: `${response.results[0].error.message}`
      };
    } else if (!response.results[0].error) {
      response = {
        message: Message({ code: "FirebaseNotification" }),
        ...response
      };
    } else {
      response = {
        message: Message({}),
        isSuccess: false
      };
    }
  }
  return response;
};
/**
 * @author "Parth Suthar"
 */
const firebaseInsertToken = async ({ firebaseToken, loggedInEmployeeId }) => {
  let qry = `SELECT 1 AS FirebaseTokenExists FROM employeemaster WHERE EmployeeId = ${loggedInEmployeeId} AND FirebaseToken = '${firebaseToken}'`;
  const resultIsFirebasetokenExists = await asyncDML({ qry});
  if(resultIsFirebasetokenExists[0] && resultIsFirebasetokenExists[0].FirebaseTokenExists == 1)
  {
    return {
      isSuccess: true
    };
  }

  qry = `UPDATE employeemaster SET FirebaseToken = '${firebaseToken}' WHERE EmployeeId = ${loggedInEmployeeId}`;
  return await asyncDML({ qry });
};

const firebaseGetData = async ({ loggedInEmployeeId }) => {
  const qry = `SELECT * FROM notificationinfo WHERE EmployeeId = ${loggedInEmployeeId}`;
  return await asyncDML({ qry });
};

module.exports = {
  firebaseNotification,
  firebaseInsertToken,
  firebaseGetData
};
