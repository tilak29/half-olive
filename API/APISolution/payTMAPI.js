const https = require('https');
const PaytmChecksum = require('paytmchecksum');

const {
    payTM: {
        MerchantID,
        MerchantKey,
        SubwalletGuid,
        HostName,
        WalletTransferType
    }
} = require("./config.json");

const { handleError } = require("./error.js");

const successCode = ["DE_001"];
const pendingCode = ["DE_002","DE_101"];
const failerCodeToClient = ["DE_048","DE_106","DE_107","DE_965"];

const generateChecksum = async ({ params }) => {

    const checksum = new Promise((resolve, reject) => {
        /**
        * Generate checksum by parameters we have
        */
        var paytmChecksum = PaytmChecksum.generateSignature(params, MerchantKey);
        paytmChecksum.then(function (checksum) {
            resolve(checksum);
        }).catch(function (error) {
            reject(null);
        });
    });
    return checksum;

}

const verifyChecksum = async ({ params, checksum }) => {

    var isVerifySignature = PaytmChecksum.verifySignature(params, MerchantKey, checksum);
    return isVerifySignature;

}

const walletTransfer = async ({ checksum, postData }) => {

    var options = {
        /* for Staging */
        //hostname: 'staging-dashboard.paytm.com',

        /* for Production */
        // hostname: 'dashboard.paytm.com',
        hostname: HostName,
        /* Solutions offered are: food, gift, gratification, loyalty, allowance, communication */
        path: `/bpay/api/v1/disburse/order/wallet/${WalletTransferType}`,
        port: 443,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-mid': MerchantID,
            'x-checksum': checksum,
            'Content-Length': postData.length
        }
    };

    var response = "";
    response = new Promise((resolve, reject) => {
        try {
            var post_req = https.request(options, function (post_res) {
                post_res.on('data', function (chunk) {
                    response += chunk;
                    resolve(chunk);
                });
    
                post_res.on('end', function (res) {
                    resolve(res);
                });                 
            });
    
            post_req.on('error', function(err) {
                reject(err);
            });

            post_req.write(postData);
            post_req.end();
        } catch (error) {
            reject(error);
        }
    });
    return response;
}

const walletTransferRequest = async ({ mobileNumber, orderId, amount }) => {
    try {

        var paytmParams = {};
        paytmParams["subwalletGuid"] = SubwalletGuid;
        paytmParams["orderId"] = orderId;
        paytmParams["beneficiaryPhoneNo"] = mobileNumber;
        paytmParams["amount"] = amount;
        var post_data = JSON.stringify(paytmParams);

        const generatedChecksum = await generateChecksum({ params: post_data });
        if (generatedChecksum != null) {
            var response = await walletTransfer({ checksum: generatedChecksum, postData: post_data })
            response = String.fromCharCode.apply(null, response)
            return JSON.parse(response);
        }

    } catch (e) {
        handleError(e, res);
        return "";
    }
}


module.exports = { walletTransferRequest, successCode, pendingCode, failerCodeToClient }
