const { loggerInfo } = require("./logger.js");
const { Message } = require("./Messages");

/**
 * @author "Khushbu Shah,Parth Suthar"
 */
class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  err = err == null ? {} : err;
  const {
    statusCode = 500,
    isSuccess = false,
    data = {},
    isValidate = false,
    name = "Error",
    stack
  } = err;
  delete err.stack;
  const message = Message({ code: "ER500" });
  let errorText;
  try {
    errorText = typeof(err) === "object" ? JSON.stringify(err) : err;
    if(errorText == "" || errorText == "{}")
    {
      errorText = err.message;
    }
  } catch (e) {
    errorText = err;
  }

  const logid = (res && res.req && res.req.body) ? res.req.body.logid : 0;
  const errorBody = (res && res.req && res.req.body) ? JSON.stringify(res.req.body) : "";

  loggerInfo({
    code: "error",
    message: `${errorText} : ${errorBody}`,
    res,
    logid
  });

  const response = {
    statusCode,
    isSuccess,
    data,
    message,
    isValidate,
    validationList: [{ [name]: message }]
  };
  if (!res.finished) return res.status(statusCode).json({ ...response });
};

module.exports = {
  ErrorHandler,
  handleError
};
