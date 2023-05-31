const log4js = require("Log4js");

const { asyncDML } = require("./dbutils");

/**
 * @author "Khushbu Shah"
 */
const { traceLogConfig } = {
  traceLogConfig: {
    appenders: {
      fileAppender: {
        type: "dateFile",
        filename: "./logs/log.log",
        maxLogSize: 10485760, //10GB
        daysToKeep: 10,
        replaceConsole: true,
        backups: 15
      }
    },
    categories: {
      default: {
        appenders: ["fileAppender"],
        level: "debug"
      }
    }
  }
};

const { traceClientLogConfig } = {
  traceClientLogConfig: {
    appenders: {
      fileAppender: {
        type: "dateFile",
        filename: "./clientlogs/clientLog.log",
        maxLogSize: 10485760, //10GB
        daysToKeep: 10,
        replaceConsole: true,
        backups: 15
      }
    },
    categories: {
      default: {
        appenders: ["fileAppender"],
        level: "trace"
      }
    }
  }
};

// Log a message
const loggerInfo = async ({
  message,
  code = "info",
  isClientLog = false,
  res,
  isDBError = false,
  logid = null
}) => {
  try {
    if (!isDBError) {
      let employeeId = 0,
        isPublicLog = false,
        url = "",
        mode = "API",
        userType = null;

      if (res && res.req) {
        const body = res.req.body;
        const { mobileNumber = 0, loggedInEmployeeId = 0, loggedInAppIndication = null } = body;
        employeeId = loggedInEmployeeId ? loggedInEmployeeId : mobileNumber;
        userType = loggedInAppIndication;
        const isPublicAPI = res.req.headers.ispublicapi;
        const deviceIdHeader = res.req.headers.deviceid;
        isPublicLog = isPublicAPI === "true" ? true : false;
        url = res.req.url;
        const webOrMob = deviceIdHeader ? "Mobile" : "Web";
        const publicAPI = isPublicLog ? "Public API" : "API";
        mode = isClientLog == true ? 'Web Error' : `${webOrMob} - ${publicAPI}`;
      }
      //if(message.indexOf("ERR_HTTP_INVALID_STATUS_CODE") >= 0)
      //{
      //  console.log(new Date()+"===================================================");
      //  console.log(message);
      //}
      //else 
      if (code === "error" || code === "log" || message.indexOf("ERR_HTTP_INVALID_STATUS_CODE") >= 0) {
        if (code === "error" || (message.toLowerCase().indexOf("") === -1 && message.toLowerCase().indexOf("response") === -1 && message.indexOf("ERR_HTTP_INVALID_STATUS_CODE"))){
            message = message.replace(/'/g, '`');
            message = message.replace(/"/g, '`');
            if(logid == null){
              const qry = `INSERT INTO errorlog (EmployeeId, LogMode, ErrorDate,PageName,Message, LogType, UserType) VALUES ('${employeeId}', '${mode}', current_timestamp(3), '${url}', "${message}","${code}", ${userType});
              select last_insert_id() AS logId;`;
              const response = await asyncDML({ qry });          
              return response[1][0]["logId"];
             }else{
          employeeId = employeeId == "" || employeeId == undefined ? null : employeeId;
              const qry = `UPDATE errorlog 
                          SET EmployeeId = IFNULL(${employeeId}, EmployeeId), 
                              Message = CONCAT(Message,'::','${message}'), 
                              ResponseDate = current_timestamp(3),
                              LogType = CONCAT(IFNULL(LogType,''),'-','${code}'),
                              UserType = ${userType} 
                          WHERE ErrorId = ${logid};`;
              await asyncDML({ qry });
              return logid;
           }
         }
       }
      return;
    } else {
      if (isClientLog === true) {
        log4js.configure(traceClientLogConfig);
        const clientLogger = log4js.getLogger();
        clientLogger[code](message);
      } else if (isPublicLog === true) {
        log4js.configure(tracePublicLogConfig);
        const publicLogger = log4js.getLogger();
        publicLogger[code](message);
      } else {
        log4js.configure(traceLogConfig);
        const logger = log4js.getLogger();
        logger[code](message);
      }
    }
  } catch (e) {
    const currentDateTime = new Date();
    console.log(`${currentDateTime} :Logger Error : ${e}`);
  }
};
module.exports = { loggerInfo };
