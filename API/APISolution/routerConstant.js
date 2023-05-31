/**
 * @author "Parth Suthar,Khushbu Shah"
 */

module.exports = {
  publicAPIRouterConstant: {
    diseaseMaster_getDiseaseMaster_public: {
      url: "/diseaseMaster/getDiseaseMaster",
      permission: "O",
    },
    treatment_updateData_public: {
      url: "/treatment/updateDisease",
      permission: "O",
    },
    login: { url: "/publicAPILogin" },
    isAuthorizedUser: { url: "/isAuthorizedUser" },
    userRegistration_insertData: {
      url: "/userRegistration/insertData",
      permission: "I",
    },
    userRegistration_getData: {
      url: "/userRegistration/getData",
      permission: "V",
    },
    userRegistration_updateData: {
      url: "/userRegistration/updateData",
      permission: "E",
    },
    userRegistration_getMatchingChemistData: {
      url: "/userRegistration/getMatchingChemistData",
      permission: "V",
    },
    advertise_getData: {
      url: "/advertise/getData",
      permission: "V",
    },
    advertise_insertData: { url: "/advertise/insertData", permission: "I" },
    viewCSProfile_getData: { url: "/viewCSProfile/getData", permission: "V" },
    viewCSProfile_getSLData: {
      url: "/viewCSProfile/getSLData",
      permission: "V",
    },
    redeemRequest_getRewardStatusData: {
      url: "/redeemRequest/getRewardStatusData",
      permission: "V",
    },
    redeemRequest_insertData: {
      url: "/redeemRequest/insertData",
      permission: "I",
    },
    redeemRequest_updateData: {
      url: "/redeemRequest/updateData",
      permission: "E",
    },
    redeemRequest_getData: {
      url: "/redeemRequest/getData",
      permission: "V",
    },
    redeemRequest_getMessageData: {
      url: "/redeemRequest/getMessageData",
      permission: "L",
    },
    firebaseTokenCS_insertData: {
      url: "/firebaseTokenCS/insertData",
      permission: "O",
    },
    monthlyStatus_getData: { url: "/monthlyStatus/getData", permission: "V" },
  },
  insertClientLog: {
    url: "/insertClientLog",
  },
  getRoutesForAddDCR_lookUpData: {
    url: "/getRoutesForAddDCR/lookUpData",
    permission: "O", //o: Open API
  },
  getMonthYearRangeForGivenRange_lookUpData: {
    url: "/getMonthYearRangeForGivenRange/lookUpData",
    permission: "O", //o: Open API
  },
  getSLOrManagerListByEmployeeId_lookUpData: {
    url: "/getSLOrManagerListByEmployeeId/lookUpData",
    permission: "O", //o: Open API
  },
  getSubordinatesByEmployeeId_lookUpData: {
    url: "/getSubordinatesByEmployeeId/lookUpData",
    permission: "O", //o: Open API
  },
  getMonthYearRangeForTourPlan_lookUpData: {
    url: "/getMonthYearRangeForTourPlan/lookUpData",
    permission: "O", //o: Open API
  },
  getAvailableItemsForSchemeData_lookUpData: {
    url: "/getAvailableItemsForSchemeData/lookUpData",
    permission: "O", //o: Open API
  },
  getCategoryData_lookUpData: {
    url: "/getCategoryData/lookUpData",
    permission: "O", //o: Open API
  },
  getStaticData_lookUpData: {
    url: "/getStaticData/lookUpData",
    permission: "O", //o: Open API
  },
  getAreaData_lookUpData: {
    url: "/getAreaData/lookUpData",
    permission: "O", //o: Open API
  },
  getEmployeeData_lookUpData: {
    url: "/getEmployeeData/lookUpData",
    permission: "O", //o: Open API
  },
  getCityData_lookUpData: {
    url: "/getCityData/lookUpData",
    permission: "O", //o: Open API
  },
  getDesignationData_lookUpData: {
    url: "/getDesignationData/lookUpData",
    permission: "O", //o: Open API
  },
  getDivisionData_lookUpData: {
    url: "/getDivisionData/lookUpData",
    permission: "O", //o: Open API
  },
  getAllDivisionData_lookUpData: {
    url: "/getAllDivisionData/lookUpData",
    permission: "O", //o: Open API
  },
  getStockistAssignedDivision_lookUpData: {
    url: "/getStockistAssignedDivision/lookUpData",
    permission: "O", //o: Open API
  },
  getStateData_lookUpData: {
    url: "/getStateData/lookUpData",
    permission: "O", //o: Open API
  },
  getYearRangeForHolidayMaster_lookUpData: {
    url: "/getYearRangeForHolidayMaster/lookUpData",
    permission: "O", //o: Open API
  },
  getCountryData_lookUpData: {
    url: "/getCountryData/lookUpData",
    permission: "O", //o: Open API
  },
  getRouteData_lookUpData: {
    url: "/getRouteData/lookUpData",
    permission: "O", //o: Open API
  },
  getRoutesByEmployeeId_lookUpData: {
    url: "/getRoutesByEmployeeId/lookUpData",
    permission: "O", //o: Open API
  },
  getStateByEmployeeId_lookUpData: {
    url: "/getStatesByEmployeeId/lookUpData",
    permission: "O", //o: Open API
  },
  getStockistData_lookUpData: {
    url: "/getStockistData/lookUpData",
    permission: "O", //o: Open API
  },
  areaMaster_getData: { url: "/areaMaster/getData", permission: "V" },
  areaMaster_insertData: { url: "/areaMaster/insertData", permission: "I" },
  areaMaster_updateData: { url: "/areaMaster/updateData", permission: "E" },
  areaMaster_deleteData: { url: "/areaMaster/deleteData", permission: "D" },
  cityMaster_getData: { url: "/cityMaster/getData", permission: "V" },
  cityMaster_insertData: { url: "/cityMaster/insertData", permission: "I" },
  cityMaster_updateData: { url: "/cityMaster/updateData", permission: "E" },
  cityMaster_deleteData: { url: "/cityMaster/deleteData", permission: "D" },
  divisionMaster_getData: { url: "/divisionMaster/getData", permission: "V" },
  divisionMaster_insertData: {
    url: "/divisionMaster/insertData",
    permission: "I",
  },
  divisionMaster_updateData: {
    url: "/divisionMaster/updateData",
    permission: "E",
  },
  locationMaster_getData: {
    url: "/locationMaster/getData",
    permission: "V",
  },
  locationMaster_insertData: {
    url: "/locationMaster/insertData",
    permission: "I",
  },
  locationMaster_updateData: {
    url: "/locationMaster/updateData",
    permission: "E",
  },
  locationMaster_deleteData: {
    url: "/locationMaster/deleteData",
    permission: "D",
  },
  treatmentPlanMaster_getTreatmentTemplateCategories: {
    url: "/treatmentPlanMaster/getTreatmentTemplateCategories",
    permission: "O",
  },
  treatmentPlanMaster_getTreatmentList: {
    url: "/treatmentPlanMaster/getTreatmentList",
    permission: "O",
  },
  treatmentPlanMaster_getDietList: {
    url: "/treatmentPlanMaster/getDietList",
    permission: "O",
  },
  treatmentPlanMaster_insertDayWisePlanData: {
    url: "/treatmentPlanMaster/insertDayWisePlanData",
    permission: "O",
  },
  patientPersonalDetail_getPdData: {
    url: "/treatment/getPdData",
    permission: "V",
  },
  patientName_getNameData: {
    url: "/treatment/getNameData",
    permission: "V",
  },
  firebaseNotification: { url: "/firebaseNotification", permission: "O" },
  firebaseInsertToken: { url: "/firebaseInsertToken", permission: "O" },
  notification_getData: { url: "/notification/getData" },
  forgotPassword: { url: "/forgotPassword", permission: "L" },
  sendSms: { url: "/sendSms", permission: "O" },
  holidayMaster_getData: { url: "/holidayMaster/getData", permission: "V" },
  holidayMaster_insertData: {
    url: "/holidayMaster/insertData",
    permission: "I",
  },
  holidayMaster_updateData: {
    url: "/holidayMaster/updateData",
    permission: "E",
  },
  holidayMaster_deleteData: {
    url: "/holidayMaster/deleteData",
    permission: "D",
  },
  // holidayMaster_downloadData: {
  //   url: "/holidayMaster/downloadData",
  //   permission: "V"
  // },
  // holidayMaster_uploadData: {
  //   url: "/holidayMaster/uploadData",
  //   permission: "I"
  // },
  login: { url: "/login" },
  logOut: { url: "/logOut", permission: "L" },
  refreshToken: { url: "/refreshToken", permission: "O" },
  sendMail: { url: "/sendMail" },
  stateMaster_getData: { url: "/stateMaster/getData", permission: "V" },
  stateMaster_insertData: { url: "/stateMaster/insertData", permission: "I" },
  stateMaster_updateData: { url: "/stateMaster/updateData", permission: "E" },
  // updatePoints_updateData: { url: "/updatePoints/updateData", permission: "E" },
  designationMaster_getData: {
    url: "/designationMaster/getData",
    permission: "V",
  },
  designationMaster_insertData: {
    url: "/designationMaster/insertData",
    permission: "I",
  },
  designationMaster_updateData: {
    url: "/designationMaster/updateData",
    permission: "E",
  },
  employeeMaster_getData: { url: "/employeeMaster/getData", permission: "V" },
  employeeMaster_insertData: {
    url: "/employeeMaster/insertData",
    permission: "I",
  },
  employeeMaster_updateData: {
    url: "/employeeMaster/updateData",
    permission: "E",
  },
  employeeMaster_getMobileOwnerName: {
    url: "/employeeMaster/getMobileOwnerName",
    permission: "V",
  },
  employeeMaster_getSingleEmployeeData: {
    url: "/employeeMaster/getSingleEmployeeData",
    permission: "V",
  },
  // routeMaster_getData: { url: "/routeMaster/getData", permission: "V" },
  // routeMaster_insertData: { url: "/routeMaster/insertData", permission: "I" },
  // routeMaster_updateData: { url: "/routeMaster/updateData", permission: "E" },

  // routeMaster_downloadData: {
  //   url: "/routeMaster/downloadData",
  //   permission: "V"
  // },
  // routeMaster_uploadData: {
  //   url: "/routeMaster/uploadData",
  //   permission: "I"
  // },
  // routeMaster_routeLookupData: {
  //   url: "/routeMaster/routeLookupData",
  //   permission: "I"
  // },
  // additionalRoute_insertData: {
  //   url: "/additionalRoute/insertData",
  //   permission: "V"
  // },
  chemist_getProfile: { url: "/chemist/getProfile", permission: "L" },
  chemistMaster_getData: { url: "/chemistMaster/getData", permission: "V" },
  getChemistList_getData: { url: "/getChemistList/getData", permission: "V" },
  chemist_updateRoute: {
    url: "/chemistMaster/updateRoute",
    permission: "E",
  },
  chemistMaster_insertData: {
    url: "/chemistMaster/insertData",
    permission: "I",
  },
  chemistMaster_updateData: {
    url: "/chemistMaster/updateData",
    permission: "E",
  },

  itemMaster_getData: { url: "/itemMaster/getData", permission: "V" },
  itemMaster_insertData: { url: "/itemMaster/insertData", permission: "I" },
  itemMaster_updateData: { url: "/itemMaster/updateData", permission: "E" },
  itemMaster_downloadData: { url: "/itemMaster/downloadData", permission: "V" },
  itemMaster_uploadData: { url: "/itemMaster/uploadData", permission: "I" },
  itemPrice_getData: { url: "/itemPrice/getData", permission: "V" },
  changePassword: { url: "/changePassword", permission: "O" },
  deviceConfiguration_getData: {
    url: "/deviceConfiguration/getData",
    permission: "V",
  },
  deviceConfiguration_insertData: {
    url: "/deviceConfiguration/insertData",
    permission: "I",
  },
  deviceConfiguration_updateData: {
    url: "/deviceConfiguration/updateData",
    permission: "E",
  },
  // schemeMaster_getData: { url: "/schemeMaster/getData", permission: "V" },
  // schemeMaster_insertData: { url: "/schemeMaster/insertData", permission: "I" },
  // schemeMaster_updateData: { url: "/schemeMaster/updateData", permission: "E" },
  // schemeMaster_updateSchemeWiseItem: {
  //   url: "/schemeMaster/updateSchemeWiseItem",
  //   permission: "E"
  // },
  schemeMaster_getSchemeLookupData: {
    url: "/schemeMaster/getSchemeLookupData",
    permission: "O",
  },
  stockistMaster_getData: { url: "/stockistMaster/getData", permission: "V" },
  stockistMaster_insertData: {
    url: "/stockistMaster/insertData",
    permission: "I",
  },
  stockistMaster_updateData: {
    url: "/stockistMaster/updateData",
    permission: "E",
  },
  // userPanel_getData: {
  //   url: "/userPanel/getData",
  //   permission: "V"
  // },
  // userPanel_updateData: {
  //   url: "/userPanel/updateData",
  //   permission: "E"
  // },
  itemPriceMaster_getData: {
    url: "/itemPriceMaster/getData",
    permission: "V",
  },
  itemPriceMaster_insertData: {
    url: "/itemPriceMaster/insertData",
    permission: "I",
  },
  itemPriceMaster_getEffectiveExportDates: {
    url: "/itemPriceMaster/getEffectiveExportDates",
    permission: "V",
  },
  itemPriceMaster_downloadData: {
    url: "/itemPriceMaster/downloadData",
    permission: "V",
  },
  leaveMaster_getData: {
    url: "/leaveMaster/getData",
    permission: "V",
  },
  leaveMaster_insertData: {
    url: "/leaveMaster/insertData",
    permission: "I",
  },
  leaveMaster_updateData: {
    url: "/leaveMaster/updateData",
    permission: "E",
  },
  leaveMaster_deleteData: {
    url: "/leaveMaster/deleteData",
    permission: "D",
  },
  monthlyExpenseSummary_getData: {
    url: "/monthlyExpenseSummary/getData",
    permission: "V",
  },
  // gpsTracer_insertData: {
  //   url: "/gpsTracer/insertData",
  //   permission: "O"
  // },
  // gpsTracer_getDataByDateTimeAndEmployee:{
  //   url: "/gpsTracer/getDataByDateTimeAndEmployee",
  //   permission: "V"
  // },
  startDay: {
    url: "/startDay",
    permission: "L",
  },
  endDay: {
    url: "/endDay",
    permission: "L",
  },
  // slTourPlan_getData: {
  //   url: "/slTourPlan/getData",
  //   permission: "V"
  // },
  // slTourPlan_insertData: {
  //   url: "/slTourPlan/insertData",
  //   permission: "I"
  // },
  // managerTourPlan_getData: {
  //   url: "/managerTourPlan/getData",
  //   permission: "V"
  // },
  // managerTourPlan_insertData: {
  //   url: "/managerTourPlan/insertData",
  //   permission: "I"
  // },
  // askQuery: {
  //   url: "/askQuery",
  //   permission: "A"
  // },
  askQueryCS: {
    url: "/askQueryCS",
    permission: "A",
  },
  dcr_getData: {
    url: "/dcr/getData",
    permission: "V",
  },
  dcr_previewData: {
    url: "/dcr/previewData",
    permission: "V",
  },
  dcr_previewDCRData: {
    url: "/dcr/previewDCRData",
    permission: "V",
  },
  dcr_getCalendarDataAsync: {
    url: "/dcr/getCalendarDataAsync",
    permission: "V",
  },
  // unlockDCR_insertData: {
  //   url: "/unlockDCR/insertData",
  //   permission: "A"
  // },
  // unlockDCR_updateData: {
  //   url: "/unlockDCR/updateData",
  //   permission: "E"
  // },
  // unlockDCR_getData: {
  //   url: "/unlockDCR/getData",
  //   permission: "V"
  // },
  expenseConfigurationMaster_getData: {
    url: "/expenseConfigurationMaster/getData",
    permission: "V",
  },
  expenseConfigurationMaster_updateData: {
    url: "/expenseConfigurationMaster/updateData",
    permission: "E",
  },
  expense_insertData: {
    url: "/expense/insertData",
    permission: "A",
  },
  expense_updateData: {
    url: "/expense/updateData",
    permission: "A",
  },
  expense_getData: {
    url: "/expense/getData",
    permission: "V",
  },
  // tourPlanApproval_getData: {
  //   url: "/tourPlanApproval/getData",
  //   permission: "L"
  // },
  // tourPlanApproval_updateData: {
  //   url: "/tourPlanApproval/updateData",
  //   permission: "A"
  // },
  stockistEmployeeMaster_insertData: {
    url: "/stockistEmployeeMaster/insertData",
    permission: "I",
  },
  stockistEmployeeMaster_getData: {
    url: "/stockistEmployeeMaster/getData",
    permission: "V",
  },
  stockistEmployeeMaster_getAssignedStockist: {
    url: "/stockistEmployeeMaster/getAssignedStockist",
    permission: "V",
  },
  // pob_saveData: {
  //   url: "/pob/saveData",
  //   permission: "A"
  // },
  broadcastMobileNewsMaster_getData: {
    url: "/broadcastMobileNewsMaster/getData",
    permission: "V",
  },
  broadcastMobileNewsMaster_insertData: {
    url: "/broadcastMobileNewsMaster/insertData",
    permission: "I",
  },
  broadcastMobileNewsMaster_updateData: {
    url: "/broadcastMobileNewsMaster/updateData",
    permission: "E",
  },
  notification_getCount: {
    url: "/notification/getCount",
    permission: "L",
  },
  notificationInfo_getCount: {
    url: "/notificationInfo/getCount",
    permission: "V", // O: Open API
  },
  notificationInfo_getData: {
    url: "/notificationInfo/getData",
    permission: "V",
  },
  notificationInfo_insertData: {
    url: "/notificationInfo/insertData",
    permission: "A",
  },
  // expenseApproval_getDataByEmployeeId: {
  //   url: "/expenseApproval/getDataByEmployeeId",
  //   permission: "V"
  // },
  // expenseApproval_getData: { url: "/expenseApproval/getData", permission: "V" },
  // expenseApproval_getAsyncData: { url: "/expenseApproval/getAsyncData", permission: "V" },
  // expenseApproval_updateData: {
  //   url: "/expenseApproval/updateData",
  //   permission: "E"
  // },
  // order_getData: {
  //   url: "/order/getData",
  //   permission: "V"
  // },
  // order_insertData: {
  //   url: "/order/insertData",
  //   permission: "A"
  // },
  // order_updateStockistData: {
  //   url: "/order/updateStockistData",
  //   permission: "E"
  // },
  // order_isPOBSubmitted: {
  //   url: "/order/isPOBSubmitted",
  //   permission: "V"
  // },
  viewProfile_getData: {
    url: "/viewProfile/getData",
    permission: "O",
  },
  // transferRoutesToEmployee_getData: {
  //   url: "/transferRoutesToEmployee/getData",
  //   permission: "V"
  // },
  // transferRoutesToEmployee_updateData: {
  //   url: "/transferRoutesToEmployee/updateData",
  //   permission: "E"
  // },
  // mergeRoute_insertData: { url: "/mergeRoute/insertData", permission: "I" },
  dashboardPobProductiveMonthlyCall_getData: {
    url: "/dashboardPobProductiveMonthlyCall/getData",
    permission: "V",
  },
  dashboardChemistBirthday_getData: {
    url: "/dashboardChemistBirthday/getData",
    permission: "V",
  },
  dashboardCountData_getData: {
    url: "/dashboardCountData/getData",
    permission: "V",
  },
  dashboardCountData_getDataStateWiseCount: {
    url: "/dashboardCountData/getDataStateWiseCount",
    permission: "V",
  },
  dashboardCountData_getDataStateWiseData: {
    url: "/dashboardCountData/getDataStateWiseData",
    permission: "V",
  },
  // tpVsAutoVsDCRExpenseReport_getData: {
  //   url: "/tpVsAutoVsDCRExpenseReport/getData",
  //   permission: "V"
  // },
  chemistVisitsReport_getData: {
    url: "/chemistVisitsReport/getData",
    permission: "V",
  },
  // tpVsAutoVsDCRExpenseReport_getMasterData: {
  //   url: "/tpVsAutoVsDCRExpenseReport/getMasterData",
  //   permission: "V"
  // },
  chemistVisitsReport_getData: {
    url: "/chemistVisitsReport/getData",
    permission: "V",
  },
  // leaveReport_getData: {
  //   url: "/leaveReport/getData",
  //   permission: "V"
  // },
  // gpsLocationHistoryReport_getData: {
  //   url: "/gpsLocationHistoryReport/getData",
  //   permission: "V"
  // },
  // locationDetailsByEmployeeId_getData: {
  //   url: "/gpsLocationHistoryReport/getDataById",
  //   permission: "L"
  // },
  isLeaveApprovalPending_getData: {
    url: "/isLeaveApprovalPending/getData",
    permission: "O",
  },
  // cululativeProductiveCallReport_getData: {
  //   url: "/cululativeProductiveCallReport/getData",
  //   permission: "V"
  // },
  // comments_getData: {
  //   url: "/comments/getData",
  //   permission: "V"
  // },
  // comments_insertData: {
  //   url: "/comments/insertData",
  //   permission: "A"
  // },
  // manageDCR: {
  //   url: "/manageDCR",
  //   permission: "A"
  // },
  // managerVsTeamReport_getData: {
  //   url: "/managerVsTeamReport/getData",
  //   permission: "V"
  // },
  // tpVsActualRouteReport_getData: {
  //   url: "/tpVsActualRouteReport/getData",
  //   permission: "V"
  // },
  getLocationByLatLon: {
    url: "/getLocationByLatLon",
    permission: "V",
  },
  version_getData: {
    url: "/version/getData",
    permission: "L",
  },
  notificationList_getData: {
    url: "/notificationList/getData",
    permission: "L",
  },
  notificationList_getCount: {
    url: "/notificationList/getCount",
    permission: "L",
  },

  empRoute_getRouteData: {
    url: "/empRoute/getRouteData",
    permission: "V",
  },
  empRoute_downloadRouteData: {
    url: "/empRoute/downloadRouteData",
    permission: "V",
  },
  rewardMaster_getQtySchemeReward: {
    url: "/rewardMaster/getQtySchemeReward",
    permission: "V",
  },
  rewardMaster_getDataBySchemeId: {
    url: "/rewardMaster/getDataBySchemeId",
    permission: "V",
  },
  rewardMaster_insertData: {
    url: "/rewardMaster/insertData",
    permission: "I",
  },
  rewardMaster_updateData: {
    url: "/rewardMaster/updateData",
    permission: "E",
  },
  rewardMaster_getCalculatePointFlag: {
    url: "/rewardMaster/getCalculatePointFlag",
    permission: "V",
  },
  invoiceMaster_getData: { url: "/invoiceMaster/getData", permission: "V" },
  invoiceMaster_getDetailData: {
    url: "/invoiceMaster/getDetailData",
    permission: "V",
  },
  invoiceMaster_getDataForMobile: {
    url: "/invoiceMaster/getDataForMobile",
    permission: "V",
  },
  invoiceMaster_insertData: {
    url: "/invoiceMaster/insertData",
    permission: "I",
  },
  invoiceMaster_updateData: {
    url: "/invoiceMaster/updateData",
    permission: "E",
  },
  invoiceMaster_updateStatusData: {
    url: "/invoiceMaster/updateStatusData",
    permission: "E",
  },
  invoiceMaster_updateReturnData: {
    url: "/invoiceMaster/updateReturnData",
    permission: "E",
  },
  invoiceMaster_updateReturnStatusData: {
    url: "/invoiceMaster/updateReturnStatusData",
    permission: "E",
  },
  invoiceMaster_getInvoiceChemistByEmployee: {
    url: "/invoiceMaster/getInvoiceChemistByEmployee",
    permission: "V",
  },
  // order_getDataByOrderId: { url: "/order/getDataByOrderId", permission: "L" },
  // order_getDataByDate: { url: "/order/getDataByDate", permission: "V" },
  // customerOrder_getDataByDate: { url: "/customerOrder/getDataByDate", permission: "V" },
  // customerOrder_getDataByOrderId: { url: "/customerOrder/getDataByOrderId", permission: "V" },
  // customerOrder_updateStockistData: { url: "/customerOrder/updateStockistData", permission: "E"  },

  // attendanceReport_getData: {
  //   url: "/attendanceReport/getData",
  //   permission: "V"
  // },
  getSuperStockistData_lookUpData: {
    url: "/getSuperStockistData/lookUpData",
    permission: "O", //o: Open API
  },
  invoiceMaster_checkDuplicate: {
    url: "/invoiceMaster/checkDuplicate",
    permission: "E",
  },
  invoiceMaster_getMasterData: {
    url: "/invoiceMaster/getMasterData",
    permission: "V",
  },
  // order_getDataByStateCityStatus: {
  //   url: "/order/getDataByStateCityStatus",
  //   permission: "E"
  // },
  getChemistByEmployeeId_lookUpData: {
    url: "/getChemistByEmployeeId/lookUpData",
    permission: "O", //o: Open API
  },
  downloadFile: { url: "/downloadFile", permission: "L" },
  // targetMaster_insertData: {
  //   url: "/targetMaster/insertData",
  //   permission: "I"
  // },
  // targetMaster_getData: {
  //   url: "/targetMaster/getData",
  //   permission: "L"
  // },
  // targetMaster_getEmployeeData: {
  //   url: "/targetMaster/getEmployeeData",
  //   permission: "V"
  // },
  videoMaster_getVideoList: {
    url: "/videoMaster/getVideoList",
    permission: "O",
  },
  videoMaster_updateVideoStartTime: {
    url: "/videoMaster/updateVideoStartTime",
    permission: "O",
  },
  videoMaster_likeVideo: {
    url: "/videoMaster/likeVideo",
    permission: "O",
  },
  videoMaster_getCommentData: {
    url: "/videoMaster/getCommentData",
    permission: "O",
  },
  videoMaster_saveComment: {
    url: "/videoMaster/saveComment",
    permission: "O",
  },
  videoSeriesMaster_getSeriesData: {
    url: "/videoSeriesMaster/getSeriesData",
    permission: "V",
  },
  videoSeriesMaster_saveSeriesData: {
    url: "/videoSeriesMaster/saveSeriesData",
    permission: "A",
  },
  videoMaster_getVideos: {
    url: "/videoMaster/getVideos",
    permission: "V",
  },
  videoMaster_saveVideo: {
    url: "/videoMaster/saveVideo",
    permission: "A",
  },
  videoMaster_getSeriesData: {
    url: "/videoMaster/getSeriesData",
    permission: "V",
  },
  documentType_getData: {
    url: "/documentType/getData",
    permission: "V",
  },
  documentType_saveData: {
    url: "/documentType/saveData",
    permission: "A",
  },
  documentType_updateData: {
    url: "/documentType/updateData",
    permission: "E",
  },
  documentType_getDocumentData: {
    url: "/documentType/getDocumentData",
    permission: "V",
  },
  workFlow_lookUpData: {
    url: "/workFlow/lookUpData",
    permission: "O",
  },
  chemistProfileUpdate_insertData: {
    url: "/chemistProfileUpdate/insertData",
    permission: "A",
  },
  // chemistProfileUpdate_updateData:{
  //   url: "/chemistProfileUpdate/updateData",
  //   permission: "E"
  // },
  // chemistProfileUpdate_getData:{
  //   url: "/chemistProfileUpdate/getData",
  //   permission: "V"
  // },
  // chemistProfileUpdate_getListData:{
  //   url: "/chemistProfileUpdate/getListData",
  //   permission: "V"
  // },
  // monthlyExpenseSummary_getData:{
  //   url: "/monthlyExpenseSummary/getData",
  //   permission: "V"
  // },
  paytm_walletTransferRequest: {
    url: "/paytm/walletTransferRequest",
    permission: "O",
  },
  // videoSeriesMaster_getVideoSummary: {
  //   url: "/videoSummary/getVideoSummary",
  //   permission: "V"
  // },
  // videoSeriesMaster_getVideoCommentSummary: {
  //   url: "/videoSummary/getVideoCommentSummary",
  //   permission: "V"
  // },
  tandc_getData: {
    url: "/tandc/getData",
    permission: "O",
  },
  tandc_saveData: {
    url: "/tandc/saveData",
    permission: "A",
  },
  // feature_getData: {
  //   url: "/feature/getData",
  //   permission: "V"
  // },
  // feature_saveData: {
  //   url: "/feature/saveData",
  //   permission: "A"
  // },
  // FeatureRightsForLoggedInUser_getData: {
  //   url: "/feature/GetFeaturesRights",
  //   permission: "V"
  // },
  // selfie_getData: {
  //   url: "/selfie/getData",
  //   permission: "V"
  // },
  // selfie_saveData: {
  //   url: "/selfie/saveData",
  //   permission: "A"
  // },
  surveyMaster_getSurveyList: {
    url: "/surveyMaster/getSurveyList",
    permission: "L",
  },
  surveyMaster_saveSurveyData: {
    url: "/surveyMaster/saveSurveyData",
    permission: "A",
  },
  surveyMaster_getSurveyQuestionList: {
    url: "/surveyMaster/getSurveyQuestionList",
    permission: "L",
  },
  surveyMaster_getAnswerGroupList: {
    url: "/surveyMaster/getAnswerGroupList",
    permission: "V",
  },
  surveyMaster_saveSurveyQuestion: {
    url: "/surveyMaster/saveSurveyQuestion",
    permission: "A",
  },
  surveyMaster_deleteSurveyQuestion: {
    url: "/surveyMaster/deleteSurveyQuestion",
    permission: "D",
  },
  surveyMaster_saveSurveyCopy: {
    url: "/surveyMaster/saveSurveyCopy",
    permission: "A",
  },
  // surveyAnswer_getMobileSurveyQuestion:{
  //   url:"/surveyAnswer/getMobileSurveyQuestion",
  //   permission: "V"
  // },
  // surveyAnswer_saveSurveyAnswers:{
  //   url:"/surveyAnswer/saveSurveyAnswers",
  //   permission: "I"
  // },
  // answerOption_getData:{
  //   url:"/answerOption/getData",
  //   permission: "V"
  // },
  // answerOption_saveData:{
  //   url:"/answerOption/saveData",
  //   permission: "A"
  // },
  aws_getFileUploadURL: {
    url: "/aws/getFileUploadURL",
    permission: "O",
  },
  aws_deleteFileFromAWS: {
    url: "/aws/deleteFileFromAWS",
    permission: "O",
  },
  // surveyReport_getSurveyList: {
  //   url: "/surveyReport/getSurveyData",
  //   permission: "V"
  // },
  // surveyReport_getChemistList: {
  //   url: "/surveyReport/getChemistData",
  //   permission: "V"
  // },
  // surveyReport_getActiveSurveyList: {
  //   url: "/surveyReport/getActiveSurveyList",
  //   permission: "V"
  // },
  // pointsConfig_getPointsConfig:{
  //   url: "/pointConfig/getData",
  //   permission: "V"
  // },
  // pointsConfig_updatePointsConfig: {
  //   url: "/pointConfig/updatePointsConfigData",
  //   permission: "A"
  // },
  birthDay_getData: {
    url: "/birthDay/getData",
    permission: "O",
  },
  menuRole_getMenuList: {
    url: "/menuRole/getData",
    permission: "V",
  },
  menuRole_refreshMenuItem: {
    url: "/menuRole/refreshMenuItem",
    permission: "V",
  },
  menuRole_saveMenuRoleData: {
    url: "/menuRole/saveMenuRoleData",
    permission: "V",
  },
  // myorder_getData: {
  //   url: "/myOrder/getData",
  //   permission: "V"
  // },
  // myorder_getItemData: {
  //   url: "/myOrder/getItemData",
  //   permission: "V"
  // },
  // myorder_saveMyOrder: {
  //   url: "/myOrder/saveMyOrder",
  //   permission: "A"
  // },
  secondaryPoint_getDefaultSecondary: {
    url: "/secondaryPoint/getDefaultSecondary",
    permission: "V",
  },
  secondaryPoint_updateDefaultSecondary: {
    url: "/secondaryPoint/updateDefaultSecondary",
    permission: "A",
  },
  secondaryPoint_updateAllDefaultSecondary: {
    url: "/secondaryPoint/updateAllDefaultSecondary",
    permission: "A",
  },
  // gpsLocationHistoryReport_getSMSCode: {
  //   url: "/gpsLocationHistoryReport/getSMSCode",
  //   permission: "V"
  // },
  // gpsLocationHistoryReport_getSMSMessage: {
  //   url: "/gpsLocationHistoryReport/getSMSMessage",
  //   permission: "V"
  // },
  // claimReward_getData: {
  //   url: "/claimReward/getData",
  //   permission: "V",
  // },
  chemistMaster_saveChemistSorting: {
    url: "/chemistMaster/saveChemistSorting",
    permission: "A",
  },
  // itemWiseSales_getData: {
  //   url: "/itemWiseSales/getData",
  //   permission: "V",
  // },
  // topCustomer_getData: {
  //   url: "/topCustomer/getData",
  //   permission: "V",
  // },
  // primaryPurchase_getData: {
  //   url: "/primaryPurchase/getData",
  //   permission: "V"
  // },
  // primaryPurchase_uploadData: {
  //   url: "/primaryPurchase/uploadData",
  //   permission: "I"
  // },
  // primaryPurchase_saveData: {
  //   url: "/primaryPurchase/saveData",
  //   permission: "I"
  // },
  // gpsSmsTrack_getData: {
  //   url: "/gpsSmsTrack/getData",
  //   permission: "V",
  // },
  // primaryVsSecondary_getData: {
  //   url: "/primaryVsSecondary/getData",
  //   permission: "V",
  // },
  smartSetuApp_getData: {
    url: "/smartSetuApp/getData",
    permission: "V",
  },
  // primaryVsClaim_getData: {
  //   url: "/primaryVsClaim/getData",
  //   permission: "V",
  // },

  // employeeRefMapping_getData: {
  //   url: "/employeeRefMapping/getData",
  //   permission: "V",
  // },
  // qrMaster_getData: { url: "/qrMaster/getData", permission: "V" },
  // qrMaster_insertData: { url: "/qrMaster/insertData", permission: "I" },
  // qrMaster_updateData: { url: "/qrMaster/updateData", permission: "E" },
  // qrMaster_deleteData: { url: "/qrMaster/deleteData", permission: "D" },
  // qrMaster_generateQRCodeData: { url: "/qrMaster/generateQRCodeData", permission: "E" },
  // qrMaster_printDownloadQRData: { url: "/qrMaster/printDownloadQRData", permission: "E" },
  // qrMaster_getQRPrintHistory: { url: "/qrMaster/getQRPrintHistory", permission: "E" },

  // customer_submitCustomerDetails: { url: "/customer/submitCustomerDetails", permission: "I" },
  // customer_getCustomerList: { url: "/customer/getCustomerList", permission: "V" },
  // customer_editCustomerDetails: { url: "/customer/editCustomerDetails", permission: "E" },
  // customer_deleteCustomerDetails: { url: "/customer/deleteCustomerDetails", permission: "D" },
  // customer_getPrescriptionList: { url: "/customer/getPrescriptionList", permission: "V" },
  // customer_removeReminder: { url: "/customer/removeReminder", permission: "D" },
  // customer_updateReminder: { url: "/customer/updateReminder", permission: "E" },
  // customer_setCustomerReminderTime: { url: "/customer/setCustomerReminderTime", permission: "E" },

  // customer_submitPrescriptionDetails: { url: "/customer/submitPrescriptionDetails", permission: "I" },
  // customer_editPrescriptionDetails: { url: "/customer/editPrescriptionDetails", permission: "E" },
  // customer_deletePrescriptionDetails: { url: "/customer/deletePrescriptionDetails", permission: "D" },

  // customer_notificationDetails: { url: "/customer/notificationDetails", permission: "V" },
  // closingStock_getData: {
  //   url: "/closingStock/getData",
  //   permission: "O"
  // },
  getDepotData_lookUpData: {
    url: "/getDepotData/lookUpData",
    permission: "O", //o: Open API
  },

  getFTPDivisionData_lookUpData: {
    url: "/getFTPDivisionData/lookUpData",
    permission: "O", //o: Open API
  },
  // sales_getData: {
  //   url: "/sales/getData",
  //   permission: "V"
  // },
  // sales_getMobileData: {
  //   url: "/sales/getMobileData",
  //   permission: "O"
  // },
  // sales_getFinancialYearData: {
  //   url: "/sales/getFinancialYearData",
  //   permission: "O"
  // },
  invoiceMaster_getInvoiceItemData: {
    url: "/invoiceMaster/getInvoiceItemData",
    permission: "V",
  },
  // outstanding_getData: {
  //   url: "/outstanding/getData",
  //   permission: "V"
  // },
  // outstanding_getMobileData: {
  //   url: "/outstanding/getMobileData",
  //   permission: "O"
  // },
  connectFTP_getData: {
    url: "/connectFTP/getData",
    permission: "O",
  },
  dayRemarksReport_getData: {
    url: "/dayRemarksReport/getData",
    permission: "O",
  },
  guestMaster_getData: { url: "/guestMaster/getData", permission: "V" },
  guestMaster_insertData: {
    url: "/guestMaster/insertData",
    permission: "I",
  },
  guestMaster_updateData: {
    url: "/guestMaster/updateData",
    permission: "E",
  },
  roomCategory_getRoomCategory: {
    url: "/roomCategory/getRoomCategory",
    permission: "O",
  },
  roomCategory_insertRoomCategory: {
    url: "/roomCategory/insertRoomCategory",
    permission: "I",
  },
  roomMaster_getRoomMaster: {
    url: "/roomMaster/getRoomMaster",
    permission: "V",
  },
  roomMaster_saveRoomMaster: {
    url: "/roomMaster/saveRoomMaster",
    permission: "I",
  },
  roomMaster_getRoomCategories: {
    url: "/roomMaster/getRoomCategories",
    permission: "O",
  },
  roomMaster_getKeyList: {
    url: "/roomMaster/getKeyList",
    permission: "O",
  },
  keyMaster_getKeyMaster: {
    url: "/keyMaster/getKeyMaster",
    permission: "V",
  },
  keyMaster_saveKeyMaster: {
    url: "/keyMaster/saveKeyMaster",
    permission: "I",
  },
  amenityMaster_getAmenityMaster: {
    url: "/amenityMaster/getAmenityMaster",
    permission: "V",
  },
  amenityMaster_saveAmenityMaster: {
    url: "/amenityMaster/saveAmenityMaster",
    permission: "I",
  },
  manageBooking_getManageBooking: {
    url: "/manageBooking/getManageBooking",
    permission: "V",
  },
  manageBooking_getLatestGuest: {
    url: "/manageBooking/getLatestGuest",
    permission: "V",
  },
  manageBooking_getRoomList: {
    url: "/manageBooking/getRoomList",
    permission: "V",
  },
  manageBooking_getRoomStatus: {
    url: "/manageBooking/getRoomStatus",
    permission: "V",
  },
  manageBooking_saveManageBooking: {
    url: "/manageBooking/saveManageBooking",
    permission: "I",
  },
  manageBooking_updateManageBooking: {
    url: "/manageBooking/updateManageBooking",
    permission: "E",
  },
  manageBooking_deleteManageBooking:{
    url: "/manageBooking/deleteBooking",
    permission: "D",
  },
  manageBooking_getDefaultRoomCategory: {
    url: "/manageBooking/getDefaultRoomCategory",
    permission: "V",
  },
  manageBooking_getDefaultRoomStatus: {
    url: "/manageBooking/getDefaultRoomStatus",
    permission: "V",
  },
  manageBooking_getStatusFilter: {
    url: "/manageBooking/getStatusFilter",
    permission: "O",
  },
  manageBooking_getbookingData: {
    url: "/manageBooking/getbookingData",
    permission: "V",
  },
  manageBooking_getGuestBookingDetails: {
    url: "/manageBooking/getGuestBookingDetails",
    permission: "V",
  },
  manageBooking_getRoomAssignDetails: {
    url: "/manageBooking/getRoomAssignDetails",
    permission: "V",
  },
  manageBooking_checkedOutPerticularRoom:{
    url: "/manageBooking/checkedOutPerticularRoom",
    permission: "E",
  },
  treatmentMaster_getTreatmentMaster: {
    url: "/treatmentMaster/getTreatmentMaster",
    permission: "L",
  },
  treatmentMaster_insertData: {
    url: "/treatmentMaster/insertData",
    permission: "I",
  },
  treatmentMaster_updateData: {
    url: "/treatmentMaster/updateData",
    permission: "E",
  },
  treatmentMaster_deleteData: {
    url: "/treatmentMaster/deleteData",
    permission: "D",
  },
  diseaseMaster_getDiseaseMasterFortreatment: {
    url: "/treatmentMaster/getDiseaseMasterfortreatment",
    permission: "V",
  },

  dietMaster_getDietMaster: {
    url: "/dietMaster/getDietMaster",
    permission: "V",
  },
  dietMaster_saveDietMaster: {
    url: "/dietMaster/saveDietMaster",
    permission: "I",
  },
  dietMaster_updateDietMaster: {
    url: "/dietMaster/updateDietMaster",
    permission: "E",
  },
  dietMaster_getDietCategories: {
    url: "/dietMaster/getDietCategories",
    permission: "O",
  },
  dietMaster_getDeleteMaster: {
    url: "/dietMaster/getDelete",
    permission: "D",
  },
  diseaseMaster_getDiseaseMaster: {
    url: "/diseaseMaster/getDiseaseMaster",
    permission: "V",
  },
  diseaseMaster_saveDiseaseMaster: {
    url: "/diseaseMaster/saveDiseaseMaster",
    permission: "I",
  },
  diseaseMaster_deleteDiseaseMaster: {
    url: "/diseaseMaster/deleteDiseaseMaster",
    permission: "D",
  },

  treatment_getdietname: {
    url: "/treatementtempletemaster/getdietname",
    permission: "O",
  },
  treatment_getTreatment: {
    url: "/treatementtempletemaster/getTreatment",
    permission: "O",
  },
  treatment_gettempletediseaselist: {
    url: "/treatementtempletemaster/gettempletediseaselist",
    permission: "O",
  },

  treatment_inserttreatmentdata: {
    url: "/treatementtempletemaster/inserttreatmentdata",
    permission: "I",
  },

  treatment_deletetemplete: {
    url: "/treatementtempletemaster/deletetemplete",
    permission: "D",
  },

  treatment_getdiseaselist: {
    url: "/treatementtempletemaster/getdiseaselist",
    permission: "O",
  },

  treatment_updatetemplete: {
    url: "/treatementtempletemaster/updatetemplete",
    permission: "E",
  },
  treatment_getTreatmentdetail: {
    url: "/treatementtempletemaster/getTreatmentdetail",
    permission: "O",
  },
  treatment_getComments: {
    url: "/treatment/getComments",
    permission: "V",
  },
  treatment_getData: {
    url: "/treatment/getDisease",
    permission: "V",
  },
  treatment_insertData: {
    url: "/treatment/insertDisease",
    permission: "I",
  },
  treatment_updateData: {
    url: "/treatment/updateDiseaseData",
    permission: "U",
  },
  approvalLeave_getData: {
    url: "/leaveApproval/getApprovalLeave",
    permission: "V",
  },
  approvalLeave_updateData: {
    url: "/leaveApproval/updateApprovalLeave",
    permission: "V",
  },
  treatmentRoomMaster_getData: {
    url: "/treatmentRoomMaster/getData",
    permission: "V",
  },
  treatmentRoomMaster_insertData: {
    url: "/treatmentRoomMaster/saveData",
    permission: "I",
  },
  treatmentRoomMaster_updateData: {
    url: "/treatmentRoomMaster/updateData",
    permission: "E",
  },
  treatmentRoomMaster_deleteData: {
    url: "/treatmentRoomMaster/deleteData",
    permission: "D",
  },
  treatmentRoomMaster_getTherapistForTreatmentRoom: {
    url: "/treatmentRoomMaster/getTherapistForTreatmentRoom",
    permission: "V",
  },
  dailyTherapy_getData: {
    url: "/dailyTherapyMaster/getData",
    permission: "V",
  },
  dailyTherapy_updateData: {
    url: "/dailyTherapyMaster/updateData",
    permission: "E",
  },
  dailyTherapyTypeName_getData: {
    url: "/dailyTherapyMaster/getTypeName",
    permission: "V",
  },
  dailyTherapyTypeSlot_getData: {
    url: "/dailyTherapyMaster/getSlot",
    permission: "V",
  },
  therapyType_getData: {
    url: "/therapyTypeMaster/getTherapyType",
    permission: "V",
  },
  therapyType_saveData: {
    url: "/therapyTypeMaster/saveTherapyType",
    permission: "I",
  },
  therapyType_deleteData: {
    url: "/therapyTypeMaster/deleteTherapyType",
    permission: "D",
  },
  therapySlot_getData: {
    url: "/therapySlotMaster/getTherapySlot",
    permission: "V",
  },
  therapySlot_saveData: {
    url: "/therapySlotMaster/saveTherapySlot",
    permission: "I",
  },
  therapySlot_deleteData: {
    url: "/therapySlotMaster/deleteTherapySlot",
    permission: "D",
  },
  RoomRateMaster_updateroomRate: {
    url: "/RoomRateMaster/updateroomRate",
    permission: "O",
  },

  memberShipRoom_getData: {
    url: "/memberShipMaster/getMemberShip",
    permission: "V",
  },
  memberShipDays_getData: {
    url: "/memberShipMaster/getDaysMemberShip",
    permission: "V",
  },
  memberShip_insertData:{
    url: "/memberShipMaster/insertData",
    permission: "I"
  },
  memberShip_updateData:{
    url: "/memberShipMaster/updateData",
    permission: "I"
  },
  memberShip_getEffectiveDate:{
    url: "/memberShipMaster/getEffectiveDate",
    permission: "V"
  },
  memberShipDays_deleteData:{
    url: "/memberShipMaster/deleteData",
    permission: "D"
  },
  memberShipOccupancy_getData: {
    url: "/memberShipMaster/getOccupancy",
    permission: "O",
  },
  RoomRateMaster_getTime: {
    url: "/RoomRateMaster/getTime",
    permission: "O",
  },
  RoomRateMaster_datefilter: {
    url: "/RoomRateMaster/datefilter",
    permission: "O",
  },
  RoomRateMaster_listallcategoryname: {
    url: "/RoomRateMaster/listallcategoryname",
    permission: "O",
  },
  RoomRateMaster_listdays: {
    url: "/RoomRateMaster/listdays",
    permission: "O",
  },
  therapyType_typeData: {
    url: "/therapySlotMaster/getTherapy",
    permission: "D",
  },
  treatment_getDayWiseDate: {
    url: "/treatment/getDayWiseDate",
    permission: "V",
  },
  treatment_getMorningTherapy: {
    url: "/treatment/getMorningTherapy",
    permission: "V",
  },
  treatment_getDefaultTherapy: {
    url: "/treatment/getDefaultTherapy",
    permission: "V",
  },
  treatment_getAdditionalTherapy: {
    url: "/treatment/getAdditionalTherapy",
    permission: "V",
  },
  treatment_getDietPlanName: {
    url: "/treatment/getDietPlanName",
    permission: "V",
  },
  treatment_getExistingRecord: {
    url: "/treatment/getExistingRecord",
    permission: "V",
  },
  treatment_saveTreatmentSectionDetails: {
    url: "/treatment/saveTreatmentSectionDetails",
    permission: "I",
  },
  treatment_getMealTypeName: {
    url: "/treatment/getMealTypeName",
    permission: "V",
  },
  dietMaster_viewMealData: {
    url: "/dietMaster/viewMealData",
    permission: "V",
  },
  mealTemplate_getEffectiveDateFilter: {
    url: "/mealTemplate/getEffectiveDateFilter",
    permission: "V",
  },
  mealTemplate_getMealTemplateList: {
    url: "/mealTemplate/getMealTemplateList",
    permission: "V",
  },
  mealTemplate_getExistingMealData: {
    url: "/mealTemplate/getExistingMealData",
    permission: "V",
  },
  mealTemplate_saveMealTemplateData: {
    url: "/mealTemplate/saveMealTemplateData",
    permission: "I",
  },
  mealTemplate_updateMealTemplateData: {
    url: "/mealTemplate/updateMealTemplateData",
    permission: "E",
  },
  mealTemplate_deleteMealTemplateData: {
    url: "/mealTemplate/deleteMealTemplateData",
    permission: "D",
  },
  mealTemplate_getMealEditDay: {
    url: "/mealTemplate/getMealEditDay",
    permission: "V",
  },
  RoomRateMaster_listdays: {
    url: "/RoomRateMaster/listdays",
    permission: "O",
  },
  RoomRateMaster_deleteroomRate: {
    url: "/RoomRateMaster/deleteroomRate",
    permission: "O",
  },

  RoomRateMaster_listdays: {
    url: "/RoomRateMaster/listdays",
    permission: "O",
  },
  RoomRateMaster_saveroomRate: {
    url: "/RoomRateMaster/saveroomRate",
    permission: "O",
  },
 RoomRateMaster_listdays: {
    url: "/RoomRateMaster/listdays",
    permission: "O",
  },
  Kyc_Upload: {
    url: "/Kyc/Upload",
    permission: "O"
  },
  guestUploadFile_getUploadFileData: {
    url: "/guestUploadFile/getUploadFileData",
    permission: "O",
  },
  guestUploadFile_downloadFile: {
    url: "/guestUploadFile/downloadFile",
    permission: "O",
  },  mealTemplate_getExistingDataOnEffeDateWise: {
    url: "/mealTemplate/getExistingDataOnEffeDateWise",
    permission: "V",
  },
  dateWiseMealTemplate_getDateWiseMealTemplateExistingData: {
    url: "/dateWiseMealTemplate/getDateWiseMealTemplateExistingData",
    permission: "V",
  },

  dateWiseMealTemplate_getEffectiveDate: {
    url: "/dateWiseMealTemplate/getEffectiveDate",
    permission: "V",
  },
  dateWiseMealTemplate_getDateWiseMealTemplateList: {
    url: "/dateWiseMealTemplate/getDateWiseMealTemplateList",
    permission: "V",
  },
  dateWiseMealTemplate_getExistingDateWiseMealTemplateList: {
    url: "/dateWiseMealTemplate/getExistingDateWiseMealTemplateList",
    permission: "V",
  },
  dateWiseMealTemplate_saveDateWiseMealTemplateData: {
    url: "/dateWiseMealTemplate/saveDateWiseMealTemplateData",
    permission: "I",
  },
  dateWiseMealTemplate_updateDateWiseMealTemplateData: {
    url: "/dateWiseMealTemplate/updateDateWiseMealTemplateData",
    permission: "E",
  },
  dateWiseMealTemplate_deleteDateWiseMealTemplateData: {
    url: "/dateWiseMealTemplate/deleteDateWiseMealTemplateData",
    permission: "D",
  },
  
};
