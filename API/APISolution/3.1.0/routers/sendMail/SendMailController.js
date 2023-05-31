const nodemailer = require("nodemailer");
const Config = require("../../../config.json");
const { Message } = require("../../../Messages");
const { asyncDML } = require("../../../dbutils");
/**
 * @author "Nirali Maradiya,Parth Suthar"
 */
const sendMail = async ({ code, from, to, resultObject, cc, bcc }) => {
  const qry = `select * from templatemaster where Code='${code}'`;
  /* Changed By Aadil */
  let subject;
  let priority = null;
  let body;
  let mailOptions = {};

  if(code != null)
  {
    const templateHtml = await asyncDML({ qry });
    body = templateHtml[0].Body;
    subject = templateHtml[0].Subject;
    priority = templateHtml[0].Priority;
    Object.keys(resultObject).forEach((k, idx) => {
      const kVal = `##${k}##`;
      const count = body.search(kVal);
      if (count !== -1) {
        body = body.replace(kVal, resultObject[k]);
      }
      if (subject.search(kVal) !== -1) {
        subject = subject.replace(kVal, resultObject[k]);
      }
    });  
  }
  else{
    subject = resultObject.subject;
    body = resultObject.body;
  }

  if(from != null){
    mailOptions["from"] = `${from}`;
  }
  mailOptions["to"] = `${to}`;
  // mailOptions["cc"] = `${cc}`;
  // mailOptions["bcc"] = `${bcc}`;
  mailOptions["subject"] = `${subject}`;
  mailOptions["html"] = `${body}`;
  mailOptions["priority"] = `${priority}`;
  return new Promise(async (resolve, reject) => {
    const transporterConfig = Config.transporterConfig;
    const transporter = nodemailer.createTransport(transporterConfig);
    let response;
    await transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        response = {
          isSuccess: false,
          message: Message({ }),
          ...response
        };
        reject(response);
      } else {
        response = {
          isSuccess: true,
          message: Message({ code: "ForgotPass" }),
          ...response
        };
        resolve(response);
      }
    });
  });
};

module.exports = {
  sendMail
};
