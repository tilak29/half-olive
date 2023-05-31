const express = require("express");
const router = express.Router();

module.exports = router;

router.use(require("./getStateData"));
router.use(require("./getCityData"));
router.use(require("./getYearRangeForHolidayMaster"));
router.use(require("./getEmployeeData"));
router.use(require("./getDivisionData"));
router.use(require("./getDesignationData"));
router.use(require("./getStaticData"));
router.use(require("./getAreaData"));
router.use(require("./getCountryData"));
router.use(require("./getRouteData"));
router.use(require("./getCategoryData"));
router.use(require("./getAvailableItemsForSchemeData"));
router.use(require("./getMonthYearRangeForTourPlan"));
router.use(require("./getSLOrManagerListByEmployeeId"));
router.use(require("./getRoutesByEmployeeId"));
router.use(require("./getMonthYearRangeForGivenRange"));
router.use(require("./getRoutesForAddDCR"));
router.use(require("./getChemistByEmployeeId"));
router.use(require("./getWorkflowData"));
router.use(require("./getDepotData"));
router.use(require("./getFTPDivisionData"));
