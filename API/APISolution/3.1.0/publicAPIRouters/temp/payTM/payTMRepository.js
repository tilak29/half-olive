const { asyncDML } = require("../../../dbutils");

const payTMSaveTransaction = async({orderId, mobileNumber, amount, status = "", statusCode = "", statusMessage = "", createdBy = 0, requestObject ='' })=>{
   const qry = `insert into paytmtransaction (OrderId, MobileNumber, Amount, Status, StatusCode, StatusMessage, CreatedBy, CreatedDate, RequestObject)
   value ('${orderId}', '${mobileNumber}', ${amount}, '${status}', '${statusCode}', '${statusMessage}', ${createdBy}, CURRENT_TIMESTAMP, '${requestObject}');
   SELECT last_insert_id() AS TransactionId
   `;
   return await asyncDML({qry}); 
}

const payTMUpdateTransaction = async({transactionId, status = "", statusCode = "", statusMessage = "", updatedBy = 0 })=>{
    const qry = `update paytmtransaction 
                SET Status '${status}', 
                    StatusCode = '${statusCode}', 
                    StatusMessage = '${statusMessage}', 
                    UpdatedBy = ${updatedBy}, 
                    UpdatedDate = CURRENT_TIMESTAMP),
                    RetryCount = RetryCount + 1
                WHERE TransactionId = ${transactionId}
    `;
    return await asyncDML({qry}); 
 }
 
module.exports = {payTMSaveTransaction, payTMUpdateTransaction}
