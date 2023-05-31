const https = require('https');
const PaytmChecksum = require('paytmchecksum');

const {
    payTMSaveTransaction, 
    payTMUpdateTransaction
} = require("./payTMRepository");
const { payLoadValidation, sendResponse } = require("../../../utils");
const { Message } = require("../../../Messages");

const { walletTransferRequest,successCode, pendingCode, failerCodeToClient } = require("../../../payTMAPI");

const {
    paytm_walletTransferRequest: { url: walletTransfer }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

const submitWalletTransfer = async({ mobileNumber, orderId, amount, requestObject }) => {
    try {
        const response = await walletTransferRequest({ mobileNumber, orderId, amount });
        const {status, statusCode, statusMessage} = response;
        const transactionResponse = await payTMSaveTransaction({orderId, mobileNumber, amount, status, statusCode, statusMessage, createdBy:0, requestObject})
        const {isSuccess} = transactionResponse;
        if(isSuccess && transactionResponse[1] && transactionResponse[1][0])
        {
            return {
                transactionId: transactionResponse[1][0]["TransactionId"],
                status, statusCode, statusMessage
            }
        }
        else 
        {
            return {
                transactionId: 0,
                status, statusCode, statusMessage
            }
        }            
    } catch (error) {
        return {
            transactionId: 0,
            status:0, statusCode:"", statusMessage:""
        }    
    }
}

module.exports = {submitWalletTransfer, successCode, pendingCode, failerCodeToClient}