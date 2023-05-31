/**
 * Unique constant names for all the actions will be given here
 */

//#region User Actions
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const FORCE_LOGOUT = "FORCE_LOGOUT";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const GET_USERPROFILE_DATA = "GET_USERPROFILE_DATA";
//#endregion User Actions

//#region Refresh Token
export const START_REFRESH_TOKEN_SAGA = "START_REFRESH_TOKEN_SAGA";
export const GET_REFRESH_TOKEN = "GET_REFRESH_TOKEN";
export const GET_REFRESH_TOKEN_SUCCESS = "GET_REFRESH_TOKEN_SUCCESS";
//#endregion Refresh Token

//#region General Actions
export const SET_CURRENTMENU = "SET_CURRENTMENU";
export const SHOW_DISPLAY_MESSAGE = "SHOW_DISPLAY_MESSAGE";
export const HIDE_DISPLAY_MESSAGE = "HIDE_DISPLAY_MESSAGE";
//#endregion General Actions

//#region Lookup Actions
export const GET_STATIC_LOOKUP = "GET_STATIC_LOOKUP";
export const GET_STATES = "GET_STATES";
export const GET_STATES_SUCCESS = "GET_STATES_SUCCESS";
export const UPDATE_STATES = "UPDATE_STATES";
export const GET_CITIES = "GET_CITIES";
export const GET_CITIES_SUCCESS = "GET_CITIES_SUCCESS";
export const UPDATE_CITIES = "UPDATE_CITIES";
export const GET_EMPLOYEES = "GET_EMPLOYEES";
export const GET_EMPLOYEES_SUCCESS = "GET_EMPLOYEES_SUCCESS";
export const UPDATE_EMPLOYEES = "UPDATE_EMPLOYEES";
export const SINGLE_EMPLOYEE = "SINGLE_EMPLOYEE";
export const GET_AREAS = "GET_AREAS";
export const GET_DIVISIONS = "GET_DIVISIONS";
export const GET_STOCKISTASSIGNEDDIVISION = "GET_STOCKISTASSIGNEDDIVISION";
export const GET_ALLDIVISIONS = "GET_ALLDIVISIONS";
export const GET_DESIGNATIONS = "GET_DESIGNATIONS";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_ROUTES = "GET_ROUTES";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_TOURPLAN_MONTHYEARLIST = "GET_TOURPLAN_MONTHYEARLIST";
export const GET_SL_OR_MANAGER_LIST = "GET_SL_OR_MANAGER_LIST";
export const GET_FINANCIAL_MONTHYEARLIST = "GET_FINANCIAL_MONTHYEARLIST";
export const GET_SUBORDINATES = "GET_SUBORDINATES";
export const GET_MONTHYEAR_RANGE_LIST = "GET_MONTHYEAR_RANGE_LIST";
export const GET_SCHEMES = "GET_SCHEMES";
export const GET_STOCKIST = "GET_STOCKIST";
export const GET_SUPERSTOCKIST = "GET_SUPERSTOCKIST";
//#endregion Lookup Actions

//#region Holiday Master
export const GET_HOLIDAYLIST = "GET_HOLIDAYLIST";
export const ADD_HOLIDAY = "ADD_HOLIDAY";
export const UPDATE_HOLIDAY = "UPDATE_HOLIDAY";
export const DELETE_HOLIDAY = "DELETE_HOLIDAY";
export const GET_HOLIDAY_YEARLIST = "GET_HOLIDAY_YEARLIST";
export const EXPORT_HOLIDAY_LIST = "EXPORT_HOLIDAY_LIST";
export const IMPORT_HOLIDAY_LIST = "IMPORT_HOLIDAY_LIST";
//#endregion Holiday Master

//#region Master-State
export const GET_STATELIST = "GET_STATELIST";
export const ADD_STATE = "ADD_STATE";
export const UPDATE_STATE = "UPDATE_STATE";
//#endregion Master-State

//#region Master-Division
export const GET_DIVISIONLIST = "GET_DIVISIONLIST";
export const ADD_DIVISION = "ADD_DIVISION";
export const UPDATE_DIVISION = "UPDATE_DIVISION";
//#endregion Master-Division

//#region Master-Location
export const GET_LOCATIONLIST = "GET_LOCATIONLIST";
export const ADD_LOCATION = "ADD_LOCATION";
export const UPDATE_LOCATION = "UPDATE_LOCATION";
export const DELETE_LOCATION = "DELETE_LOCATION";
//#endregion Master-Location

//#region Master-Treatment
export const GET_TREATMENTTEMPLATE_CATEGORIES = "GET_TREATMENTTEMPLATE_CATEGORIES";
export const GET_TREATMENTLIST_DATA = "GET_TREATMENTLIST_DATA";
export const GET_DIETLIST_DATA = "GET_DIETLIST_DATA";
export const ADD_TREATMENTPLAN = "ADD_TREATMENTPLAN";
//#endregion Master-Treatment

//#region PatientName
export const GET_PATIENTNAME = "GET_PATIENTNAME";
//#end-region PatientName

//#region PatientDetails
export const GET_PERSONALDETAILS = "GET_PERSONALDETAILS";
//#end-region PatientDetails

//#region Treatment-Treatment Section
export const GET_DAYWISEDATE = "GET_DAYWISEDATE";
export const GET_MORNINGTHERAPY = "GET_MORNINGTHERAPY";
export const GET_DEFAULTTHERAPY = "GET_DEFAULTTHERAPY";
export const GET_ADDITIONALTHERAPY = "GET_ADDITIONALTHERAPY";
export const GET_DIETPLANNAME = "GET_DIETPLANNAME";
export const GET_EXISTINGRECORD = "GET_EXISTINGRECORD";
export const ADD_TREATMENTSECTIONDATA = "ADD_TREATMENTSECTIONDATA";
export const GET_MEALTYPENAME = "GET_MEALTYPENAME";
//#end-region Treatment-Treatment Section

//#region Master-City
export const GET_CITYLIST = "GET_CITYLIST";
export const ADD_CITY = "ADD_CITY";
export const UPDATE_CITY = "UPDATE_CITY";
//#endregion Master-City

//#region Master-Designation
export const GET_DESIGNATIONLIST = "GET_DESIGNATIONLIST";
export const ADD_DESIGNATION = "ADD_DESIGNATION";
export const UPDATE_DESIGNATION = "UPDATE_DESIGNATION";
//#endregion Master-Designation

//#region Master-Area
export const GET_AREALIST = "GET_AREALIST";
export const ADD_AREA = "ADD_AREA";
export const UPDATE_AREA = "UPDATE_AREA";
//#endregion Master-Area

//#region Route-Assign Route
export const GET_ROUTELIST = "GET_ROUTELIST";
export const ASSIGN_ROUTE = "ASSIGN_ROUTE";
export const UPDATE_ASSIGNED_ROUTE = "UPDATE_ASSIGNED_ROUTE";
export const EXPORT_ROUTE_LIST = "EXPORT_ROUTE_LIST";
export const IMPORT_ROUTE_LIST = "IMPORT_ROUTE_LIST";
//#endregion Route-Assign Route

//#region Route-Assign Chemist-To-New-Route
export const ASSIGN_CHEMIST_TO_ROUTE = "ASSIGN_CHEMIST_TO_ROUTE";
//#endregion Route-Assign Chemist-To-New-Route

//#region Chemist Master
export const GET_CHEMISTLIST = "GET_CHEMISTLIST";
export const ADD_CHEMIST = "ADD_CHEMIST";
export const UPDATE_CHEMIST = "UPDATE_CHEMIST";
//#endregion Chemist Master

// #region Master-Employee
export const GET_EMPLOYEELIST = "GET_EMPLOYEELIST";
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";
export const GET_MOB_OWNER_NAME = "GET_MOB_OWNER_NAME";
// #region Master-Employee

// #region Master-Stockist
export const GET_STOCKISTLIST = "GET_STOCKISTLIST";
export const ADD_STOCKIST = "ADD_STOCKIST";
export const UPDATE_STOCKIST = "UPDATE_STOCKIST";
// #region Master-Stockist

// #region Employee-Leave
export const GET_LEAVELIST = "GET_LEAVELIST";
export const ADD_LEAVE = "ADD_LEAVE";
export const DELETE_LEAVE = "DELETE_LEAVE";
export const UPDATE_LEAVE = "UPDATE_LEAVE";
// #region Employee-Leave

// #region Master-DeviceConfiguration
export const GET_DEVICECONFIGURATIONLIST = "GET_DEVICECONFIGURATIONLIST";
export const UPDATE_DEVICECONFIGURATIONLIST = "UPDATE_DEVICECONFIGURATIONLIST";
// #region Master-DeviceConfiguration

// #region Manage-UserPanel
export const GET_USERPANELLIST = "GET_USERPANELLIST";
export const UPDATE_USERPANELLIST = "UPDATE_USERPANELLIST";
// #region Manage-UserPanel

// #region Master-Item
export const GET_ITEMLIST = "GET_ITEMLIST";
export const ADD_ITEM = "ADD_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const EXPORT_ITEM_LIST = "EXPORT_ITEM_LIST";
export const IMPORT_ITEM_LIST = "IMPORT_ITEM_LIST";
// #region Master-Item

// #region Master-Scheme
export const GET_SCHEMELIST = "GET_SCHEMELIST";
export const GET_AVAILABLE_ITEMLIST = "GET_AVAILABLE_ITEMLIST";
export const ADD_SCHEME = "ADD_SCHEME";
export const UPDATE_SCHEME = "UPDATE_SCHEME";
export const UPDATE_SCHEME_ITEMS = "UPDATE_SCHEME_ITEMS";
// #region Master-Scheme

// #region Master-ItemPrice
export const GET_ITEM_PRICELIST = "GET_ITEM_PRICELIST";
export const ADD_ITEMPRICE = "ADD_ITEMPRICE";
export const GET_ITEMPRICE_EXPORTDATES = "GET_ITEMPRICE_EXPORTDATES";
export const EXPORT_ITEM_PRICELIST = "EXPORT_ITEM_PRICELIST";
// #region Master-ItemPrice

// #region TourPlan-SLTourPlan
export const GET_SL_TOURPLAN = "GET_SL_TOURPLAN";
export const SAVE_SL_TOURPLAN = "SAVE_SL_TOURPLAN";
export const GET_SL_WORKINGWITH = "GET_SL_WORKINGWITH";
export const SAVE_REJECT_SL_TOURPLAN = "SAVE_REJECT_SL_TOURPLAN";
// #endregion TourPlan-SLTourPlan

// #region TourPlan-ManagerTourPlan
export const GET_MANAGER_TOURPLAN = "GET_MANAGER_TOURPLAN";
export const SAVE_MANAGER_TOURPLAN = "SAVE_MANAGER_TOURPLAN";
export const GET_MANAGER_WORKINGWITH = "GET_MANAGER_WORKINGWITH";
export const SAVE_REJECT_MANAGER_TOURPLAN = "SAVE_REJECT_MANAGER_TOURPLAN";
// #endregion TourPlan-ManagerTourPlan

// #region Dashboard
export const GET_DASHBOARD_SUMMARY_DATA = "GET_DASHBOARD_SUMMARY_DATA";
export const GET_DASHBOARD_CHEMIST_BIRTHDAY_LIST =
  "GET_DASHBOARD_CHEMIST_BIRTHDAY_LIST";
export const GET_TP_APPROVAL_LIST = "GET_TP_APPROVAL_LIST";
export const UPDATE_TP_STATUS = "UPDATE_TP_STATUS";
export const GET_DASHBOARD_COUNT_DATA = "GET_DASHBOARD_COUNT_DATA";
export const GET_DASHBOARD_STATEWISE_COUNT_DATA =
  "GET_DASHBOARD_STATEWISE_COUNT_DATA";
export const GET_MONTHLYSTATUS_ORDERCOUNT = "GET_MONTHLYSTATUS_ORDERCOUNT";
export const GET_DASHBOARD_STATEWISE_DATA = "GET_DASHBOARD_STATEWISE_DATA";
// #endregion Dashboard

// #region Employee-DCR
export const GET_DCR_CALENDAR_DATA = "GET_DCR_CALENDAR_DATA";
export const GET_DCR_PREVIEW_DATA = "GET_DCR_PREVIEW_DATA";
export const UNLOCK_DCR_REQUEST = "UNLOCK_DCR_REQUEST";
export const GET_POB_DATA = "GET_POB_DATA";
export const SAVE_POB_DATA = "SAVE_POB_DATA";
export const GET_EXPENSE_BYROUTE = "GET_EXPENSE_BYROUTE";
export const SAVE_EXPENSE = "SAVE_EXPENSE";
export const CHECK_PENDING_LEAVE_APPROVALS = "CHECK_PENDING_LEAVE_APPROVALS";
export const GET_ADD_DCR_ROUTES = "GET_ADD_DCR_ROUTES";
// #endregion Employee-DCR

// #region Master expense-config
export const GET_EXPENSE_CONFIG = "GET_EXPENSE_CONFIG";
export const SAVE_EXPENSE_CONFIG = "SAVE_EXPENSE_CONFIG";
// #endregion Master expense-config

// #endregion Manage Unlock-DCR
export const GET_UNLOCK_DCR_DATA = "GET_UNLOCK_DCR_DATA";
export const UPDATE_UNLOCK_DCR = "UPDATE_UNLOCK_DCR";
// #endregion Manage Unlock-DCR

// #region Messaging broadcast-mobile-news
export const GET_BROADCAST_MOBILE_NEWS_LIST = "GET_BROADCAST_MOBILE_NEWS_LIST";
export const ADD_BROADCAST_MOBILE_NEWS_LIST = "ADD_BROADCAST_MOBILE_NEWS_LIST";
export const UPDATE_BROADCAST_MOBILE_NEWS_LIST =
  "UPDATE_BROADCAST_MOBILE_NEWS_LIST";
// #endregion Messaging broadcast-mobile-news

// #region Approval expense-approval
export const GET_EXPENSE_APPROVAL_LIST = "GET_EXPENSE_APPROVAL_LIST";
export const GET_EXPENSE_APPROVAL_LIST_OF_EMPLOYEE =
  "GET_EXPENSE_APPROVAL_LIST_OF_EMPLOYEE";
export const UPDATE_EXPENSE_APPROVAL = "UPDATE_EXPENSE_APPROVAL";
export const GET_EXPENSE_APPROVAL_LIST_OF_EMPLOYEE_ASYNC =
  "GET_EXPENSE_APPROVAL_LIST_OF_EMPLOYEE_ASYNC";
// #endregion Approval expense-approval

// #region Route - Merge Route
export const MERGE_ROUTES = "MERGE_ROUTES";
// #region Route - Merge Route

// #region Route stockist-to-employee
export const GET_STOCKISTLIST_OF_STATE_EMPLOYEE =
  "GET_STOCKISTLIST_OF_STATE_EMPLOYEE";
export const ASSIGN_STOCKIST_TO_EMPLOYEE = "ASSIGN_STOCKIST_TO_EMPLOYEE";
// #endregion Route stockist-to-employee

// #region Report leave-report
export const GET_LEAVE_REPORT = "GET_LEAVE_REPORT";
// #endregion Report leave-report

// #region Report chemist-cumulative-productive-calls
export const GET_CHEMIST_CUMULATIVE_PROD_CALLS_LIST =
  "GET_CHEMIST_CUMULATIVE_PROD_CALLS_LIST";
// #endregion Report chemist-cumulative-productive-calls

// #region Report-TPvsAutosvDCR Expense Report
export const GET_EXPENSE_REPORT_LIST = "GET_EXPENSE_REPORT_LIST";
export const GET_EXPENSE_REPORT_COMPARISON_DATA =
  "GET_EXPENSE_REPORT_COMPARISON_DATA";
// #endregion Report-TPvsAutosvDCR Expense Report

// #region Route transfer-routes-to-employee
export const TRANSFER_ROUTES_TO_EMPLOYEE = "TRANSFER_ROUTES_TO_EMPLOYEE";
// #endregion Route transfer-routes-to-employee

// #region Notifications
export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const GET_NOTIFICATION_COUNT = "GET_NOTIFICATION_COUNT";
// #endregion Notifications

//#region SMS
export const SEND_SMS = "SEND_SMS";
//#endregion SMS

//#region GPS - GPS Track
export const GET_GPS_TRACK_DATA = "GET_GPS_TRACK_DATA";
export const GET_GPS_LOCATION_HISTORY_DATA = "GET_GPS_LOCATION_HISTORY_DATA";
export const GET_GPS_TRACK_DATA_BY_ATETIMEANDEMPLOYEE =
  "GET_GPS_TRACK_DATA_BY_ATETIMEANDEMPLOYEE";
//#endregion GPS - GPS Track

//#region Approve manage-DCR
export const MANAGE_DCR = "MANAGE_DCR";
//#endregion Approve manage-DCR

//#region GPS - Manager Vs Team
export const GET_MANAGER_VS_TEAM_DATA = "GET_MANAGER_VS_TEAM_DATA";
//#endregion GPS - Manager Vs Team

//#region Report - Tp vs Actual Route
export const GET_TP_VS_ACTUAL_DATA = "GET_TP_VS_ACTUAL_DATA";
export const GET_CHEMIST_VISITS_DATA = "GET_CHEMIST_VISITS_DATA";
//#endregion Report - Tp vs Actual Route

//#region Approve - Registration
export const GET_REGISTRATION_APPROVAL_DATA = "GET_REGISTRATION_APPROVAL_DATA";
export const UPDATE_REGISTRATION_REQ = "UPDATE_REGISTRATION_REQ";
export const GET_MATCHING_CHEMIST_DATA = "GET_MATCHING_CHEMIST_DATA";
//#endregion Report - Registration

//#region Master - Reward
export const GET_REWARDLIST = "GET_REWARDLIST";
export const ADD_REWARD = "ADD_REWARD";
export const UPDATE_REWARD = "UPDATE_REWARD";
//#endregion Master - Reward

//#region Manage - Advertise
export const SAVE_ADVERTISE_IMAGES = "SAVE_ADVERTISE_IMAGES";
export const GET_ADVERTISE_IMAGES = "GET_ADVERTISE_IMAGES";
//#endregion Manage - Advertise

//#region Sales - Invoice
export const GET_INVOICE_LIST = "GET_INVOICE_LIST";
export const UPDATE_INVOICE = "UPDATE_INVOICE";
export const CHECK_DUPLICATE_INVOICE = "CHECK_DUPLICATE_INVOICE";
export const APPROVE_RETURN_INVOICE = "APPROVE_RETURN_INVOICE";
export const UPDATE_RETURN_INVOICE = "UPDATE_RETURN_INVOICE";
export const GET_INVOICEITEMDATA = "GET_INVOICEITEMDATA";
//#endregion Sales - Invoice

//#region Sales - Order
export const GET_ORDER_LIST = "GET_ORDER_LIST";
export const GET_ORDERDATA_BYID = "GET_ORDERDATA_BYID";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const GET_ORDERITEMDATA_BYID = "GET_ORDERITEMDATA_BYID";
//#endregion Sales - Order

//#region Approval - Redemption
export const GET_REDEMPTION_LIST = "GET_REDEMPTION_LIST";
export const UPDATE_REDEMPTION = "UPDATE_REDEMPTION";
export const GET_REDEMPTION_APPROVALMESSAGE = "GET_REDEMPTION_APPROVALMESSAGE";
//#endregion Approval - Redemption

//#region Manage - Update Points
export const UPDATE_POINTS = "UPDATE_POINTS";
//#endregion Manage - Update Points

//#region Route - Emp Route
export const GET_EMPROUTELIST = "GET_EMPROUTELIST";
export const DOWNLOAD_EMPROUTELIST = "DOWNLOAD_EMPROUTELIST";
//#endregion Route - Emp Route

//#region Report - Attendance
export const GET_ATTENDANCE = "GET_ATTENDANCE";
//#endregion Report - Attendance

//#region Report - Target
export const GET_TARGET = "GET_TARGET";
export const INSERT_TARGET = "INSERT_TARGET";
//#endregion Report - Target

//#region Approval - Chemist Profile
export const GET_CHEMIST_PROFILE_LIST = "GET_CHEMIST_PROFILE_LIST";
export const GET_CHEMIST_PROFILE_DATA = "GET_CHEMIST_PROFILE_DATA";
export const UPDATE_CHEMIST_PROFILE = "UPDATE_CHEMIST_PROFILE";
//#endregion Approval - Chemist Profile

export const GET_WORKFLOW = "GET_WORKFLOW";

export const GET_LOOKUP_ROUTES = "GET_LOOKUP_ROUTES";

// Monthly Expense Summary Report Start
export const GET_MONTHLY_EXPENSE_SUMMARY_REPORT_Data =
  "GET_MONTHLY_EXPENSE_SUMMARY_REPORT_Data";
// Monthly Expense Summary Report End

//#region Manage - Series
export const GET_SERIESLIST = "GET_SERIESLIST";
export const ADD_SERIES = "ADD_SERIES";
//#endregion Manage - Series

export const GET_DOCUMENTTYPELIST = "GET_DOCUMENTTYPELIST";
export const ADD_DOCUMENTTYPE = "ADD_DOCUMENTTYPE";
export const UPDATE_DOCUMENTTYPE = "UPDATE_DOCUMENTTYPE";

//#region Manage - Video
export const GET_VIDEOLIST = "GET_VIDEOLIST";
export const ADD_VIDEOSERIES = "ADD_VIDEOSERIES";
export const GET_SERIESDATA = "GET_SERIESDATA";
//#endregion Manage - Video

//#region Manage - TANDC
export const GET_TANDC = "GET_TANDC";
export const SAVE_TANDC = "SAVE_TANDC";
//#endregion Manage - TANDC

/**DCR Preview Async */
export const DCR_PREVIEW_ASYNC = "DCR_PREVIEW_ASYNC";
export const DCR_CALENDER_ASYNC = "DCR_CALENDER_ASYNC";

// Video Summary Report Start
export const GET_VIDEO_SUMMARY_REPORT_DATA = "GET_VIDEO_SUMMARY_REPORT_DATA";
export const GET_VIDEO_SUMMARY_DETAILS_DATA = "GET_VIDEO_SUMMARY_DETAILS_DATA";
// Video Summary Report End

export const GET_FEATURE_DATA = "GET_FEATURE_DATA";
export const SAVE_FEATURE_DATA = "SAVE_FEATURE_DATA";

export const GET_SELFIE_DATA = "GET_SELFIE_DATA";
export const SAVE_SELFIE_DATA = "SAVE_SELFIE_DATA";

export const GET_SURVEY_DATA = "GET_SURVEY_DATA";
export const SAVE_SURVEY_DATA = "SAVE_SURVEY_DATA";
export const GET_SURVEYQUESTION_DATA = "GET_SURVEYQUESTION_DATA";
export const GET_ANSWERGROUP_DATA = "GET_ANSWERGROUP_DATA";
export const SAVE_SURVEYQUESTION_DATA = "SAVE_SURVEYQUESTION_DATA";
export const DELETE_SURVEYQUESTION_DATA = "DELETE_SURVEYQUESTION_DATA";
export const SAVE_SURVEYCOPY_DATA = "SAVE_SURVEYCOPY_DATA";

export const GET_QUESTION_TYPE = "GET_QUESTION_TYPE";
export const SAVE_QUESTION_TYPE = "SAVE_QUESTION_TYPE";

// Get signed URL from api to upload files directly s3 bucket
export const GET_AWS_FILEUPLOAD_URL = "GET_AWS_FILEUPLOAD_URL";

export const SEND_NOTIFICATION = "SEND_NOTIFICATION";
export const SEND_FEATURE_SMS = "SEND_FEATURE_SMS";

export const GET_SURVEYREPORT_DATA = "GET_SURVEYREPORT_DATA";
export const GET_SURVEYCHEMIST_DATA = "GET_SURVEYCHEMIST_DATA";
export const GET_ACTIVESURVEY_DATA = "GET_ACTIVESURVEY_DATA";

export const GET_POINTSCONFIG_DATA = "GET_POINTSCONFIG_DATA";
export const SAVE_POINTSCONFIG_DATA = "SAVE_POINTSCONFIG_DATA";

/** Customer Orders */
export const GET_CUSTOME_RORDER_DATA = "GET_CUSTOME_RORDER_DATA";
export const GET_CUSTOME_RORDER_DATA_BYID = "GET_CUSTOME_RORDER_DATA_BYID";
export const UPDATE_CUSTOME_RORDER_DATA = "UPDATE_CUSTOME_RORDER_DATA";
/** End Customer Orders */

export const GET_MYORDER_LIST = "GET_MYORDER_LIST";
export const GET_MYORDER_ITEMPRICE = "GET_MYORDER_ITEMPRICE";
export const SAVE_MYORDER = "SAVE_MYORDER";

// Video Summary Report Start
export const GET_MENUROLE_LIST = "GET_MENUROLE_LIST";
export const REFRESH_MENU_ITEM = "REFRESH_MENU_ITEM";

export const SAVE_MENUROLE_DATA = "SAVE_MENUROLE_DATA";
// Video Summary Report End

export const GET_DEFAULT_SECONDARY = "GET_DEFAULT_SECONDARY";
export const UPDATE_DEFAULT_SECONDARY = "UPDATE_DEFAULT_SECONDARY";
export const UPDATE_DEFAULTALL_SECONDARY = "UPDATE_DEFAULTALL_SECONDARY";

export const GET_SMS_CODE = "GET_SMS_CODE";
export const GET_SMS_MESSAGE = "GET_SMS_MESSAGE";

//#region Report - Claim Reward
export const GET_CLAIMREWARD = "GET_CLAIMREWARD";
//#endregion Report - Claim Reward

//#region Report - Item Wise Sales
export const GET_ITEMWISESALES = "GET_ITEMWISESALES";
//#endregion Report - Item Wise Sales

//#region Report - Top Customer
export const GET_TOPCUSTOMER = "GET_TOPCUSTOMER";
//#endregion Report - Top Customer

//#region Primary Purchase
export const GET_PRIMARYPURCHASELIST = "GET_PRIMARYPURCHASELIST";
export const IMPORT_PRIMARYPURCHASE_LIST = "IMPORT_PRIMARYPURCHASE_LIST";
export const SAVE_PRIMARYPURCHASE = "SAVE_PRIMARYPURCHASE";
//#endregion Primary Purchase

//#region - GPS SMS Track
export const GET_GPSSMSTRACK = "GET_GPSSMSTRACK";
//#endregion - GPS SMS Track

//#region Report - Primary Vs Secondary
export const GET_PRIMARYVSSECONDARY = "GET_PRIMARYVSSECONDARY";
//#endregion Report - Primary Vs Secondary

//#region Report - Smart Setu App
export const GET_SMARTSETUAPP = "GET_SMARTSETUAPP";
//#endregion Report - Smart Setu App

//#region Report - Primary Vs Claim
export const GET_PRIMARYVSCLAIM = "GET_PRIMARYVSCLAIM";
//#endregion Report - Primary Vs Claim

//#region Report - Employee Ref Mapping
export const GET_EMPLOYEEREFMAPPING = "GET_EMPLOYEEREFMAPPING";
//#endregion Report - Employee Ref Mapping

// #region Master-QR
export const GET_QRLIST = "GET_QRLIST";
export const ADD_QR = "ADD_QR";
export const UPDATE_QR = "UPDATE_QR";
export const DELETE_QR = "DELETE_QR";
export const GENERATE_QR = "GENERATE_QR";
export const PRINTDOWNLOAD_QR = "PRINTDOWNLOAD_QR";
export const GET_QRPRINTHISTORY = "GET_QRPRINTHISTORY";
// #region Master-QR

//#region Report - Get Closing Stock
export const GET_DEPO_LIST = "GET_DEPO_LIST";
export const GET_CLOSING_STOCK_LIST = "GET_CLOSING_STOCK_LIST";
//#endregion Report -Get Closing Stock

//#region Report - Get Monthly Sales Report
export const GET_MONTHLY_SALES_DATA = "GET_MONTHLY_SALES_DATA";
export const GET_FTP_DIVISION_LIST = "GET_FTP_DIVISION_LIST";
//#endregion Report -Get Monthly Sales Report

//#region Report - Read FTP files
export const READ_FTP_FILES = "READ_FTP_FILES";
//#endregion Report - Read FTP files

//#region Report - Get OutStanding Report
export const GET_STOCKIST_FILTER_LIST = "GET_STOCKIST_FILTER_LIST";
export const GET_OUTSTANDING_REPORT = "GET_OUTSTANDING_REPORT";
//#endregion Report -Get OutStanding Report

// #region Master-Guest
export const GET_GUESTLIST = "GET_GUESTLIST";
export const ADD_GUEST = "ADD_GUEST";
export const UPDATE_GUEST = "UPDATE_GUEST";
export const guestUploadFile_getData = "guestUploadFile_getData"
// #region Master-Guest

//#region Room Category
export const GET_ROOM_CATEGORY = "GET_ROOM_CATEGORY";
export const INSERT_ROOM_CATEGORY = "INSERT_ROOM_CATEGORY";
//#endregion Room Category

//#region Room Master
export const GET_ROOM_MASTER = "GET_ROOM_MASTER";
export const SAVE_ROOM_MASTER = "SAVE_ROOM_MASTER";
export const GET_ROOM_CATEGORIES = "GET_ROOM_CATEGORIES";
export const GET_KEY_LIST = "GET_KEY_LIST";
//#endregion Room Master

//#region Diet Master
export const GET_DIET_MASTER = "GET_DIET_MASTER";
export const SAVE_DIET_MASTER = "SAVE_DIET_MASTER";
export const GET_DIET_CATEGORIES = "GET_DIET_CATEGORIES";
export const GET_DIET_DELETE = "GET_DIET_DELETE";
export const UPDATE_DIET = "UPDATE_DIET";
export const VIEW_MEALDATA = "VIEW_MEALDATA";
//#endregion Diet Master

//#region Key Master
export const GET_KEY_MASTER = "GET_KEY_MASTER";
export const SAVE_KEY_MASTER = "SAVE_KEY_MASTER";
//#endregion Key Master

//#region Amenity Master
export const GET_AMENITY_MASTER = "GET_AMENITY_MASTER";
export const SAVE_AMENITY_MASTER = "SAVE_AMENITY_MASTER";
//#endregion Amenity Master

//#region Manage Booking
export const GET_MANAGE_BOOKING = "GET_MANAGE_BOOKING";
export const SAVE_MANAGE_BOOKING = "SAVE_MANAGE_BOOKING";
export const GET_STATUS_FILTER = "GET_STATUS_FILTER";
export const GET_LATESTGUEST = "GET_LATESTGUEST";
export const GET_ROOMLIST = "GET_ROOMLIST";
export const GET_ROOMSTATUS = "GET_ROOMSTATUS";
export const GET_DEFAULTROOMSTATUS = "GET_DEFAULTROOMSTATUS";
export const GET_DEFAULTROOMCATEGORY = "GET_DEFAULTROOMCATEGORY";
export const manageBooking_getbookingData = "manageBooking_getbookingData";
export const manageBooking_getGuestBookingDetails = "manageBooking_getGuestBookingDetails";
export const manageBooking_getRoomAssignDetails = "manageBooking_getRoomAssignDetails";
export const manageBooking_updateManageBooking = "manageBooking_updateManageBooking";
export const manageBooking_deleteManageBooking = "manageBooking_deleteManageBooking";
export const manageBooking_checkedOutPerticularRoom = "manageBooking_checkedOutPerticularRoom";
//#endregion Manage Booking

//#endregion Manage Booking
//#region Disease Master
export const GET_DISEASE_MASTER = "GET_DISEASE_MASTER";
export const SAVE_DISEASE_MASTER = "SAVE_DISEASE_MASTER";
export const DELETE_DISEASE_MASTER = "DELETE_DISEASE_MASTER";
//#endregion Disease Master

//#region Health History
export const GET_DISEASEDATA = "GET_DISEASEDATA"
export const GET_HEALTHLIST = "GET_HEALTHLIST"
export const UPDATE_DISEASEDATA = "UPDATE_DISEASEDATA"
//#endregion Health History

//#region Treatment Master
export const GET_TREATMENT_MASTER = "GET_TREATMENT_MASTER";
export const SAVE_TREATMENT_MASTER = "SAVE_TREATMENT_MASTER";
export const EDIT_TREATMENT_MASTER = "EDIT_TREATMENT_MASTER";
export const DELETE_TREATMENT_MASTER = "DELETE_TREATMENT_MASTER";
export const GET_DISEASE_FOR_TREATMENT_MASTER = "GET_DISEASE_FOR_TREATMENT_MASTER";
//#endregion Treatment Master

//region TreatMent Template
export const GET_DISEASELIST = "GET_DISEASELIST"
export const GET_DIETLIST_MASTER = "GET_DIETLIST_MASTER";
export const GET_DISEASE_NAME = "GET_DISEASE_NAME"
export const SAVE_TEMPLETE_NAME = "SAVE_TEMPLETE_NAME";
export const DELETE_TEMPLETE = "DELETE_TEMPLETE";
export const UPDATE_TEMPLETE = "UPDATE_TEMPLETE";
export const GET_TEMPLATENAMELIST = "GET_TEMPLATENAMELIST";


export const GET_TEMPLETEDISEASE = "GET_TEMPLETEDISEASE";
export const GET_TREATMENT_NAME = "GET_TREATMENT_NAME";
export const GET_THERAPYLIST_MASTER = "GET_THERAPYLIST_MASTER";
//end#region TreatMent Template

//#region Leave Aproval
export const GET_APPROVAL_LEAVE = "GET_APPROVAL_LEAVE";
export const UPDATE_APPROVAL_LEAVE = "UPDATE_APPROVAL_LEAVE";
//#endregion Leave Aproval

//#region Master-TreatmentRoomMaster
export const GET_TREATMENTROOMMASTERLIST = "GET_TREATMENTROOMMASTERLIST";
export const GET_THERAPISTLIST = "GET_THERAPISTLIST";
export const ADD_TREATMENTROOM = "ADD_TREATMENTROOM";
export const UPDATE_TREATMENTROOM = "UPDATE_TREATMENTROOM";
export const DELETE_TREATMENTROOM = "DELETE_TREATMENTROOM";
//#endregion Master-TreatmentRoomMaster

//#region Daily therapy
export const GET_DAILYTHERAPY = "GET_DAILYTHERAPY";
export const GET_DAILYTHERAPY_TYPENAME = "GET_DAILYTHERAPY_TYPENAME";
export const GET_DAILYTHERAPY_SLOT = "GET_DAILYTHERAPY_SLOT";
export const GET_DAILYTHERAPY_UPDATE = "GET_DAILYTHERAPY_UPDATE";
//#endregion Daily therapy

//#region TherapyType Master
export const GET_THERAPYTYPE = "GET_THERAPETYPE";
export const SAVE_THERAPYTYPE = "SAVE_THERAPYTYPE";
export const DELETE_THERAPYTYPE = "DELETE_THERAPYTYPE";
//#endregion TherapyType Master

//#region TherapySLot Master
export const GET_THERAPYSLOT = "GET_THERAPYSLOT";
export const SAVE_THERAPYSLOT = "SAVE_THERAPYSLOT";
export const DELETE_THERAPYSLOT = "DELETE_THERAPYSLOT";
export const GET_THERAPY = "GET_THERAPY";
//#endregion TherapySlot Master

//#region MemberShip Master
export const GET_DAYS = "GET_DAYS";
export const GET_OCCUPANCY = "GET_OCCUPANCY";
export const GET_MEMBERSHIP = "GET_MEMBERSHIP";
export const ADD_MEMBERSHIP = "ADD_MEMBERSHIP";
export const UPDATE_MEMBERSHIP = "UPDATE_MEMBERSHIP";
export const GET_MEMBERSHIP_EFFECTIVEDATE = "GET_MEMBERSHIP_EFFECTIVEDATE";
export const DELETE_MEMBERSHIP = "DELETE_MEMBERSHIP";
//#endregion MemberShip Master

// export const GET_ROOMRATETIME = "GET_ROOMRATETIME";
export const GET_ROOMFILTER = "GET_ROOMFILTER";
// export const GET_LISTDAYS = "GET_LISTDAYS";
// export const GET_LISTALLCATEGORYNAME = "GET_LISTALLCATEGORYNAME";
// export const GET_ROOM_MEMBERSHIP = "GET_ROOM_MEMBERSHIP";

//#region Screen-MealTemplate
export const GET_EFFECTIVEDATEFILTER = "GET_EFFECTIVEDATEFILTER";
export const GET_MEALTEMPLATELIST = "GET_MEALTEMPLATELIST";
export const GET_EXISTINGMEALDATA = "GET_EXISTINGMEALDATA";
export const ADD_MEALTEMPLATE = "ADD_MEALTEMPLATE";
export const UPDATE_MEALTEMPLATEATA = "UPDATE_MEALTEMPLATEATA";
export const DELETE_MEALTEMPLATE = "DELETE_MEALTEMPLATE";
export const GET_MEALEDITDAY = "GET_MEALEDITDAY";
//#endregion Screen-MealTemplate
export const SAVE_ROOMRATE = "SAVE_ROOMRATE";
export const GET_ROOMRATETIME = "GET_ROOMRATETIME";
export const GET_LISTDAYS = "GET_LISTDAYS";
export const UPDATE_ROOMRATE = "UPDATE_ROOMRATE";
export const DELETE_ROOMRATE = "DELETE_ROOMRATE";
export const GET_LISTALLCATEGORYNAME = "GET_LISTALLCATEGORYNAME";
export const guestUploadFile_downloadFile = "guestUploadFile_downloadFile";

//#region Screen-MealTemplate
export const GET_EXISTINGDATAONEFFEDATEWISE = "GET_EXISTINGDATAONEFFEDATEWISE";
export const GET_EFFECTIVEDATE = "GET_EFFECTIVEDATE";
export const GET_DATEWISEMEALTEMPLATELIST = "GET_DATEWISEMEALTEMPLATELIST";
export const GET_EXISTINGDATEWISEMEALTEMPLATELIST = "GET_EXISTINGDATEWISEMEALTEMPLATELIST";
export const GET_DATEWISEMEALTEMPLATEEXISTINGDATA = "GET_DATEWISEMEALTEMPLATEEXISTINGDATA";
export const ADD_DATEWISEMEALTEMPLATE = "ADD_DATEWISEMEALTEMPLATE";
export const UPDATE_DATEWISEMEALTEMPLATE = "UPDATE_DATEWISEMEALTEMPLATE";
export const DELETE_DATEWISEMEALTEMPLATE = "DELETE_DATEWISEMEALTEMPLATE";
//#endregion Screen-MealTemplate
