import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
// import Expense from "../Approval/Expense/ExpenseListContainer";
// import ManageDCR from "../Approval/ManageDCR/ManageDCRContainer";
// import Registration from "../Approval/Registration/RegistrationContainer";
// import ApproveTourPlan from "../Approval/TourPlan/ApproveTourPlanListContainer";
import Dashboard from "../Dashboard/DashoboardContainer";
// import ApplyLeave from "../Emplyoee/ApplyLeave/ApplyLeaveListContainer";
// import DCR from "../Emplyoee/DCR/DCRContainer";
// import Target from "../Emplyoee/Target/TargetListContainer";
// import ViewExpense from "../Emplyoee/Expense/ExpenseViewListContainer";
// import GPSTrack from "../GPS/GPSTrack/GPSTrackContainer";
// import ManagerVsTeam from "../GPS/ManagerVsTeam/ManagerVsTeamContainer";
// import Advertise from "../Manage/Advertise/AdvertiseContainer";
// import UnlockDCR from "../Manage/UnlockDCR/UnlockDCRListContainer";
// import UserPanel from "../Manage/UserPanel/UserPanelListContainer";
import Area from "../Masters/Area/AreaListContainer";
// import Chemist from "../Masters/Chemist/ChemistListContainer";
import City from "../Masters/City/CityListContainer";
import Designation from "../Masters/Designation/DesignationListContainer";
// import DeviceConfiguration from "../Masters/DeviceConfiguration/DeviceConfigurationListContainer";
import Division from "../Masters/Division/DivisionListContainer";
import Employee from "../Masters/Employee/EmployeeListContainer";
import Guest from "../Masters/Guest/GuestListContainer";
import Booking from "../Masters/Patient/PatientListContainer";
import RoomTariff from "../Masters/RoomTariff/RoomTariffListContainer";
// import ExpenseConfiguration from "../Masters/ExpenseConfiguration/ExpenseConfigurationListContainer";
// import Holiday from "../Masters/Holiday/HolidayListContainer";
import Item from "../Masters/Item/ItemListContainer";
// import ItemPrice from "../Masters/itemPrice/itemPriceContainer";
// import Scheme from "../Masters/Scheme/SchemeListContainer";
import State from "../Masters/State/StateListContainer";
// import Stockist from "../Masters/Stockist/StockistListContainer";
// import AddBroadcast from "../Messaging/AddBroadcast/AddBroadcastListContainer";
// import BroadcastMobileNews from "../Messaging/BroadcastMobileNews/BroadcastMobileNewsListContainer";
// import ChemistCumulativeProductiveCalls from "../Reports/ChemistCumulativeProductiveCalls/ChemistCumulativeProductiveCallsContainer";
// import LeaveReport from "../Reports/LeaveReport/LeaveReportContainer";
// import TPvsActualRouteReport from "../Reports/TPvsActualRouteReport/TPvsActualRouteReportContainer";
// import TPvsAutovsDCRReport from "../Reports/TPvsAutovsDCRReport/TPvsAutovsDCRContainer";
// import ChemistVisits from "../Reports/ChemistVisits/ChemistVisitsContainer";
// import AssignChemistToRoute from "../Route/AssignChemistToRoute/AssignChemistToRouteListContainer";
// import AssignRoute from "../Route/AssignRoute/AssignRouteListContainer";
// import AssignStockistToEmployeeList from "../Route/AssignStockistToEmployee/AssignStockistToEmployeeListContainer";
// import MergeRoute from "../Route/MergeRoute/MergeRouteListContainer";
// import TransferRoutesToEmployee from "../Route/TransferRoutesToEmployee/TransferRoutesToEmployeeContainer";
// import ManagerTourPlan from "../TourPlan/ManagerTourPlan/ManagerTourPlanContainer";
// import SLTourPlan from "../TourPlan/SLTourPlan/SLTourPlanContainer";
// import Reward from "../Masters/Reward/RewardListContainer";
// import Invoice from "../Sales/Invoice/InvoiceContainer";
// import Redemption from "../Approval/Redemption/RedemptionContainer";
// import Order from "../Sales/Order/OrderContainer";
// import UpdatePoints from "../Manage/Update Points/UpdatePointContainer";
// import EmpRoute from "../Route/EmpRoute/EmpRouteContainer";
// import Attendance from "../Reports/Attendance/AttendanceContainer";
// import ChemistProfile from "../Approval/ChemistProfile/ChemistProfileContainer";
// import MonthlyExpenseSummary from "../Reports/MonthlyExpenseSummary/MonthlyExpenseSummaryContainer";
// import Series from "../Manage/VideoSeriesMaster/VideoSeriesMasterContainer";
// import VideoMaster from "../Manage/VideoMaster/VideoMasterContainer";
// import DocumentType from "../Masters/DocumentType/DocumentTypeContainer";
// import TermsAndConditions from "../Manage/TermsAndConditions/TermsAndConditionsContainer";
// import { PlayCircleOutlineTwoTone } from "@material-ui/icons";
// import VideoSummary from "../Reports/VideoSummary/VideoSummaryContainer";
// import Feature from "../Manage/Feature/FeatureContainer";
// import Selfie from "../Approval/Selfie/SelfieContainer";
// import QuestionType from "../Survey/QuestionType/QuestionTypeContainer";
// import SurveyMaster from "../Survey/SurveyMaster/SurveyMasterContainer";
// import SurveyReport from "../Survey/SurveyReport/SurveyReportContainer";
// import PointsConfig from "../Manage/PointsConfig/PointsConfigContainer";
// import MenuRole from "../Manage/MenuRole/MenuRoleContainer";
// import CustomerOrder from "../Sales/CustomerOrder/OrderContainer";
// import MyOrder from "../Sales/MyOrder/MyOrderContainer";
// import DefaultSecondary from "../Manage/DefaultSecondary/DefaultSecondaryContainer";
// import ClaimReward from "../Reports/ClaimReward/ClaimRewardContainer";
// import ItemWiseSales from "../Reports/ItemWiseSales/ItemWiseSalesContainer";
// import TopCustomer from "../Reports/TopCustomer/TopCustomerContainer";
// import PrimaryPurchase from "../Manage/PrimaryPurchase/PrimaryPurchaseContainer";
// import GPSSMSTrack from "../GPS/GPSSMSTrack/GPSSMSTrackContainer";
// import PrimaryVsSecondary from "../Reports/PrimaryVsSecondary/PrimaryVsSecondaryContainer";
// import SmartSetuApp from "../Reports/SmartSetuApp/SmartSetuAppContainer";
// import PrimaryVsClaim from "../Reports/PrimaryVsClaim/PrimaryVsClaimContainer";
// import EmployeeRefMapping from "../Reports/EmployeeRefMapping/EmployeeRefMappingContainer";
// import QR from "../Masters/QR/QRListContainer";
// import ClosingStock from "../Reports/ClosingStock/ClosingStockContainer";
// import SalesReport from "../Reports/FTPSales/FTPSalesReportContainer";
// import Outstanding from "../Reports/OutStanding/OutStandingContainer";
import RoomCategory from "../Masters/RoomCategory/RoomCategoryContainer";
import RoomMaster from "../Masters/RoomMaster/RoomMasterContainer";
import KeyMaster from "../Masters/KeyMaster/KeyMasterContainer";
import AmenityMaster from "../Masters/AmenityMaster/AmenityMasterContainer";
import ManageBooking from "../Manage/ManageBooking/ManageBookingContainer";
import DateWiseMealTemplate from "../Manage/DateWiseMealTemplate/DateWiseMealTemplateContainer"
import LocationMaster from "../Masters/LocationMaster/LocationListContainer";
import TreatmentPlanMaster from "../Masters/TreatmentPlanMaster/TreatmentPlanMasterContainer"
import MealTemplate from "../Masters/MealTemplate/MealTemplateContainer"
import DietMaster from "../Masters/DietMaster/DietListContainer"
import DiseaseMaster from "../Masters/Disease/DiseaseContainer";
import TreatmentMaster from "../Masters/Treatmentmaster/TreatmentMasterContainer";
import LeaveApproval from "../Masters/LeaveApproval/LeaveApprovalListContainer"
import LeaveMaster from "../Employee/Leave/LeaveListContainer";
import TreatmentTempleteMaster from "../Masters/TreatmentTempleteMaster/TreatmentTempleteMasterContainer";
import TreatmentRoomMaster from "../Masters/TreatmentRoomMaster/TreatmentRoomMasterContainer"
import DailyTherapy from "../Masters/DailyTherapy/DailyTherapyContainer"
import TherapyTypeMaster from "../Masters/TherapyTypeMaster/TherapyTypeContainer";
import TherapySlotMaster from "../Masters/TherapySlotMaster/TherapySlotContainer";
import MemberShipMaster from "../Masters/MemberShipMaster/MemberShipContainer"
import RoomRateMaster from "../Masters/RoomRateMaster/RoomRateListContainer";
import HolidayMaster from "../Masters/Holiday/HolidayListContainer";

/**
 * @author Tejal Sali,Khushbu Shah
 */
export default function MainPageRouter(props) {
  window.history.pushState(null, null, window.location.href);
  useEffect(() => {
    window.onpopstate = function (e) {
      window.history.go(1);
    };
  }, []);
  return (
    <div>
      <Switch>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/master/employee" component={Employee} />
          <Route
            path="/manage/guest"
            // component={Patient}
            render={() => (
              <Guest
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/manage/treatment"
            // component={Patient}
            render={() => (
              <Booking
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/manage/dateWiseMealTemplate"
            render={() => (
              <DateWiseMealTemplate
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/master/roomTariff"
            // component={Patient}
            render={() => (
              <RoomTariff
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />

          <Route path="/master/division" component={Division} />
          <Route path="/master/locationMaster" component={LocationMaster} />
          <Route path="/master/treatmentPlan" component={TreatmentPlanMaster} />
          <Route path="/master/mealTemplate" component={MealTemplate} />
          <Route path="/master/TreatmentRoomMaster" component={TreatmentRoomMaster} />
          <Route path="/master/designation" component={Designation} />
          <Route path="/master/DietMaster" component={DietMaster} />
          <Route path="/master/RoomRateMaster" component={RoomRateMaster} />
          <Route path="/master/therapyTypeMaster" component={TherapyTypeMaster} />
          <Route path="/master/treatementtempletemaster" component={TreatmentTempleteMaster} />
          <Route path="/master/state" component={State} />
          <Route path="/master/city" component={City} />
          <Route path="/master/area" component={Area} />
          {/* <Route path="/master/holidayMaster" component={Holiday} /> */}
          {/* <Route path="/master/stockist" component={Stockist} /> */}
          {/* <Route
            path="/master/expenseConfiguration"
            component={ExpenseConfiguration}
          /> */}
          {/* <Route path="/manage/userPanel" component={UserPanel} />
          <Route path="/manage/unlockDCR" component={UnlockDCR} /> */}
          {/* <Route
            path="/master/deviceConfiguration"
            component={DeviceConfiguration}
          /> */}
          {/* <Route path="/master/chemist" component={Chemist} /> */}
          <Route path="/master/item" component={Item} />
          {/* <Route path="/master/scheme" component={Scheme} /> */}
          {/* <Route path="/master/itemPrice" component={ItemPrice} /> */}
          {/* <Route path="/master/reward" component={Reward} /> */}
          {/* <Route
            path="/gps/gpsTrack"
            render={() => (
              <GPSTrack
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          /> */}
          {/* <Route
            path="/employee/DCR"
            render={() => (
              <DCR
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          /> */}
          {/* <Route
            path="/employee/targetMaster"
            render={() => (
              <Target
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          /> */}
          {/* <Route
            path="/gps/managerVsTeam"
            render={() => (
              <ManagerVsTeam
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          /> */}
          {/* <Route path="/employee/applyLeave" component={ApplyLeave} /> */}
          {/* <Route
            path="/employee/expense"
            render={() => (
              <ViewExpense
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          /> */}
          {/* <Route path="/tourPlan/slTourPlan" component={SLTourPlan} />
          <Route path="/tourPlan/managerTourPlan" component={ManagerTourPlan} />
          <Route path="/route/assignRoute" component={AssignRoute} />
          <Route
            path="/route/assignStockistToEmployee"
            component={AssignStockistToEmployeeList}
          />
          <Route path="/route/mergeRoute" component={MergeRoute} />
          <Route
            path="/route/assignChemistToRoute"
            component={AssignChemistToRoute}
          />
          <Route path="/route/empRoute" component={EmpRoute} /> */}
          {/* <Route
            path="/messaging/BroadcastMobileNews"
            component={BroadcastMobileNews}
          /> */}
          {/* <Route path="/messaging/AddBroadcast" component={AddBroadcast} /> */}
          {/* <Route
            path="/approval/expense"
            render={() => (
              <Expense
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/approval/chemistProfileUpdate"
            render={() => (
              <ChemistProfile
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          /> */}
          {/* <Route path="/" component={Selfie} /> */}

          {/* <Route path="/approval/manageDCR" component={ManageDCR} />
          <Route
            path="/reports/TPvsAutovsDCRReport"
            render={() => (
              <TPvsAutovsDCRReport
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route path="/approval/tp" component={ApproveTourPlan} />
          <Route
            path="/reports/chemistCumulativeProductiveCalls"
            render={() => (
              <ChemistCumulativeProductiveCalls
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/reports/leaveReport"
            render={() => (
              <LeaveReport
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/reports/tpVsActualRouteReport"
            render={() => (
              <TPvsActualRouteReport
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/reports/chemistvisit"
            render={() => (
              <ChemistVisits
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/reports/attendance"
            render={() => (
              <Attendance
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/reports/monthlyExpenseSummary"
            render={() => (
              <MonthlyExpenseSummary
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/route/transferRoutesToEmployee"
            component={TransferRoutesToEmployee}
          />

          <Route path="/approval/registration" component={Registration} />

          <Route path="/manage/advertise" component={Advertise} />

          <Route path="/manage/updatePoints" component={UpdatePoints} />

          <Route path="/manage/videoSeriesMaster" component={Series} />
          <Route path="/manage/videoMaster" component={VideoMaster} />
          <Route path="/manage/tandc" component={TermsAndConditions} />
          <Route
            path="/sales/invoice"
            render={() => (
              <Invoice
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />

          <Route
            path="/sales/orderStatus"
            render={() => (
              <Order
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />

          <Route
            path="/approval/redemption"
            render={() => (
              <Redemption
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          /> */}

          {/* <Route
            path="/master/documentType"
            render={() => (
              <DocumentType
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          /> */}

          {/* <Route
            path="/reports/videoSummary"
            render={() => (
              <VideoSummary
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route path="/approval/selfie" component={Selfie} />

          <Route path="/manage/feature" component={Feature} />

          <Route path="/manage/pointsConfig" component={PointsConfig} />

          <Route path="/survey/questionType" component={QuestionType} />

          <Route path="/survey/surveyMaster" component={SurveyMaster} />

          <Route path="/survey/surveyReport" component={SurveyReport} />

          <Route path="/manage/menuRole" component={MenuRole} />

          <Route path="/sales/customerOrder" component={CustomerOrder} />

          <Route path="/sales/myOrder" component={MyOrder} />

          <Route path="/manage/defaultSecondary" component={DefaultSecondary} />

          <Route path="/reports/claimReward" component={ClaimReward} />

          <Route path="/reports/itemWiseSales" component={ItemWiseSales} />

          <Route path="/reports/TopCustomer" component={TopCustomer} />

          <Route path="/manage/primaryPurchase" component={PrimaryPurchase} />

          <Route path="/gps/gpsSmsTrack" component={GPSSMSTrack} />

          <Route path="/reports/PrimaryVsSecondary" component={PrimaryVsSecondary} />

          <Route path="/reports/SmartSetuApp" component={SmartSetuApp} />

          <Route path="/reports/PrimaryVsClaim" component={PrimaryVsClaim} />

          <Route path="/reports/EmployeeRefMapping" component={EmployeeRefMapping} /> */}

          {/* <Route path="/master/qr" component={QR} /> */}

          {/* <Route
            path="/reports/ClosingStock"
            render={() => (
              <ClosingStock
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/reports/Sales"
            render={() => (
              <SalesReport
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/reports/OutStanding"
            render={() => (
              <Outstanding
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          /> */}
          <Route
            path="/master/roomCategory"
            render={() => (
              <RoomCategory
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/master/roomMaster"
            render={() => (
              <RoomMaster
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/master/keyMaster"
            render={() => (
              <KeyMaster
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/master/amenityMaster"
            render={() => (
              <AmenityMaster
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/manage/manageBooking"
            render={() => (
              <ManageBooking
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/master/diseaseMaster"
            render={() => (
              <DiseaseMaster
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/master/treatmentMaster"
            render={() => (
              <TreatmentMaster
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/employee/applyLeave"
            render={() => (
              <LeaveMaster
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/approval/leaveApproval"
            render={() => (
              <LeaveApproval
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/master/dailyTherapyMaster"
            render={() => (
              <DailyTherapy
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/master/therapyTypeMaster"
            render={() => (
              <TherapyTypeMaster
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/master/therapySlotMaster"
            render={() => (
              <TherapySlotMaster
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/master/memberShipMaster"
            render={() => (
              <MemberShipMaster
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route
            path="/master/holidayMaster"
            render={() => (
              <HolidayMaster
                openDrawer={props.openDrawer}
                closeDrawer={props.closeDrawer}
              />
            )}
          />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Switch>
    </div>
  );
}
