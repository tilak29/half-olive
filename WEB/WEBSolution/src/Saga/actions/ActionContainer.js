import {
  ADD_AREA,
  ADD_BROADCAST_MOBILE_NEWS_LIST,
  ADD_CHEMIST,
  ADD_CITY,
  ADD_DESIGNATION,
  ADD_DIVISION,
  ADD_LOCATION,
  ADD_EMPLOYEE,
  ADD_HOLIDAY,
  ADD_ITEM,
  ADD_ITEMPRICE,
  ADD_LEAVE,
  ADD_NOTIFICATION,
  ADD_REWARD,
  ADD_SCHEME,
  ADD_STATE,
  ADD_STOCKIST,
  UPDATE_RETURN_INVOICE,
  APPROVE_RETURN_INVOICE,
  ASSIGN_CHEMIST_TO_ROUTE,
  ASSIGN_ROUTE,
  ASSIGN_STOCKIST_TO_EMPLOYEE,
  CHANGE_PASSWORD,
  CHECK_DUPLICATE_INVOICE,
  CHECK_PENDING_LEAVE_APPROVALS,
  DELETE_HOLIDAY,
  DELETE_LEAVE,
  DELETE_LOCATION,
  EXPORT_HOLIDAY_LIST,
  EXPORT_ITEM_LIST,
  EXPORT_ITEM_PRICELIST,
  EXPORT_ROUTE_LIST,
  FORGOT_PASSWORD,
  GET_ATTENDANCE,
  GET_ADD_DCR_ROUTES,
  GET_AREALIST,
  GET_AREAS,
  GET_AVAILABLE_ITEMLIST,
  GET_BROADCAST_MOBILE_NEWS_LIST,
  GET_CATEGORIES,
  GET_CHEMISTLIST,
  GET_CHEMIST_CUMULATIVE_PROD_CALLS_LIST,
  GET_CHEMIST_VISITS_DATA,
  GET_CITIES,
  GET_CITYLIST,
  GET_COUNTRIES,
  GET_DASHBOARD_CHEMIST_BIRTHDAY_LIST,
  GET_DASHBOARD_SUMMARY_DATA,
  GET_MONTHLYSTATUS_ORDERCOUNT,
  GET_DCR_CALENDAR_DATA,
  GET_DCR_PREVIEW_DATA,
  GET_DESIGNATIONLIST,
  GET_DESIGNATIONS,
  GET_DEVICECONFIGURATIONLIST,
  GET_DIVISIONLIST,
  GET_LOCATIONLIST,
  GET_TREATMENTROOMMASTERLIST,
  GET_THERAPISTLIST,
  GET_DIVISIONS,
  GET_STOCKISTASSIGNEDDIVISION,
  GET_EMPLOYEELIST,
  GET_EMPLOYEES,
  GET_EXPENSE_APPROVAL_LIST,
  GET_EXPENSE_APPROVAL_LIST_OF_EMPLOYEE,
  GET_EXPENSE_BYROUTE,
  GET_EXPENSE_CONFIG,
  GET_EXPENSE_REPORT_COMPARISON_DATA,
  GET_EXPENSE_REPORT_LIST,
  GET_FINANCIAL_MONTHYEARLIST,
  GET_GPS_LOCATION_HISTORY_DATA,
  GET_GPS_TRACK_DATA,
  GET_HOLIDAYLIST,
  GET_HOLIDAY_YEARLIST,
  GET_INVOICE_LIST,
  GET_ITEMLIST,
  GET_ITEMPRICE_EXPORTDATES,
  GET_ITEM_PRICELIST,
  GET_LEAVELIST,
  GET_LEAVE_REPORT,
  GET_MANAGER_TOURPLAN,
  GET_MANAGER_VS_TEAM_DATA,
  GET_MANAGER_WORKINGWITH,
  GET_MONTHYEAR_RANGE_LIST,
  GET_NOTIFICATIONS,
  GET_NOTIFICATION_COUNT,
  GET_ORDERDATA_BYID,
  GET_ORDER_LIST,
  GET_POB_DATA,
  GET_REGISTRATION_APPROVAL_DATA,
  GET_REWARDLIST,
  GET_ROUTELIST,
  GET_ROUTES,
  GET_SCHEMELIST,
  GET_SCHEMES,
  GET_SL_OR_MANAGER_LIST,
  GET_SL_TOURPLAN,
  GET_SL_WORKINGWITH,
  GET_STATELIST,
  GET_STATES,
  GET_STATIC_LOOKUP,
  GET_STOCKIST,
  GET_STOCKISTLIST,
  GET_STOCKISTLIST_OF_STATE_EMPLOYEE,
  GET_SUBORDINATES,
  GET_SUPERSTOCKIST,
  GET_TOURPLAN_MONTHYEARLIST,
  GET_TP_APPROVAL_LIST,
  GET_TP_VS_ACTUAL_DATA,
  GET_UNLOCK_DCR_DATA,
  GET_USERPANELLIST,
  GET_USERPROFILE_DATA,
  HIDE_DISPLAY_MESSAGE,
  IMPORT_HOLIDAY_LIST,
  IMPORT_ITEM_LIST,
  IMPORT_ROUTE_LIST,
  MANAGE_DCR,
  MERGE_ROUTES,
  SAVE_ADVERTISE_IMAGES,
  GET_ADVERTISE_IMAGES,
  SAVE_EXPENSE,
  SAVE_EXPENSE_CONFIG,
  SAVE_MANAGER_TOURPLAN,
  SAVE_POB_DATA,
  SAVE_SL_TOURPLAN,
  SEND_SMS,
  SET_CURRENTMENU,
  SHOW_DISPLAY_MESSAGE,
  START_REFRESH_TOKEN_SAGA,
  TRANSFER_ROUTES_TO_EMPLOYEE,
  UNLOCK_DCR_REQUEST,
  UPDATE_AREA,
  UPDATE_ASSIGNED_ROUTE,
  UPDATE_BROADCAST_MOBILE_NEWS_LIST,
  UPDATE_CHEMIST,
  UPDATE_CITY,
  UPDATE_DESIGNATION,
  UPDATE_DEVICECONFIGURATIONLIST,
  UPDATE_DIVISION,
  UPDATE_LOCATION,
  UPDATE_EMPLOYEE,
  UPDATE_EXPENSE_APPROVAL,
  UPDATE_HOLIDAY,
  UPDATE_INVOICE,
  UPDATE_ITEM,
  UPDATE_LEAVE,
  UPDATE_ORDER,
  UPDATE_REGISTRATION_REQ,
  UPDATE_REWARD,
  UPDATE_SCHEME,
  UPDATE_SCHEME_ITEMS,
  UPDATE_STATE,
  UPDATE_STOCKIST,
  UPDATE_TP_STATUS,
  UPDATE_UNLOCK_DCR,
  UPDATE_USERPANELLIST,
  USER_LOGIN,
  USER_LOGOUT,
  UPDATE_REDEMPTION,
  GET_REDEMPTION_LIST,
  GET_REDEMPTION_APPROVALMESSAGE,
  UPDATE_POINTS,
  GET_EMPROUTELIST,
  DOWNLOAD_EMPROUTELIST,
  GET_TARGET,
  INSERT_TARGET,
  GET_WORKFLOW,
  GET_DASHBOARD_COUNT_DATA,
  GET_MATCHING_CHEMIST_DATA,
  GET_MOB_OWNER_NAME,
  GET_CHEMIST_PROFILE_LIST,
  UPDATE_CHEMIST_PROFILE,
  GET_CHEMIST_PROFILE_DATA,
  GET_LOOKUP_ROUTES,
  GET_MONTHLY_EXPENSE_SUMMARY_REPORT_Data,
  GET_SERIESLIST,
  ADD_SERIES,
  GET_DOCUMENTTYPELIST,
  ADD_DOCUMENTTYPE,
  UPDATE_DOCUMENTTYPE,
  GET_VIDEOLIST,
  ADD_VIDEOSERIES,
  GET_SERIESDATA,
  SAVE_REJECT_SL_TOURPLAN,
  SAVE_REJECT_MANAGER_TOURPLAN,
  GET_TANDC,
  SAVE_TANDC,
  DCR_PREVIEW_ASYNC,
  GET_GPS_TRACK_DATA_BY_ATETIMEANDEMPLOYEE,
  GET_VIDEO_SUMMARY_REPORT_DATA,
  GET_VIDEO_SUMMARY_DETAILS_DATA,
  DCR_CALENDER_ASYNC,
  GET_DASHBOARD_STATEWISE_COUNT_DATA,
  GET_EXPENSE_APPROVAL_LIST_OF_EMPLOYEE_ASYNC,
  GET_FEATURE_DATA,
  SAVE_FEATURE_DATA,
  GET_SELFIE_DATA,
  SAVE_SELFIE_DATA,
  GET_SURVEY_DATA,
  SAVE_SURVEY_DATA,
  GET_SURVEYQUESTION_DATA,
  GET_AWS_FILEUPLOAD_URL,
  GET_QUESTION_TYPE,
  SAVE_QUESTION_TYPE,
  GET_ANSWERGROUP_DATA,
  SAVE_SURVEYQUESTION_DATA,
  DELETE_SURVEYQUESTION_DATA,
  SAVE_SURVEYCOPY_DATA,
  SEND_NOTIFICATION,
  SEND_FEATURE_SMS,
  GET_SURVEYREPORT_DATA,
  GET_SURVEYCHEMIST_DATA,
  GET_ACTIVESURVEY_DATA,
  GET_POINTSCONFIG_DATA,
  SAVE_POINTSCONFIG_DATA,
  GET_CUSTOME_RORDER_DATA,
  GET_CUSTOME_RORDER_DATA_BYID,
  UPDATE_CUSTOME_RORDER_DATA,
  GET_MYORDER_LIST,
  GET_MYORDER_ITEMPRICE,
  SAVE_MYORDER,
  GET_MENUROLE_LIST,
  REFRESH_MENU_ITEM,
  SAVE_MENUROLE_DATA,
  GET_DEFAULT_SECONDARY,
  UPDATE_DEFAULT_SECONDARY,
  UPDATE_DEFAULTALL_SECONDARY,
  GET_ALLDIVISIONS,
  GET_SMS_CODE,
  GET_SMS_MESSAGE,
  GET_CLAIMREWARD,
  GET_DASHBOARD_STATEWISE_DATA,
  GET_ITEMWISESALES,
  GET_TOPCUSTOMER,
  GET_PRIMARYPURCHASELIST,
  IMPORT_PRIMARYPURCHASE_LIST,
  SAVE_PRIMARYPURCHASE,
  GET_GPSSMSTRACK,
  GET_PRIMARYVSSECONDARY,
  GET_SMARTSETUAPP,
  GET_PRIMARYVSCLAIM,
  GET_EMPLOYEEREFMAPPING,
  GET_QRLIST,
  ADD_QR,
  UPDATE_QR,
  DELETE_QR,
  PRINTDOWNLOAD_QR,
  GENERATE_QR,
  GET_QRPRINTHISTORY,
  GET_INVOICEITEMDATA,
  GET_DEPO_LIST,
  GET_CLOSING_STOCK_LIST,
  GET_MONTHLY_SALES_DATA,
  READ_FTP_FILES,
  GET_STOCKIST_FILTER_LIST,
  GET_OUTSTANDING_REPORT,
  GET_FTP_DIVISION_LIST,
  GET_GUESTLIST,
  ADD_GUEST,
  UPDATE_GUEST,
  GET_ROOM_CATEGORY,
  INSERT_ROOM_CATEGORY,
  GET_ROOM_MASTER,
  SAVE_ROOM_MASTER,
  GET_ROOM_CATEGORIES,
  GET_DIET_MASTER,
  SAVE_DIET_MASTER,
  GET_DIET_CATEGORIES,
  GET_DIET_DELETE,
  GET_KEY_LIST,
  GET_KEY_MASTER,
  SAVE_KEY_MASTER,
  GET_AMENITY_MASTER,
  SAVE_AMENITY_MASTER,
  GET_MANAGE_BOOKING,
  SAVE_MANAGE_BOOKING,
  GET_STATUS_FILTER,
  GET_PATIENTNAME,
  GET_PERSONALDETAILS,
  GET_DAYWISEDATE,
  GET_MORNINGTHERAPY,
  GET_DEFAULTTHERAPY,
  GET_ADDITIONALTHERAPY,
  GET_DIETPLANNAME,
  GET_EXISTINGRECORD,
  ADD_TREATMENTSECTIONDATA,
  GET_MEALTYPENAME,
  GET_DISEASE_MASTER,
  SAVE_DISEASE_MASTER,
  DELETE_DISEASE_MASTER,
  GET_TREATMENT_MASTER,
  SAVE_TREATMENT_MASTER,
  EDIT_TREATMENT_MASTER,
  DELETE_TREATMENT_MASTER,
  GET_DISEASE_FOR_TREATMENT_MASTER,
  GET_DIETLIST_MASTER,
  GET_THERAPYLIST_MASTER,
  GET_TREATMENTTEMPLATE_CATEGORIES,
  GET_TREATMENTLIST_DATA,
  GET_DIETLIST_DATA,
  ADD_TREATMENTPLAN,
  SAVE_DISEASELIST,
  GET_DISEASELIST,
  GET_APPROVAL_LEAVE,
  UPDATE_APPROVAL_LEAVE,
  GET_DISEASE_NAME,
  SAVE_TEMPLETE_NAME,
  DELETE_TEMPLETE,
  UPDATE_TEMPLETE,
  GET_TREATMENT_NAME,
  GET_TEMPLETEDISEASE,
  GET_HEALTHLIST,
  UPDATE_DISEASEDATA,
  ADD_TREATMENTROOM,
  UPDATE_TREATMENTROOM,
  DELETE_TREATMENTROOM,
  GET_DAILYTHERAPY,
  GET_DAILYTHERAPY_TYPENAME,
  GET_DAILYTHERAPY_UPDATE,
  GET_DAILYTHERAPY_SLOT,
  GET_TEMPLATENAMELIST,
  UPDATE_DIET,
  GET_ROOMRATETIME,
  GET_ROOMFILTER,
  GET_LISTALLCATEGORYNAME,
  GET_LISTDAYS,
  GET_OCCUPANCY,
  GET_THERAPYTYPE,
  SAVE_THERAPYTYPE,
  DELETE_THERAPYTYPE,
  DELETE_THERAPYSLOT,
  SAVE_THERAPYSLOT,
  GET_THERAPYSLOT,
  GET_DAYS,
  GET_THERAPY,
  GET_LATESTGUEST,
  GET_MEMBERSHIP,
  GET_DISEASEDATA,
  GET_ROOMLIST,
  GET_ROOMSTATUS,
  GET_DEFAULTROOMSTATUS,
  GET_DEFAULTROOMCATEGORY,
  VIEW_MEALDATA,
  SINGLE_EMPLOYEE,
  GET_EFFECTIVEDATEFILTER,
  GET_MEALTEMPLATELIST,
  GET_EXISTINGMEALDATA,
  ADD_MEALTEMPLATE,
  UPDATE_MEALTEMPLATEATA,
  DELETE_MEALTEMPLATE,
  GET_MEALEDITDAY,
  SAVE_ROOMRATE,
  UPDATE_ROOMRATE,
  guestUploadFile_getData,
  guestUploadFile_downloadFile,
  DELETE_ROOMRATE,
  GET_EXISTINGDATAONEFFEDATEWISE,
  GET_EFFECTIVEDATE,
  GET_DATEWISEMEALTEMPLATELIST,
  GET_EXISTINGDATEWISEMEALTEMPLATELIST,
  GET_DATEWISEMEALTEMPLATEEXISTINGDATA,
  ADD_DATEWISEMEALTEMPLATE,
  UPDATE_DATEWISEMEALTEMPLATE,
  DELETE_DATEWISEMEALTEMPLATE,
  manageBooking_getbookingData,
  manageBooking_getGuestBookingDetails,
  manageBooking_getRoomAssignDetails,
  manageBooking_updateManageBooking,
  manageBooking_deleteManageBooking,
  ADD_MEMBERSHIP,
  UPDATE_MEMBERSHIP,
  GET_MEMBERSHIP_EFFECTIVEDATE,
  DELETE_MEMBERSHIP,
  manageBooking_checkedOutPerticularRoom
}
  from "./ActionType";
//#region User Actions
export const userLogin = ({ params, onSuccess, onFailure }) => {
  return {
    type: USER_LOGIN,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const changePassword = ({ params, onSuccess, onFailure }) => {
  return {
    type: CHANGE_PASSWORD,
    payload: { params, onSuccess, onFailure },
  };
};

export const forgotPassword = ({ params, onSuccess, onFailure }) => {
  return {
    type: FORGOT_PASSWORD,
    payload: { params, onSuccess, onFailure },
  };
};

export const getUserProfileData = ({ onSuccess, onFailure }) => {
  return {
    type: GET_USERPROFILE_DATA,
    payload: { onSuccess, onFailure },
  };
};

//#endregion User Actions

//#region Refresh Token
export const callRefreshTokenSaga = () => {
  return {
    type: START_REFRESH_TOKEN_SAGA,
  };
};
//#endregion Refresh Token

//#region General Actions
export const setCurrentMenu = (menuDetails) => {
  return {
    type: SET_CURRENTMENU,
    payload: { menuDetails },
  };
};
export const showDisplayMessage = (messageDetails) => {
  return {
    type: SHOW_DISPLAY_MESSAGE,
    payload: { messageDetails },
  };
};
export const hideDisplayMessage = () => {
  return {
    type: HIDE_DISPLAY_MESSAGE,
    payload: {},
  };
};
//#endregion General Actions

//#region Lookup Actions
export const getCountries = ({ onSuccess, onFailure }) => {
  return {
    type: GET_COUNTRIES,
    payload: { onSuccess, onFailure },
  };
};
export const getStates = () => {
  return {
    type: GET_STATES,
    payload: {},
  };
};

export const getDivisions = ({ onSuccess, onFailure }) => {
  return {
    type: GET_DIVISIONS,
    payload: { onSuccess, onFailure },
  };
};

export const getDesignations = ({ onSuccess, onFailure }) => {
  return {
    type: GET_DESIGNATIONS,
    payload: { onSuccess, onFailure },
  };
};

export const getFinancialMonthYear = ({ onSuccess, onFailure }) => {
  return {
    type: GET_FINANCIAL_MONTHYEARLIST,
    payload: { onSuccess, onFailure },
  };
};

export const getCities = () => {
  return {
    type: GET_CITIES,
    payload: {},
  };
};

export const getEmployees = ({
  params = {},
  onSuccess = null,
  onFailure = null,
}) => {
  return {
    type: GET_EMPLOYEES,
    payload: { params, onSuccess, onFailure },
  };
};

export const getAreas = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_AREAS,
    payload: { params, onSuccess, onFailure },
  };
};

export const getRoutes = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_ROUTES,
    payload: { params, onSuccess, onFailure },
  };
};

export const getStaticLookup = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_STATIC_LOOKUP,
    payload: { params, onSuccess, onFailure },
  };
};

export const getCategories = ({ onSuccess, onFailure }) => {
  return {
    type: GET_CATEGORIES,
    payload: { onSuccess, onFailure },
  };
};

export const getTourPlanMonthYearList = ({ onSuccess, onFailure }) => {
  return {
    type: GET_TOURPLAN_MONTHYEARLIST,
    payload: { onSuccess, onFailure },
  };
};

export const getSLOrManagerList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_SL_OR_MANAGER_LIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const getSubOrdinates = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_SUBORDINATES,
    payload: { params, onSuccess, onFailure },
  };
};

export const getMonthYearRangeList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_MONTHYEAR_RANGE_LIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const getSchemes = ({ onSuccess, onFailure }) => {
  return {
    type: GET_SCHEMES,
    payload: { onSuccess, onFailure },
  };
};

export const getStockists = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_STOCKIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const getSuperStockists = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_SUPERSTOCKIST,
    payload: { params, onSuccess, onFailure },
  };
};

//#endregion Lookup Actions

//#region Holiday Master
export const getHolidayList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_HOLIDAYLIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const getHolidayYearList = ({ onSuccess, onFailure }) => {
  return {
    type: GET_HOLIDAY_YEARLIST,
    payload: { onSuccess, onFailure },
  };
};

export const addHoliday = ({ params, onSuccess, onFailure }) => {
  console.log("params :: ", params);
  return {
    type: ADD_HOLIDAY,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const updateHoliday = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_HOLIDAY,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const deleteHoliday = ({ params, onSuccess, onFailure }) => {
  return {
    type: DELETE_HOLIDAY,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const exportHolidayList = ({ onSuccess, onFailure }) => {
  return {
    type: EXPORT_HOLIDAY_LIST,
    payload: { onSuccess, onFailure },
  };
};

export const importHolidayList = ({ params, onSuccess, onFailure }) => {
  return {
    type: IMPORT_HOLIDAY_LIST,
    payload: { params, onSuccess, onFailure },
  };
};

//#endregion Holiday Master

//#region Master-State
export const getStatesList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_STATELIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const addState = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_STATE,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const updateState = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_STATE,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};
//#endregion Master-State

//#region Master-Division
export const getDivisionList = ({ onSuccess, onFailure }) => {
  return {
    type: GET_DIVISIONLIST,
    payload: { onSuccess, onFailure },
  };
};

export const addDivision = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_DIVISION,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const updateDivision = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_DIVISION,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};
//#endregion Master-Division

//#region Master-TreatmentRoomMaster
export const getTreatmentRoomMasterList = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: GET_TREATMENTROOMMASTERLIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const getAllTherapist = ({ onSuccess, onFailure }) => {
  return {
    type: GET_THERAPISTLIST,
    payload: { onSuccess, onFailure },
  };
};

export const addTreatmentRoom = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_TREATMENTROOM,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};
export const updateTreatmentRoom = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_TREATMENTROOM,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const deleteTreatmentRoom = ({ params, onSuccess, onFailure }) => {
  return {
    type: DELETE_TREATMENTROOM,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};
//#endregion Master-TreatmentRoomMaster

//#region Master-LocationMaster
export const getLocationList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_LOCATIONLIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const addLocation = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_LOCATION,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const updateLocation = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_LOCATION,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const deleteLocation = ({ params, onSuccess, onFailure }) => {
  return {
    type: DELETE_LOCATION,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};
//#endregion Master-LocationMaster

//#region TreatmentPlanMaster
export const getTreatmentTemplateCategories = ({ onSuccess, onFailure }) => {
  return {
    type: GET_TREATMENTTEMPLATE_CATEGORIES,
    payload: { onSuccess, onFailure },
  };
};
export const getTreatmentList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_TREATMENTLIST_DATA,
    payload: { params, onSuccess, onFailure },
  };
};
export const getDietList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DIETLIST_DATA,
    payload: { params, onSuccess, onFailure },
  };
};
export const addTreatmentPlan = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_TREATMENTPLAN,
    payload: { params, onSuccess, onFailure },
  };
};
//#end-region TreatmentPlanMaster

//#region PatientName
export const getPatientName = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_PATIENTNAME,
    payload: { params, onSuccess, onFailure },
  };
};
//#end-region PatientName

//#region PatientDetails
export const getPersonalDetails = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_PERSONALDETAILS,
    payload: { params, onSuccess, onFailure },
  };
};
//#end-region PatientDetails

//#region Treatment-Treatment Section 
export const getDayWiseDate = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DAYWISEDATE,
    payload: { params, onSuccess, onFailure },
  };
};
export const getMorningTherapy = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_MORNINGTHERAPY,
    payload: { params, onSuccess, onFailure },
  };
};
export const getDefaultTherapy = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DEFAULTTHERAPY,
    payload: { params, onSuccess, onFailure },
  };
};
export const getAdditionalTherapy = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_ADDITIONALTHERAPY,
    payload: { params, onSuccess, onFailure },
  };
};
export const getDietPlanName = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DIETPLANNAME,
    payload: { params, onSuccess, onFailure },
  };
};
export const getExistingRecord = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_EXISTINGRECORD,
    payload: { params, onSuccess, onFailure },
  };
};
export const saveTreatmentSectionDetails = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_TREATMENTSECTIONDATA,
    payload: { params, onSuccess, onFailure },
  };
};
export const getMealTypeName = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_MEALTYPENAME,
    payload: { params, onSuccess, onFailure },
  };
};
//#end-region Treatment-Treatment Section

//#region City Master
export const getCityList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_CITYLIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const addCity = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_CITY,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const updateCity = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_CITY,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

//#endregion Master-City

//#region Master-Designation
export const getDesignationList = ({ onSuccess, onFailure }) => {
  return {
    type: GET_DESIGNATIONLIST,
    payload: { onSuccess, onFailure },
  };
};

export const addDesignation = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_DESIGNATION,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const updateDesignation = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_DESIGNATION,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};
//#endregion Master-Designation

//#region Master-Area
export const getAreaList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_AREALIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const addArea = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_AREA,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const updateArea = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_AREA,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};
//#endregion Master-Area

//#region Route-Assign Route
export const getRouteList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_ROUTELIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const assignRoute = ({ params, onSuccess, onFailure }) => {
  return {
    type: ASSIGN_ROUTE,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const updateAssignedRoute = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_ASSIGNED_ROUTE,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const exportRouteList = ({ params, onSuccess, onFailure }) => {
  return {
    type: EXPORT_ROUTE_LIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const importRouteList = ({ params, onSuccess, onFailure }) => {
  return {
    type: IMPORT_ROUTE_LIST,
    payload: { params, onSuccess, onFailure },
  };
};

//#endregion Route-Assign Route

//#region Chemist Master
export const getChemistList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_CHEMISTLIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const addChemist = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_CHEMIST,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const updateChemist = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_CHEMIST,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};
//#endregion Chemist Master

// #region Master-Employee
export const getEmployeeList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_EMPLOYEELIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const addEmployee = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_EMPLOYEE,
    payload: { params, onSuccess, onFailure },
  };
};

export const updateEmployee = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_EMPLOYEE,
    payload: { params, onSuccess, onFailure },
  };
};

export const getMobileOwnerName = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_MOB_OWNER_NAME,
    payload: { params, onSuccess, onFailure },
  };
};
// #region Master-Employee

// #region Master-Stockist
export const getStockistList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_STOCKISTLIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const addStockist = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_STOCKIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const updateStockist = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_STOCKIST,
    payload: { params, onSuccess, onFailure },
  };
};
// #region Master-Stockist

// #region Employee-Leave
export const getLeaveList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_LEAVELIST,
    payload: { params, onSuccess, onFailure },
  };
};
export const addLeave = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_LEAVE,
    payload: { params, onSuccess, onFailure },
  };
};
export const deleteLeave = ({ params, onSuccess, onFailure }) => {
  return {
    type: DELETE_LEAVE,
    payload: { params, onSuccess, onFailure },
  };
};

export const updateLeave = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_LEAVE,
    payload: { params, onSuccess, onFailure },
  };
};
// #region Employee-Leave

// #region Master-DeviceConfiguration
export const getDeviceConfigurationList = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: GET_DEVICECONFIGURATIONLIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const updateDeviceConfigurationList = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: UPDATE_DEVICECONFIGURATIONLIST,
    payload: { params, onSuccess, onFailure },
  };
};
// #region Master-DeviceConfiguration

// #region Manage-UserPanel
export const getUserPanelList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_USERPANELLIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const updateUserPanelList = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_USERPANELLIST,
    payload: { params, onSuccess, onFailure },
  };
};
// #region Manage-UserPanel

// #region Master-Item
export const getItemList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_ITEMLIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const addItem = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_ITEM,
    payload: { params, onSuccess, onFailure },
  };
};

export const updateItem = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_ITEM,
    payload: { params, onSuccess, onFailure },
  };
};

export const exportItemList = ({ params, onSuccess, onFailure }) => {
  return {
    type: EXPORT_ITEM_LIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const importItemList = ({ params, onSuccess, onFailure }) => {
  return {
    type: IMPORT_ITEM_LIST,
    payload: { params, onSuccess, onFailure },
  };
};
// #region Master-Item

//#region Master-Scheme
export const getSchemesList = ({ onSuccess, onFailure }) => {
  return {
    type: GET_SCHEMELIST,
    payload: { onSuccess, onFailure },
  };
};

export const getAvailableItemsList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_AVAILABLE_ITEMLIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const addScheme = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_SCHEME,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const updateScheme = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_SCHEME,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const updateSchemeItems = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_SCHEME_ITEMS,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};
//#endregion Master-Scheme

// #region Master-ItemPrice
export const getItemPriceList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_ITEM_PRICELIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const addItemPrice = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_ITEMPRICE,
    payload: { params, onSuccess, onFailure },
  };
};

export const getItemPriceExportDates = ({ onSuccess, onFailure }) => {
  return {
    type: GET_ITEMPRICE_EXPORTDATES,
    payload: { onSuccess, onFailure },
  };
};

export const exportItemPriceList = ({ params, onSuccess, onFailure }) => {
  return {
    type: EXPORT_ITEM_PRICELIST,
    payload: { params, onSuccess, onFailure },
  };
};

// #region Master-ItemPrice

// #region TourPlan-SLTourPlan
export const getSLTourPlan = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_SL_TOURPLAN,
    payload: { params, onSuccess, onFailure },
  };
};

export const saveSLTourPlan = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_SL_TOURPLAN,
    payload: { params, onSuccess, onFailure },
  };
};

export const getSLWorkingWith = ({ onSuccess, onFailure }) => {
  return {
    type: GET_SL_WORKINGWITH,
    payload: { onSuccess, onFailure },
  };
};
export const rejectSLTourPlan = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_REJECT_SL_TOURPLAN,
    payload: { params, onSuccess, onFailure },
  };
};
// #endregion TourPlan-SLTourPlan

// #region TourPlan-ManagerTourPlan
export const rejectManagerTourPlan = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_REJECT_MANAGER_TOURPLAN,
    payload: { params, onSuccess, onFailure },
  };
};
export const getManagerTourPlan = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_MANAGER_TOURPLAN,
    payload: { params, onSuccess, onFailure },
  };
};

export const saveManagerTourPlan = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_MANAGER_TOURPLAN,
    payload: { params, onSuccess, onFailure },
  };
};

export const getManagerWorkingWith = ({ onSuccess, onFailure }) => {
  return {
    type: GET_MANAGER_WORKINGWITH,
    payload: { onSuccess, onFailure },
  };
};
// #endregion TourPlan-ManagerTourPlan

// #region Dashboard
export const getDashboardSummaryData = ({ onSuccess, onFailure }) => {
  return {
    type: GET_DASHBOARD_SUMMARY_DATA,
    payload: { onSuccess, onFailure },
  };
};

export const getDashboardChemistBirthdayList = ({ onSuccess, onFailure }) => {
  return {
    type: GET_DASHBOARD_CHEMIST_BIRTHDAY_LIST,
    payload: { onSuccess, onFailure },
  };
};

export const getTPApprovalList = ({ onSuccess, onFailure }) => {
  return {
    type: GET_TP_APPROVAL_LIST,
    payload: { onSuccess, onFailure },
  };
};

export const updateTPStatus = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_TP_STATUS,
    payload: { params, onSuccess, onFailure },
  };
};

export const getDashboardCountData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DASHBOARD_COUNT_DATA,
    payload: { params, onSuccess, onFailure },
  };
};

export const getOrderMonthlyCountData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_MONTHLYSTATUS_ORDERCOUNT,
    payload: { params, onSuccess, onFailure },
  };
};

// #endregion Dashboard

// #region assign Chemist-To-Route
export const assignChemistToRoute = ({ params, onSuccess, onFailure }) => {
  return {
    type: ASSIGN_CHEMIST_TO_ROUTE,
    payload: { params, onSuccess, onFailure },
  };
};
// #region assign Chemist-To-Route

// #region Employee-DCR
export const getDCRCalendarData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DCR_CALENDAR_DATA,
    payload: { params, onSuccess, onFailure },
  };
};

export const getDCRPreviewData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DCR_PREVIEW_DATA,
    payload: { params, onSuccess, onFailure },
  };
};

export const requestForUnlockDCR = ({ params, onSuccess, onFailure }) => {
  return {
    type: UNLOCK_DCR_REQUEST,
    payload: { params, onSuccess, onFailure },
  };
};

export const getPOBData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_POB_DATA,
    payload: { params, onSuccess, onFailure },
  };
};

export const savePOBData = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_POB_DATA,
    payload: { params, onSuccess, onFailure },
  };
};

export const getExpenseByRoute = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_EXPENSE_BYROUTE,
    payload: { params, onSuccess, onFailure },
  };
};

export const saveExpense = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_EXPENSE,
    payload: { params, onSuccess, onFailure },
  };
};

export const checkPendingLeaveApprovals = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: CHECK_PENDING_LEAVE_APPROVALS,
    payload: { params, onSuccess, onFailure },
  };
};

export const getAddDCRRoutes = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_ADD_DCR_ROUTES,
    payload: { params, onSuccess, onFailure },
  };
};

// #endregion Employee-DCR

// #region Master expense-config
export const getExpenseConfig = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_EXPENSE_CONFIG,
    payload: { params, onSuccess, onFailure },
  };
};
export const saveExpenseConfig = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_EXPENSE_CONFIG,
    payload: { params, onSuccess, onFailure },
  };
};
// #endregion Master expense-config

// #endregion Manage Unlock-DCR
export const getUnlockDCRData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_UNLOCK_DCR_DATA,
    payload: { params, onSuccess, onFailure },
  };
};
export const updateUnlockDCRData = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_UNLOCK_DCR,
    payload: { params, onSuccess, onFailure },
  };
};
// #endregion Manage Unlock-DCR

// #region Messaging broadcast-mobile-news
export const getBroadcastMobileNewsList = ({ onSuccess, onFailure }) => {
  return {
    type: GET_BROADCAST_MOBILE_NEWS_LIST,
    payload: { onSuccess, onFailure },
  };
};
export const addBroadcastMobileNewsList = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: ADD_BROADCAST_MOBILE_NEWS_LIST,
    payload: { params, onSuccess, onFailure },
  };
};
export const updateBroadcastMobileNewsList = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: UPDATE_BROADCAST_MOBILE_NEWS_LIST,
    payload: { params, onSuccess, onFailure },
  };
};
// #endregion Messaging broadcast-mobile-news

// #region Approval expense-approval
export const getExpenseApprovalList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_EXPENSE_APPROVAL_LIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const getExpenseApprovalListOfEmployee = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: GET_EXPENSE_APPROVAL_LIST_OF_EMPLOYEE,
    payload: { params, onSuccess, onFailure },
  };
};

export const getExpenseApprovalAsyncListOfEmployee = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: GET_EXPENSE_APPROVAL_LIST_OF_EMPLOYEE_ASYNC,
    payload: { params, onSuccess, onFailure },
  };
};

export const updateExpenseApprovalList = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_EXPENSE_APPROVAL,
    payload: { params, onSuccess, onFailure },
  };
};
// #endregion Approval expense-approval

// #region Route - Merge Route
export const mergeRoutes = ({ params, onSuccess, onFailure }) => {
  return {
    type: MERGE_ROUTES,
    payload: { params, onSuccess, onFailure },
  };
};
// #endregion Route - Merge Route

// #region Route assign-stockist-to-employee
export const getStockistOfStateEmployee = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: GET_STOCKISTLIST_OF_STATE_EMPLOYEE,
    payload: { params, onSuccess, onFailure },
  };
};

export const assignStockistToEmployee = ({ params, onSuccess, onFailure }) => {
  return {
    type: ASSIGN_STOCKIST_TO_EMPLOYEE,
    payload: { params, onSuccess, onFailure },
  };
};
// #region Route assign-stockist-to-employee

// #region Report leave-report
export const getLeaveReport = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_LEAVE_REPORT,
    payload: { params, onSuccess, onFailure },
  };
};
// #endregion Report leave-report

// #region Report chemist-cumulative-productive-calls
export const getChemistCumulativeProductiveCallList = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: GET_CHEMIST_CUMULATIVE_PROD_CALLS_LIST,
    payload: { params, onSuccess, onFailure },
  };
};
// #endregion Report chemist-cumulative-productive-calls

// #region Report-TPvsAutosvDCR Expense Report
export const getExpenseReportList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_EXPENSE_REPORT_LIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const getExpenseReportComparisonData = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: GET_EXPENSE_REPORT_COMPARISON_DATA,
    payload: { params, onSuccess, onFailure },
  };
};
// #endregion Report-TPvsAutosvDCR Expense Report

// #region Route transfer-routes-to-employee
export const transferRoutesToEmployee = ({ params, onSuccess, onFailure }) => {
  return {
    type: TRANSFER_ROUTES_TO_EMPLOYEE,
    payload: { params, onSuccess, onFailure },
  };
};
// #endregion Route transfer-routes-to-employee

// #region Notifications

export const getNotifications = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_NOTIFICATIONS,
    payload: { params, onSuccess, onFailure },
  };
};

export const addNotifications = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_NOTIFICATION,
    payload: { params, onSuccess, onFailure },
  };
};

export const getNotificationCount = ({ onSuccess, onFailure }) => {
  return {
    type: GET_NOTIFICATION_COUNT,
    payload: { onSuccess, onFailure },
  };
};

// #endregion Notifications

//#region SMS
export const sendSms = ({ params, onSuccess, onFailure }) => {
  return {
    type: SEND_SMS,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion SMS

//#region GPS - GPS Track
export const getGPSTrackData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_GPS_TRACK_DATA,
    payload: { params, onSuccess, onFailure },
  };
};

export const getGPSLocationHistory = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_GPS_LOCATION_HISTORY_DATA,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion GPS - GPS Track

//#region Approve manage-DCR
export const manageDCR = ({ params, onSuccess, onFailure }) => {
  return {
    type: MANAGE_DCR,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Approve manage-DCR

//#region GPS - Manager Vs Team
export const getManagerVsTeamData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_MANAGER_VS_TEAM_DATA,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion GPS - Manager Vs Team

//#region Report - Tp vs Actual Route
export const getTpVsActualRouteData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_TP_VS_ACTUAL_DATA,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Report - Tp vs Actual Route

//#region Approve - Registration
export const getRegistrationList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_REGISTRATION_APPROVAL_DATA,
    payload: { params, onSuccess, onFailure },
  };
};

export const updateRegistration = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_REGISTRATION_REQ,
    payload: { params, onSuccess, onFailure },
  };
};

export const getMatchingChemistData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_MATCHING_CHEMIST_DATA,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Approve - Registration

//#region Master - Reward
export const getRewardList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_REWARDLIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const addReward = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_REWARD,
    payload: { params, onSuccess, onFailure },
  };
};

export const updateReward = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_REWARD,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Master - Reward

//#region Manage - Advertise
export const saveAdvertiseImages = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_ADVERTISE_IMAGES,
    payload: { params, onSuccess, onFailure },
  };
};

export const getAdvertiseImages = ({ onSuccess, onFailure }) => {
  return {
    type: GET_ADVERTISE_IMAGES,
    payload: { onSuccess, onFailure },
  };
};
//#endregion Manage - Advertise

//#region Manage - Advertise
export const getChemistVisitsReportData = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: GET_CHEMIST_VISITS_DATA,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Manage - Advertise

//#region Sales - Invoice
export const getInvoiceList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_INVOICE_LIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const updateInvoice = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_INVOICE,
    payload: { params, onSuccess, onFailure },
  };
};

export const checkDuplicateInvoice = ({ params, onSuccess, onFailure }) => {
  return {
    type: CHECK_DUPLICATE_INVOICE,
    payload: { params, onSuccess, onFailure },
  };
};

export const approveReturnInvoice = ({ params, onSuccess, onFailure }) => {
  return {
    type: APPROVE_RETURN_INVOICE,
    payload: { params, onSuccess, onFailure },
  };
};

export const updateReturnInvoice = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_RETURN_INVOICE,
    payload: { params, onSuccess, onFailure },
  };
};

export const getInvoiceItemData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_INVOICEITEMDATA,
    payload: { params, onSuccess, onFailure },
  };
};

//#endregion Sales - Invoice

//#region Sales - Order
export const getOrderList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_ORDER_LIST,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const getOrderDataById = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_ORDERDATA_BYID,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const updateOrder = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_ORDER,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

//#endregion Sales - Order

//#region Approval - Redemption
export const getRedemptionList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_REDEMPTION_LIST,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const updateRedemption = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_REDEMPTION,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const getRedemptionApprovalMessage = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: GET_REDEMPTION_APPROVALMESSAGE,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

//#endregion Approval - Redemption

//#region Manage - Update Points
export const updatePoints = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_POINTS,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};
//#endregion Manage - Update Points

//#region Route - Emp Route
export const getEmpRouteList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_EMPROUTELIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const exportEmpRouteList = ({ params, onSuccess, onFailure }) => {
  return {
    type: DOWNLOAD_EMPROUTELIST,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Route - Emp Route

//#region Report - Attendance
export const getAttendanceReportData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_ATTENDANCE,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Report - Attendance

//#region Report - Target
export const getTargetData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_TARGET,
    payload: { params, onSuccess, onFailure },
  };
};

export const uploadTargetData = ({ params, onSuccess, onFailure }) => {
  return {
    type: INSERT_TARGET,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Report - Target

// WorkFlow Saga start
export const getWorkFlowList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_WORKFLOW,
    payload: { params, onSuccess, onFailure },
  };
};
// WorkFlow Saga End

//Start
export const getChemistProfileList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_CHEMIST_PROFILE_LIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const getChemistProfileData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_CHEMIST_PROFILE_DATA,
    payload: { params, onSuccess, onFailure },
  };
};

export const updateChemistProfile = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_CHEMIST_PROFILE,
    payload: { params, onSuccess, onFailure },
  };
};

//End

export const getLookupRoutes = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_LOOKUP_ROUTES,
    payload: { params, onSuccess, onFailure },
  };
};

// Monthly Expense Summary Report Start

export const getMonthlyExpenseSummaryReportList = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: GET_MONTHLY_EXPENSE_SUMMARY_REPORT_Data,
    payload: { params, onSuccess, onFailure },
  };
};

// Monthly Expense Summary Report End

//#region Manage - Series
export const getSeriesList = ({ onSuccess, onFailure }) => {
  return {
    type: GET_SERIESLIST,
    payload: { onSuccess, onFailure },
  };
};

export const addUpdateSeries = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_SERIES,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

//#endregion Manage - Series

export const getDocumentTypeList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DOCUMENTTYPELIST,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const addDocumentType = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_DOCUMENTTYPE,
    payload: { params, onSuccess, onFailure },
  };
};

export const updateDocumentType = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_DOCUMENTTYPE,
    payload: { params, onSuccess, onFailure },
  };
};

export const getVideoList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_VIDEOLIST,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const addVideoSeries = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_VIDEOSERIES,
    payload: { params, onSuccess, onFailure },
  };
};

export const getSeriesData = ({ onSuccess, onFailure }) => {
  return {
    type: GET_SERIESDATA,
    payload: { onSuccess, onFailure },
  };
};

export const getTandC = ({ onSuccess, onFailure }) => {
  return {
    type: GET_TANDC,
    payload: { onSuccess, onFailure },
  };
};

export const saveTandC = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_TANDC,
    payload: { params, onSuccess, onFailure },
  };
};

export const getDCRPreviewAsyncData = ({ params, onSuccess, onFailure }) => {
  return {
    type: DCR_PREVIEW_ASYNC,
    payload: { params, onSuccess, onFailure },
  };
};

export const getGPSTracerDataByDatetimeAndEmployee = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: GET_GPS_TRACK_DATA_BY_ATETIMEANDEMPLOYEE,
    payload: { params, onSuccess, onFailure },
  };
};

export const getDCRCalendarAsyncData = ({ params, onSuccess, onFailure }) => {
  return {
    type: DCR_CALENDER_ASYNC,
    payload: { params, onSuccess, onFailure },
  };
};

export const getDashboardStateWiseCountData = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: GET_DASHBOARD_STATEWISE_COUNT_DATA,
    payload: { params, onSuccess, onFailure },
  };
};
export const getDashboardStateWiseData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DASHBOARD_STATEWISE_DATA,
    payload: { params, onSuccess, onFailure },
  };
};
// Video Summary Report Start

export const getVideoSummaryList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_VIDEO_SUMMARY_REPORT_DATA,
    payload: { params, onSuccess, onFailure },
  };
};

export const getVideoSummaryDetailsList = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: GET_VIDEO_SUMMARY_DETAILS_DATA,
    payload: { params, onSuccess, onFailure },
  };
};
// Video Summary Report End

// Feature Start

export const getFeatureList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_FEATURE_DATA,
    payload: { params, onSuccess, onFailure },
  };
};
export const saveFeatureData = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_FEATURE_DATA,
    payload: { params, onSuccess, onFailure },
  };
};
// Feature End

//#region Manage - Selfie

export const getSelfieList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_SELFIE_DATA,
    payload: { params, onSuccess, onFailure },
  };
};

export const updateSelfie = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_SELFIE_DATA,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

//#endregion Manage - Selfie

export const getSurveyData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_SURVEY_DATA,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const saveSurveyData = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_SURVEY_DATA,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const getSurveyQuestionData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_SURVEYQUESTION_DATA,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const getAnswerGroupData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_ANSWERGROUP_DATA,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const saveSurveyQuestionData = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_SURVEYQUESTION_DATA,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const deleteSurveyQuestionData = ({ params, onSuccess, onFailure }) => {
  return {
    type: DELETE_SURVEYQUESTION_DATA,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const saveSurveyCopyData = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_SURVEYCOPY_DATA,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

//#region Survey - Question Type

export const getQuestionsData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_QUESTION_TYPE,
    payload: { params, onSuccess, onFailure },
  };
};

export const addUpdateQuestions = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_QUESTION_TYPE,
    payload: { params, onSuccess, onFailure },
  };
};

//#endregion Survey - Question Type

// Action to get aws signed url to upload files
export const getAWSFileUploadURL = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_AWS_FILEUPLOAD_URL,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

// #region Notifications

export const sendNotifications = ({ onSuccess, onFailure }) => {
  return {
    type: SEND_NOTIFICATION,
    payload: { onSuccess, onFailure },
  };
};

// #endregion Notifications

//#region SMS
export const sendFeatureSms = ({ params, onSuccess, onFailure }) => {
  return {
    type: SEND_FEATURE_SMS,
    payload: { params, onSuccess, onFailure },
  };
};

export const getSurveyReportData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_SURVEYREPORT_DATA,
    payload: { params, onSuccess, onFailure },
  };
};

export const getSurveyChemistData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_SURVEYCHEMIST_DATA,
    payload: { params, onSuccess, onFailure },
  };
};

export const getActiveSurveyData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_ACTIVESURVEY_DATA,
    payload: { params, onSuccess, onFailure },
  };
};

export const getPointsConfig = ({ onSuccess, onFailure }) => {
  return {
    type: GET_POINTSCONFIG_DATA,
    payload: { onSuccess, onFailure },
  };
};

export const updatePointsConfig = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_POINTSCONFIG_DATA,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const getCustomerOrderData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_CUSTOME_RORDER_DATA,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const getCustomerOrderDataById = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_CUSTOME_RORDER_DATA_BYID,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const updateCustomerOrderData = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_CUSTOME_RORDER_DATA,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

// My Order Start
export const getMyOrderList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_MYORDER_LIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const getMyOrderItemPriceList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_MYORDER_ITEMPRICE,
    payload: { params, onSuccess, onFailure },
  };
};

export const saveMyOrder = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_MYORDER,
    payload: { params, onSuccess, onFailure },
  };
};
// My Order End

// Menu Role Start
export const getMenuRoleList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_MENUROLE_LIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const refreshMenuItem = ({ params, onSuccess, onFailure }) => {
  return {
    type: REFRESH_MENU_ITEM,
    payload: { params, onSuccess, onFailure },
  };
};

export const saveMenuRoleData = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_MENUROLE_DATA,
    payload: { params, onSuccess, onFailure },
  };
};
// Menu Role End

// Default Secondary Start

export const getDefaultSecondary = ({ onSuccess, onFailure }) => {
  return {
    type: GET_DEFAULT_SECONDARY,
    payload: { onSuccess, onFailure },
  };
};

export const updategetDefaultSecondary = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_DEFAULT_SECONDARY,
    payload: { params, onSuccess, onFailure },
  };
};

export const updategetAllDefaultSecondary = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: UPDATE_DEFAULTALL_SECONDARY,
    payload: { params, onSuccess, onFailure },
  };
};

// Default Secondary end

export const getAllDivisions = ({ onSuccess, onFailure }) => {
  return {
    type: GET_ALLDIVISIONS,
    payload: { onSuccess, onFailure },
  };
};

export const getSmsCode = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_SMS_CODE,
    payload: { params, onSuccess, onFailure },
  };
};

export const getSmsMessage = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_SMS_MESSAGE,
    payload: { params, onSuccess, onFailure },
  };
};

//#region Report - Claim Reward
export const getClaimRewardReportData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_CLAIMREWARD,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Report - Claim Reward

//#region Report - Item Wise Sales
export const getItemWiseSalesReportData = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: GET_ITEMWISESALES,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Report - Item Wise Sales

//#region Report - Top Customer report
export const getTopCustomerReportData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_TOPCUSTOMER,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Report - Top Customer report

//#region Primary Purchase

export const getPrimaryPurchaseList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_PRIMARYPURCHASELIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const importPrimaryPurchaseList = ({ params, onSuccess, onFailure }) => {
  return {
    type: IMPORT_PRIMARYPURCHASE_LIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const savePrimaryPurchase = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_PRIMARYPURCHASE,
    payload: { params, onSuccess, onFailure },
  };
};

//#endregion Primary Purchase

//#region - GPS SMS Track
export const getGPSSMSTrackData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_GPSSMSTRACK,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion - GPS SMS Track

//#region Report - Primary Vs Secondary
export const getPrimaryVsSecondaryReportData = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: GET_PRIMARYVSSECONDARY,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Report - Primary Vs Secondary

//#region Report - Smart Setu App
export const getSmartSetuAppReportData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_SMARTSETUAPP,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Report - Smart Setu App

//#region Report - Primary Vs Claim
export const getPrimaryVsClaimReportData = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: GET_PRIMARYVSCLAIM,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Report - Primary Vs Claim

//#region Report - Employee Ref Mapping
export const getEmployeeRefMappingReportData = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: GET_EMPLOYEEREFMAPPING,
    payload: { params, onSuccess, onFailure },
  };
};

//#endregion Report - Employee Ref Mapping

//#region Master-QR
export const getQRList = ({ onSuccess, onFailure }) => {
  return {
    type: GET_QRLIST,
    payload: { onSuccess, onFailure },
  };
};

export const addQR = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_QR,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const updateQR = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_QR,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const deleteQR = ({ params, onSuccess, onFailure }) => {
  return {
    type: DELETE_QR,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const generateQRCode = ({ params, onSuccess, onFailure }) => {
  return {
    type: GENERATE_QR,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const printDownloadQR = ({ params, onSuccess, onFailure }) => {
  return {
    type: PRINTDOWNLOAD_QR,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};

export const getQRPrintHistory = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_QRPRINTHISTORY,
    payload: {
      params,
      onSuccess,
      onFailure,
    },
  };
};
//#endregion Master-QR

export const getStockistAssignedDivision = ({ onSuccess, onFailure }) => {
  return {
    type: GET_STOCKISTASSIGNEDDIVISION,
    payload: { onSuccess, onFailure },
  };
};

//#region Report - Get Closing Stock
export const getDepoList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DEPO_LIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const getClosingStockList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_CLOSING_STOCK_LIST,
    payload: { params, onSuccess, onFailure },
  };
};

//#endregion Report -Get Closing Stock

//#region Report - Get Monthly Sales
export const getMonthlySalesData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_MONTHLY_SALES_DATA,
    payload: { params, onSuccess, onFailure },
  };
};

//#endregion Report - Get Monthly Sales

//#region Report - Read FTP files
export const readFTPFiles = ({ onSuccess, onFailure }) => {
  return {
    type: READ_FTP_FILES,
    payload: { onSuccess, onFailure },
  };
};
//#endregion Report - Read FTP files

//#region Report - Get OutStanding Report
export const getStockistFilterList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_STOCKIST_FILTER_LIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const getOutStandingReport = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_OUTSTANDING_REPORT,
    payload: { params, onSuccess, onFailure },
  };
};

//#endregion Report - Get OutStanding Report

//#region Get FTP Division List
export const getFTPDivisionData = ({ onSuccess, onFailure }) => {
  return {
    type: GET_FTP_DIVISION_LIST,
    payload: { onSuccess, onFailure },
  };
};
//#endregion Get FTP Division List

// #region Master-Guest
export const getGuestList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_GUESTLIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const addGuest = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_GUEST,
    payload: { params, onSuccess, onFailure },
  };
};
export const guestUploadFilegetData = ({ params, onSuccess, onFailure }) => {
  return {
    type: guestUploadFile_getData,
    payload: { params, onSuccess, onFailure },
  };
};
export const updateGuest = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_GUEST,
    payload: { params, onSuccess, onFailure },
  };
};
// #endregion Master - Guest

//#region Room Category
export const getRoomCategory = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_ROOM_CATEGORY,
    payload: { params, onSuccess, onFailure },
  };
};
export const getMemberShip = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_MEMBERSHIP,
    payload: { params, onSuccess, onFailure },
  };
};
export const insertRoomCategory = ({ params, onSuccess, onFailure }) => {
  return {
    type: INSERT_ROOM_CATEGORY,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Room Category

//#region Room Master
export const getRoomMaster = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_ROOM_MASTER,
    payload: { params, onSuccess, onFailure },
  };
};
export const saveRoomMaster = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_ROOM_MASTER,
    payload: { params, onSuccess, onFailure },
  };
};
export const getRoomCategories = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_ROOM_CATEGORIES,
    payload: { params, onSuccess, onFailure },
  };
};
export const getKeyList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_KEY_LIST,
    payload: { params, onSuccess, onFailure },
  };
};

//#endregion Room Master

//#region Master-dietMaster
export const getDietMaster = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DIET_MASTER,
    payload: { params, onSuccess, onFailure },
  };
};
export const saveDietMaster = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_DIET_MASTER,
    payload: { params, onSuccess, onFailure },
  };
};
export const updateDietMaster = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_DIET,
    payload: { params, onSuccess, onFailure },
  };
};
export const getDietCategories = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DIET_CATEGORIES,
    payload: { params, onSuccess, onFailure },
  };
};
export const getDelete = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DIET_DELETE,
    payload: { params, onSuccess, onFailure },
  };
};
export const viewMealData = ({ params, onSuccess, onFailure }) => {
  return {
    type: VIEW_MEALDATA,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion diet Master

//#region Key Master
export const getKeyMaster = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_KEY_MASTER,
    payload: { params, onSuccess, onFailure },
  };
};
export const saveKeyMaster = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_KEY_MASTER,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Key Master

//#region Amenity Master
export const getAmenityMaster = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_AMENITY_MASTER,
    payload: { params, onSuccess, onFailure },
  };
};
export const saveAmenityMaster = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_AMENITY_MASTER,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Amenity Master

//#region Manage Booking
export const getManageBooking = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_MANAGE_BOOKING,
    payload: { params, onSuccess, onFailure },
  };
};
export const saveManageBooking = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_MANAGE_BOOKING,
    payload: { params, onSuccess, onFailure },
  };
};

export const updateManageBooking = ({ params, onSuccess, onFailure }) => {
  return {
    type: manageBooking_updateManageBooking,
    payload: { params, onSuccess, onFailure },
  };
};
export const deleteManageBooking = ({ params, onSuccess, onFailure }) => {
  return {
    type: manageBooking_deleteManageBooking,
    payload: { params, onSuccess, onFailure },
  };
};
export const getStatusFilter = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_STATUS_FILTER,
    payload: { params, onSuccess, onFailure },
  };
};
export const getLatestGuest = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_LATESTGUEST,
    payload: { params, onSuccess, onFailure },
  };
};
export const getRoomList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_ROOMLIST,
    payload: { params, onSuccess, onFailure },
  };
};
export const getRoomStatus = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_ROOMSTATUS,
    payload: { params, onSuccess, onFailure },
  };
};
export const getDefaultRoomStatus = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DEFAULTROOMSTATUS,
    payload: { params, onSuccess, onFailure },
  };
};
export const getDefaultRoomCategory = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DEFAULTROOMCATEGORY,
    payload: { params, onSuccess, onFailure },
  };
};
export const checkedOutPerticularRoom = ({ params, onSuccess, onFailure }) => {
  return {
    type: manageBooking_checkedOutPerticularRoom,
    payload: { params, onSuccess, onFailure},
  }
};
export const manageBooking_GetbookingData = ({ params, onSuccess, onFailure }) => {
  return {
    type: manageBooking_getbookingData,
    payload: { params, onSuccess, onFailure },
  };
};

export const manageBooking_GetGuestBookingDetails = ({ params, onSuccess, onFailure }) => {
  return {
    type: manageBooking_getGuestBookingDetails,
    payload: { params, onSuccess, onFailure },
  };
};

export const manageBooking_GetRoomAssignDetails = ({ params, onSuccess, onFailure }) => {
  return {
    type: manageBooking_getRoomAssignDetails,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Manage Booking

//#region Disease Master
export const getDiseaseMaster = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DISEASE_MASTER,
    payload: { params, onSuccess, onFailure },
  };
};
export const saveDiseaseMaster = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_DISEASE_MASTER,
    payload: { params, onSuccess, onFailure },
  };
};
export const deleteDiseaseMaster = ({ params, onSuccess, onFailure }) => {
  return {
    type: DELETE_DISEASE_MASTER,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Disease Master

//#region get treatment Master
export const getTreatmentMasterList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_TREATMENT_MASTER,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion get treatment Master
//#region save treatment Master
export const saveTreatmentMaster = ({ params, onSuccess, onFailure }) => {
  console.log("params ::: ", params);
  return {
    type: SAVE_TREATMENT_MASTER,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion save treatment Master

//#region edit treatment Master
export const editTreatmentMaster = ({ params, onSuccess, onFailure }) => {
  return {
    type: EDIT_TREATMENT_MASTER,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion edit treatment Master

//#region delete treatment Master
export const deleteTreatmentMaster = ({ params, onSuccess, onFailure }) => {
  console.log("params :: ", params);
  return {
    type: DELETE_TREATMENT_MASTER,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion delete treatment Master

//#region get all disease
export const getAllDisease = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DISEASE_FOR_TREATMENT_MASTER,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion get all disease
export const getDiseaseData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DISEASEDATA,
    payload: { params, onSuccess, onFailure },
  };
};
export const getDiseaseList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DISEASELIST,
    payload: { params, onSuccess, onFailure },
  };
};

//#region treatmentplan

export const dietPlanGetData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DIETLIST_MASTER,
    payload: { params, onSuccess, onFailure },
  };
};
export const therapyPlanGetData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_THERAPYLIST_MASTER,
    payload: { params, onSuccess, onFailure },
  };
};
export const getDiet = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DISEASE_NAME,
    payload: { params, onSuccess, onFailure },
  };
};
export const getTreatment = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_TREATMENT_NAME,
    payload: { params, onSuccess, onFailure },
  };
};
export const saveTemplete = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_TEMPLETE_NAME,
    payload: { params, onSuccess, onFailure },
  };
};
// export const getDiseaseList = ({ params, onSuccess, onFailure }) => {
//   return {
//     type: GET_DISEASELIST,
//     payload: { params, onSuccess, onFailure },
//   };
// };
export const gettempleteDiseaseCategories = ({
  params,
  onSuccess,
  onFailure,
}) => {
  return {
    type: GET_TEMPLETEDISEASE,
    payload: { params, onSuccess, onFailure },
  };
};
export const deletetemplete = ({ params, onSuccess, onFailure }) => {
  return {
    type: DELETE_TEMPLETE,
    payload: { params, onSuccess, onFailure },
  };
};

export const updatetemplete = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_TEMPLETE,
    payload: { params, onSuccess, onFailure },
  };
};

export const getTreatmentdetail = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_TEMPLATENAMELIST,
    payload: { params, onSuccess, onFailure },
  };
};

//#endregion dietplan

//#region Health History
export const getHealthDisease = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_HEALTHLIST,
    payload: { params, onSuccess, onFailure },
  };
};

export const updateDiseaseList = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_DISEASEDATA,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Health History

//#region ApprovalLeave
export const getApprovalLeave = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_APPROVAL_LEAVE,
    payload: { params, onSuccess, onFailure },
  };
};
export const updateApprovalLeave = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_APPROVAL_LEAVE,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion ApprovalLeave

//#region daily therapy
export const getDailytherapy = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DAILYTHERAPY,
    payload: { params, onSuccess, onFailure },
  };
};
export const getDailytherapyTypeName = ({ onSuccess, onFailure }) => {
  return {
    type: GET_DAILYTHERAPY_TYPENAME,
    payload: { onSuccess, onFailure },
  };
};
export const getDailytherapySlot = ({ onSuccess, onFailure }) => {
  return {
    type: GET_DAILYTHERAPY_SLOT,
    payload: { onSuccess, onFailure },
  };
};
export const updateDailytherapy = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DAILYTHERAPY_UPDATE,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion daily therapy
//#region TherapyType Master
export const getTherapyType = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_THERAPYTYPE,
    payload: { params, onSuccess, onFailure },
  };
};
export const saveTherapyType = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_THERAPYTYPE,
    payload: { params, onSuccess, onFailure },
  };
};
export const deleteTherapyType = ({ params, onSuccess, onFailure }) => {
  return {
    type: DELETE_THERAPYTYPE,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion TherapyType Master

//#region TherapySLot Master
export const getTherapySlot = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_THERAPYSLOT,
    payload: { params, onSuccess, onFailure },
  };
};
export const getTherapyCategory = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_THERAPY,
    payload: { params, onSuccess, onFailure },
  };
};
export const saveTherapySlot = ({ params, onSuccess, onFailure }) => {
  return {
    type: SAVE_THERAPYSLOT,
    payload: { params, onSuccess, onFailure },
  };
};
export const deleteTherapySlot = ({ params, onSuccess, onFailure }) => {
  return {
    type: DELETE_THERAPYSLOT,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion TherapySlot Master

//#region MemberShip Master

export const getMemberShipDays = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DAYS,
    payload: { params, onSuccess, onFailure },
  };
};
export const insertMemberShipData = ({ params, onSuccess, onFailure }) => {
  return {
  type: ADD_MEMBERSHIP,
    payload: { params, onSuccess, onFailure },
  };
};
export const updateMemberShipData = ({ params, onSuccess, onFailure }) => {
  return {
  type: UPDATE_MEMBERSHIP,
    payload: { params, onSuccess, onFailure },
  };
};
export const getMemberShipMasterEffectiveDate = ({ params, onSuccess, onFailure }) => {
  return {
  type: GET_MEMBERSHIP_EFFECTIVEDATE,
    payload: { params, onSuccess, onFailure },
  };
};
export const deleteMemberShipData = ({ params, onSuccess, onFailure }) => {
  return {
  type: DELETE_MEMBERSHIP,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion MemberShip Master 
export const getTime = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_ROOMRATETIME,
    payload: { params, onSuccess, onFailure },
  };
};
export const updateroomRate = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_ROOMRATE,
    payload: { params, onSuccess, onFailure },
  };
};

export const datefilter = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_ROOMFILTER,
    payload: { params, onSuccess, onFailure },
  };

};
export const listdays = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_LISTDAYS,
    payload: { params, onSuccess, onFailure },
  };
};

export const saveroomRate = ({ params, onSuccess, onFailure }) => {
  console.log(params);
  return {
    type: SAVE_ROOMRATE,
    payload: { params, onSuccess, onFailure },
  };
};

export const deleteroomrate = ({ params, onSuccess, onFailure }) => {
  return {
    type: DELETE_ROOMRATE,
    payload: { params, onSuccess, onFailure },
  };
};

export const listallcategoryname = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_LISTALLCATEGORYNAME,
    payload: { params, onSuccess, onFailure },
  };
};

export const getOccupancy = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_OCCUPANCY,
    payload: { params, onSuccess, onFailure },
  };
};
export const getSingleEmyloyeeData = ({ params, onSuccess, onFailure }) => {
  return {
    type: SINGLE_EMPLOYEE,
    payload: { params, onSuccess, onFailure },
  };

};

//#region Screen-MealTemplate
export const getEffectiveDateFilter = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_EFFECTIVEDATEFILTER,
    payload: { params, onSuccess, onFailure },
  };
};
export const getMealTemplateList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_MEALTEMPLATELIST,
    payload: { params, onSuccess, onFailure },
  };
};
export const getExistingMealData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_EXISTINGMEALDATA,
    payload: { params, onSuccess, onFailure },
  };
};
export const saveMealTemplateData = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_MEALTEMPLATE,
    payload: { params, onSuccess, onFailure },
  };
};
export const updateMealTemplateData = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_MEALTEMPLATEATA,
    payload: { params, onSuccess, onFailure },
  };
};
export const deleteMealTemplateData = ({ params, onSuccess, onFailure }) => {
  return {
    type: DELETE_MEALTEMPLATE,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Screen-MealTemplate

export const guestUploadFile_DownloadFile = ({ params, onSuccess, onFailure }) => {
  return {
    type: guestUploadFile_downloadFile,
    payload: { params, onSuccess, onFailure },
  };
}; export const getMealEditDay = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_MEALEDITDAY,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Screen-MealTemplate

//#region Screen-DateWiseMealTemplate
export const getExistingDataOnEffeDateWise = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_EXISTINGDATAONEFFEDATEWISE,
    payload: { params, onSuccess, onFailure },
  };
};
export const getDateWiseMealTemplateList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DATEWISEMEALTEMPLATELIST,
    payload: { params, onSuccess, onFailure },
  };
};
export const getExistingDateWiseMealTemplateList = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_EXISTINGDATEWISEMEALTEMPLATELIST,
    payload: { params, onSuccess, onFailure },
  };
};
export const getEffectiveDate = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_EFFECTIVEDATE,
    payload: { params, onSuccess, onFailure },
  };
};
export const getDateWiseMealTemplateExistingData = ({ params, onSuccess, onFailure }) => {
  return {
    type: GET_DATEWISEMEALTEMPLATEEXISTINGDATA,
    payload: { params, onSuccess, onFailure },
  };
};
export const saveDateWiseMealTemplateData = ({ params, onSuccess, onFailure }) => {
  return {
    type: ADD_DATEWISEMEALTEMPLATE,
    payload: { params, onSuccess, onFailure },
  };
};
export const updateDateWiseMealTemplateData = ({ params, onSuccess, onFailure }) => {
  return {
    type: UPDATE_DATEWISEMEALTEMPLATE,
    payload: { params, onSuccess, onFailure },
  };
};
export const deleteDateWiseMealTemplateData = ({ params, onSuccess, onFailure }) => {
  return {
    type: DELETE_DATEWISEMEALTEMPLATE,
    payload: { params, onSuccess, onFailure },
  };
};
//#endregion Screen-DateWiseMealTemplate
