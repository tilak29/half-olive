
import config from "../Config.json";

const downloadFile = async(url) => {
 var splitUrl=url.split("/")
 var AWS = require('aws-sdk');

AWS.config.update(
  {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey
  }
);
AWS.config.region = "ap-south-1";
var s3 = new AWS.S3();
s3.getObject(
  { Bucket: config.aws.bucket, Key: splitUrl[3]+"/"+splitUrl[4] },
  function (error, data) {
    if (error != null) {
      //alert("Failed to retrieve an object: " + error);
    } else {
      //alert("Loaded " + data.ContentLength + " bytes");
      // do something with data.Body
      let blob=new Blob([data.Body], {type: data.ContentType});
      let link=document.createElement('a');
      link.href=window.URL.createObjectURL(blob);
      link.download=splitUrl[4];
      link.click();
    }
  }
);

// const myBucket = config.aws.bucket
// const myKey = 'invoiceqa/1594644435373.jpeg'
// const signedUrlExpireSeconds = 60 * 5 // your expiry time in seconds.

// const url1 = s3.getSignedUrl('getObject', {
//  Bucket: myBucket,
//  Key: myKey,
//  Expires: signedUrlExpireSeconds
// })
// return the url to client
//const dataurl = "https://file-upload-smartlab-qa.s3.ap-south-1.amazonaws.com/invoiceqa/1595408649303.jpeg";
//download(dataurl,"1595408649303.jpeg")
// let a = document.createElement("a");
// a.download = "hellooo.png"
//   a.href = dataurl;
//   a.click();

// let response = await fetch(dataurl,{mode:"no-cors"});
//   let data = await response.blob();
//   let blob=new Blob([data.Body], {type: data.ContentType});

    //   let blob=await getBlobFromUrl(dataurl);
    //   let link=document.createElement('a');
    //   link.href=window.URL.createObjectURL(blob);
    //   link.download="test.jpeg";
    //   link.click();


};


export default downloadFile;