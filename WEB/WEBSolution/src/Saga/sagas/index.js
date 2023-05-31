import { all } from "redux-saga/effects";
import advertiseSaga from "./advertiseSaga";
import areaMasterSaga from "./areaMasterSaga";
import assignChemistToRouteSaga from "./assignChemistToRouteSaga";
import assignRouteSaga from "./assignRouteSaga";
import assignStockistToEmployeeSaga from "./assignStockistToEmployeeSaga";
import broadcastMobileNewsSaga from "./broadcastMobileNewsSaga";
import changePasswordSaga from "./changePasswordSaga";
import chemistCumulativeProductiveCallReportSaga from "./chemistCumulativeProductiveCallReportSaga";
import chemistMasterSaga from "./chemistMasterSaga";
import cityMasterSaga from "./cityMasterSaga";
import dashboardSaga from "./dashboardSaga";
import dcrSaga from "./dcrSaga";
import designationMasterSaga from "./designationMasterSaga";
import deviceConfigurationMasterSaga from "./deviceConfigurationMasterSaga";
import divisionMasterSaga from "./divisionMasterSaga";
import employeeMasterSaga from "./employeeMasterSaga";
import expenseApprovalSaga from "./expenseApprovalSaga";
import expenseConfigurationSaga from "./expenseConfigurationSaga";
import expenseReportSaga from "./expenseReportSaga";
import gpsSaga from "./gpsSaga";
import holidayMasterSaga from "./holidayMasterSaga";
import itemMasterSaga from "./itemMasterSaga";
import itemPriceMasterSaga from "./itemPriceMasterSaga";
import leaveSaga from "./leaveSaga";
import loginSaga from "./loginSaga";
import logoutSaga from "./logoutSaga";
import lookupSaga from "./lookupSaga";
import manageDCRSaga from "./manageDCRSaga";
import managerTourPlanSaga from "./managerTourPlanSaga";
import mergeRoutesSaga from "./mergeRoutesSaga";
import notificationSaga from "./notificationSaga";
import refreshTokenSaga from "./refreshTokenSaga";
import registrationApprovalSaga from "./registrationApprovalSaga";
import rewardMasterSaga from "./rewardMasterSaga";
import schemeMasterSaga from "./schemeMasterSaga";
import slTourPlanSaga from "./slTourPlanSaga";
import smsSaga from "./smsSaga";
import stateMasterSaga from "./stateMasterSaga";
import staticLookupSaga from "./staticLookupSaga";
import stockistMasterSaga from "./stockistMasterSaga";
import tpVsActualRouteReportSaga from "./tpVsActualRouteReportSaga";
import transferRoutesToEmployeeSaga from "./transferRoutesToEmployeeSaga";
import userPanelManageSaga from "./userPanelManageSaga";
import viewProfileSaga from "./viewProfileSaga";
import chemistVisitsSaga from "./chemistVisitsSaga";
import invoiceSaga from "./invoiceSaga";
import orderStatusSaga from "./orderStatusSaga";
import redemptionApprovalSaga from "./redemptionApprovalSaga";
import updatePointsSaga from "./updatePointsSaga";
import empRouteSaga from "./empRouteSaga";
import attendanceReportSaga from "./attendanceReportSaga";
import claimRewardReportSaga from "./claimRewardReportSaga";
import targetSaga from "./targetSaga";
import chemistProfileSaga from "./chemistProfileSaga";
import monthlyExpenseSummaryReportSaga from "./monthlyExpenseSummaryReportSaga";
import seriesSaga from "./seriesSaga";
import videoMasterSaga from "./videoMasterSaga";
import documentTypeSaga from "./documentTypeSaga";
import termsAndConditionsSaga from "./termsAndConditionsSaga";
import videoSummary from "./videoSummarySaga";
import feature from "./featureSaga";
import selfi from "./selfieSaga";
import questionType from "./questionTypeSaga";
import surveyMaster from "./surveyMasterSaga";
import surveyReport from "./surveyReportSaga";
import PointsConfig from "./PointsConfigSaga";
import CustomerOrder from "./customerOrderSaga";
import MyOrder from "./myOrderSaga";
import MenuRoleSaga from "./menuRoleSaga";
import DefaultSecondarySaga from "./defaultSecondarySaga";
import itemWiseSalesReportSaga from "./itemWiseSalesReportSaga";
import topCustomerReportSaga from "./topCustomerReportSaga";
import primaryPurchaseSaga from "./primaryPurchaseSaga";
import gpsSmsTrackSaga from "./gpsSmsTrackSaga";
import primaryVsSecondaryReportSaga from "./primaryVsSecondaryReportSaga";
import smartSetuAppReportSaga from "./smartSetuAppReportSaga";
import primaryVsClaimReportSaga from "./primaryVsClaimReportSaga";
import employeeRefMapingReportSaga from "./employeeRefMapingReportSaga";
import qrMasterSaga from "./qrMasterSaga";
import getDepoListSaga from "./getDepoListSaga";
import getClosingStockListSaga from "./getClosingStockListSaga";
import getMonthlySalesReportSaga from "./getMonthlySalesReportSaga";
import ftpFileReaderSaga from "./ftpFileReaderSaga";
import getStockistFilterListSaga from "./getStockistFilterListSaga";
import getOutStandingReportSaga from "./getOutStandingReportSaga";
import getFTPDivisionListSaga from "./getFTPDivisionListSaga";
import guestMasterSaga from "./guestMasterSaga";
import roomCategorySaga from "./roomCategorySaga";
import roomMasterSaga from "./roomMasterSaga";
import dietMasterSaga from "./dietMasterSaga";
import RoomRateSaga from "./RoomRateSaga";
import keyMasterSaga from "./keyMasterSaga";
import amenityMasterSaga from "./amenityMasterSaga";
import manageBookingSaga from './manageBookingSaga';
import locationMasterSaga from "./locationMasterSaga";
import treatmentRoomMasterSaga from "./treatmentRoomMasterSaga";
import patientListSaga from "./patientListSaga";
import personalDetailsSaga from "./personalDetailsSaga";
import diseaseMasterSaga from "./diseaseMasterSaga";
import treatmentMasterSaga from "./treatmentMasterSaga";
import dietlistSaga from "./dietlistSaga";
import treatmentPlanMasterSaga from "./treatmentPlanMasterSaga";
import leaveApprovalSaga from "./leaveApprovalSaga";
import healthHistorySaga from "./healthHistorySaga";
import treatmentTempleteMasterSaga from "./treatmentTempleteMasterSaga";
import dailytherapySaga from "./dailytherapySaga";
import therapyTypeMasterSaga from "./therapyTypeMasterSaga";
import therapySlotSaga from "./therapySlotSaga"
import memberShipSaga from "./memberShipSaga"
import treatmentSaga from "./treatmentSaga";
import mealTemplateSaga from "./mealTemplateSaga";
import imagCarouselSaga from "./imageCarouselSaga";
import dateWiseMealTemplateSaga from "./dateWiseMealTemplateSaga";

/**
 * This root Saga aggregates multiple Sagas to a single entry point for the sagaMiddleware to run.
 * @author "Mihir Vyas, Tejal Sali"
 */
function* rootSaga() {
  yield all([
    therapyTypeMasterSaga(),
    leaveApprovalSaga(),
    healthHistorySaga(),
    manageBookingSaga(),
    amenityMasterSaga(),
    keyMasterSaga(),
    diseaseMasterSaga(),
    roomMasterSaga(),
    dietMasterSaga(),
    RoomRateSaga(),
    dietlistSaga(),
    treatmentTempleteMasterSaga(),
    roomCategorySaga(),
    loginSaga(),
    logoutSaga(),
    refreshTokenSaga(),
    lookupSaga(),
    holidayMasterSaga(),
    stateMasterSaga(),
    divisionMasterSaga(),
    cityMasterSaga(),
    designationMasterSaga(),
    areaMasterSaga(),
    assignRouteSaga(),
    staticLookupSaga(),
    chemistMasterSaga(),
    employeeMasterSaga(),
    stockistMasterSaga(),
    itemMasterSaga(),
    changePasswordSaga(),
    schemeMasterSaga(),
    userPanelManageSaga(),
    deviceConfigurationMasterSaga(),
    itemPriceMasterSaga(),
    leaveSaga(),
    slTourPlanSaga(),
    managerTourPlanSaga(),
    assignChemistToRouteSaga(),
    dcrSaga(),
    dashboardSaga(),
    expenseConfigurationSaga(),
    broadcastMobileNewsSaga(),
    expenseApprovalSaga(),
    assignStockistToEmployeeSaga(),
    mergeRoutesSaga(),
    viewProfileSaga(),
    expenseReportSaga(),
    transferRoutesToEmployeeSaga(),
    notificationSaga(),
    smsSaga(),
    chemistCumulativeProductiveCallReportSaga(),
    gpsSaga(),
    manageDCRSaga(),
    tpVsActualRouteReportSaga(),
    registrationApprovalSaga(),
    rewardMasterSaga(),
    advertiseSaga(),
    chemistVisitsSaga(),
    invoiceSaga(),
    orderStatusSaga(),
    redemptionApprovalSaga(),
    updatePointsSaga(),
    empRouteSaga(),
    attendanceReportSaga(),
    claimRewardReportSaga(),
    targetSaga(),
    chemistProfileSaga(),
    monthlyExpenseSummaryReportSaga(),
    seriesSaga(),
    videoMasterSaga(),
    documentTypeSaga(),
    termsAndConditionsSaga(),
    videoSummary(),
    feature(),
    selfi(),
    questionType(),
    surveyMaster(),
    surveyReport(),
    PointsConfig(),
    CustomerOrder(),
    MyOrder(),
    MenuRoleSaga(),
    DefaultSecondarySaga(),
    itemWiseSalesReportSaga(),
    topCustomerReportSaga(),
    primaryPurchaseSaga(),
    gpsSmsTrackSaga(),
    primaryVsSecondaryReportSaga(),
    smartSetuAppReportSaga(),
    primaryVsClaimReportSaga(),
    employeeRefMapingReportSaga(),
    primaryVsClaimReportSaga(),
    qrMasterSaga(),
    getDepoListSaga(),
    getClosingStockListSaga(),
    getMonthlySalesReportSaga(),
    ftpFileReaderSaga(),
    getStockistFilterListSaga(),
    getOutStandingReportSaga(),
    getFTPDivisionListSaga(),
    guestMasterSaga(),
    locationMasterSaga(),
    treatmentRoomMasterSaga(),
    patientListSaga(),
    personalDetailsSaga(),
    treatmentMasterSaga(),
    treatmentPlanMasterSaga(),
    dailytherapySaga(),
    therapySlotSaga(),
    memberShipSaga(),
    treatmentSaga(),
    mealTemplateSaga(),
    imagCarouselSaga(),
    dateWiseMealTemplateSaga(),
  ]);
}
export default rootSaga;
