const express = require("express");
const router = express.Router();

module.exports = router;

router.use(require("./publicAPILogin"));
router.use(require("./isAuthorizedUser"));
router.use(require("./manageBooking"))
// router.use(require("./userRegistration"));
// router.use(require("./askQueryCS"));
// router.use(require("./advertise"));
router.use(require("./viewCSProfile"));
// router.use(require("./version"));
// router.use(require("./redeemRequest"));
router.use(require("./lookUpData"));
// router.use(require("./firebaseTokenCS"));
router.use(require("./monthlyStatus"));
router.use(require("./notification"));
router.use(require("./diseaseMaster"));
