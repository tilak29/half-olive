const express = require("express");
const router = express.Router();

const version = require("./version");

version.map((v) => {
  const { deprecated, version: versionNo } = v;
  if (!deprecated) {
    router.use(`/${versionNo}`, require(`./${versionNo}`));
  }
});

module.exports = router;
