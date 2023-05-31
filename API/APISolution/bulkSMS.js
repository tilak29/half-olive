/**
 * @author "Harsh Patel"
 */


const axios = require('axios')

const {
    ZENSMS: { url, method, api_key, sender, messagePrefix }
  } = require("./config.json");



  const sendBulkSMS = async (number, msg, response) => {

  if(number == null || number == "")
  {
    return null;
  }
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

  if(messagePrefix)
  {
    body = messagePrefix + "\n" + body;
  }

    const smsJson={
        "sender":sender,
        "message":body,
        "sms":[]
    };
    
    const smsNode = [];
    if(Array.isArray(JSON.parse(number))){
        number = JSON.parse(number);
        number.forEach((key, index) => {
        smsNode.push({"to":number[index]})
      });
      smsJson.sms=smsNode;
    }
    else{
      smsJson.sms.push({"to":JSON.parse(number)})  
    }

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    
      let result = await axios.post(url, smsJson, config);
      return result;
    };

    module.exports = sendBulkSMS;