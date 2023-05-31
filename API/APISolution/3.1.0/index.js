const express = require("express");
const router = express.Router();

module.exports = router;

router.use(require("./routers"));
router.use(require("./publicAPIRouters"));
