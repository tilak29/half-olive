const express = require("express");
const router = express.Router();

module.exports = router;

router.use(require("./loginUser"));
router.use(require("./sendMail"));
router.use(require("./forgotPassword"));
router.use(require("./refreshToken"));
router.use(require("./logOut"));
router.use(require("./firebaseNotification"));
router.use(require("./holidayMaster"));
router.use(require("./lookUpData"));
router.use(require("./stateMaster"));
router.use(require("./divisionMaster"));
router.use(require("./areaMaster"));
router.use(require("./cityMaster"));
router.use(require("./employeeMaster"));
// router.use(require("./routeMaster"));
// router.use(require("./chemistMaster"));
router.use(require("./changePassword"));
// router.use(require("./designationMaster"));
router.use(require("./itemMaster"));
// router.use(require("./deviceConfigurationMaster"));
// router.use(require("./schemeMaster"));
// router.use(require("./stockistMaster"));
// router.use(require("./userPanel"));
// router.use(require("./itemPriceMaster"));
router.use(require("./leaveMasterData"));
// router.use(require("./gpsTracer"));
router.use(require("./startDay"));
// router.use(require("./slTourPlan"));
// router.use(require("./managerTourPlan"));
// router.use(require("./askQuery"));
// router.use(require("./dcrCalendar"));
// router.use(require("./unlockDCR"));
// router.use(require("./tourPlanApproval"));
// router.use(require("./expenseConfigurationMaster"));
// router.use(require("./stockistEmployeeMaster"));
// router.use(require("./broadcastMobileNewsMaster"));
// router.use(require("./pob"));
// router.use(require("./expense"));
router.use(require("./endDay"));
router.use(require("./notificationInfo"));
// router.use(require("./expenseApproval"));
// router.use(require("./order"));
router.use(require("./viewProfile"));
// router.use(require("./transferRoutesToEmployee"));
// router.use(require("./mergeRoute"));
router.use(require("./dashboard"));
// router.use(require("./reports"));
router.use(require("./sendSms"));
// router.use(require("./manageDCR"));
// router.use(require("./getLocationByLatLon"));
router.use(require("./version"));
router.use(require("./guestMaster"));
// router.use(require("./rewardMaster"));
// router.use(require("./invoiceMaster"));
// router.use(require("./empRoute"));
// router.use(require("./updatePoints"));
// router.use(require("./targetMaster"));
// router.use(require("./videoMaster"));
// router.use(require("./videoSeriesMaster"));
// router.use(require("./documentTypeMaster"));
// router.use(require("./chemistProfileUpdate"));
router.use(require("./monthlyExpenseSummary"));
// router.use(require("./videoSummary"));
// router.use(require("./tandC"));
// router.use(require("./featureToggling"));
// router.use(require("./selfiePoints"));
// router.use(require("./survey"));
// router.use(require("./awsService"));
// router.use(require("./pointConfig"));
// router.use(require("./customerOrder"));
// router.use(require("./birthDay"));
// router.use(require("./birthDay"));
// router.use(require("./menuRole"));
// router.use(require("./myOrder"));
// router.use(require("./defaultSecondary"));
// router.use(require("./primaryPurchase"));
// router.use(require("./gpsSmsTrack"));
// router.use(require("./qrMaster"));
// router.use(require("./customer"));
// router.use(require("./ftpFileReader"));
router.use(require("./roomCategory"));
router.use(require("./roomMaster"));
router.use(require("./keyMaster"));
router.use(require("./manageBooking"));
router.use(require("./amenityMaster"));
router.use(require("./treatmentMaster"));
router.use(require("./amenityMaster"));
router.use(require("./locationMaster"));
router.use(require("./dietMaster"));
router.use(require("./diseaseMaster"));
router.use(require("./Treatment"))
router.use(require("./treatmentPlanMaster"));
router.use(require("./healthHistoryDisease"));
router.use(require("./leaveApproval"));
router.use(require("./treatmentTemplete"));
router.use(require("./treatmentRoomMaster"));
router.use(require("./dailytherapy"));
router.use(require("./memberShip"));
router.use(require("./RoomRateMaster"));
router.use(require("./treatmentRoomMaster"));
router.use(require("./therapyTypeMaster"));
router.use(require("./TherapySlotMaster"));
router.use(require("./mealTemplate"));
router.use(require("./dateWiseMealTemplate"));