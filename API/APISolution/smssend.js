const {
  aws: { accessKeyId, secretAccessKey }
} = require("./config.json");

/**
 * @author "Parth Suthar"
 */
const sendSms = async (msg, phoneNumber, response) => {
  const AWS = require("aws-sdk");
  AWS.config.setPromisesDependency(require("bluebird"));
  AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region: "ap-south-1"
  });
  let body;
  if (response) {
    const text = response.Text;
    Object.keys(msg).forEach((k, idx) => {
      const kVal = `##${k}##`;
      const count = text.search(kVal);
      if (count !== -1) {
        body = text.replace(kVal, msg[k]);
      }
    });
  } else {
    body = msg;
  }

  const publishSMS = (phoneNumber, body, SNS) => {
    const params = {
      Message: body,
      PhoneNumber: "+91" + phoneNumber,
      MessageAttributes: {
        "AWS.SNS.SMS.SMSType": {
          DataType: "String",
          StringValue: "Transactional"
        },
        "AWS.SNS.SMS.SenderID": {
          DataType: "String",
          StringValue: "SMART"
        }
      }
    };
    const publishTextPromise = SNS.publish(params).promise();
    return publishTextPromise;
  };

  phoneNumber = JSON.parse(phoneNumber);
  const SNS = new AWS.SNS();
  if (typeof phoneNumber === "object") {
    let publishSMSResponse;
    phoneNumber.forEach((key, index) => {
      publishSMSResponse = publishSMS(phoneNumber[index], body, SNS);
    });
    return publishSMSResponse;
  } else {
    return publishSMS(phoneNumber, body, SNS);
  }
};

module.exports = sendSms;
