const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const http = require("http");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const admin = require("firebase-admin");

const router = require("./router.js");
const { handleError } = require("./error.js");
const { loggerInfo } = require("./logger.js");
const { validateUser } = require("./utils");
const {
  serverPort,
  serverDomain,
  db: { host, port }
} = require("./config.json");
const firebaseKeyJSON = require("./pharmasolutions-firebase-adminsdk.json");

const app = express();
app.use(compression()); //Compress all routes
app.use(fileUpload());
app.use(
  bodyParser.json({
    limit: "25000mb",
    extended: true,
    parameterLimit: 1000000000000000
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "25000mb",
    extended: true,
    parameterLimit: 1000000000000000
  })
);
app.use(express.static(__dirname)); //Comment While build folder
//app.use(express.static(path.join(__dirname, "build"))); //Uncomment While build folder
app.use(cors());
require("events").EventEmitter.defaultMaxListeners = Infinity;

//CORS Middleware
app.use(
  (err, req, res, next) => {
    //Enabling CORS
    res.writeHead("Access-Control-Allow-Origin", `${serverDomain}`);
    res.writeHead("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.writeHead(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization,authorization"
    );
  },
  validateUser,
  router
);

app.use((err, req, res, next) => {
  handleError(err, res);
});
//Setting up server
const httpOptions = {
  //rejectUnauthorized: false,
  key: fs.readFileSync("key/key.pem"),

  cert: fs.readFileSync("key/cert.pem")
};

const server = http
  .createServer(app)
  .listen(process.env.PORT || serverPort, function () {
    const port = server.address().port;
    console.log(port);
    loggerInfo({
      message: `Server Started at Port: ${port}`
    });
  })
  .on("error", function (err) {
    loggerInfo({ code: "error", message: `${err}` });
  });

admin.initializeApp({
  credential: admin.credential.cert(firebaseKeyJSON),
  databaseURL: `"http://"${host}":"${port}`
});

module.exports = app;
