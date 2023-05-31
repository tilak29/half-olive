const express = require("express");
const router = express.Router();

module.exports = router;

router.use(require("./getStockistData"));
router.use(require("./getSuperStockistData"));
