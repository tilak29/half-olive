const express = require("express");
const router = express.Router();

const { listManageBooking,
        deleteManageBooking, 
        bookingRoomAssignDetails, 
        getManageBooking, 
        guestBookingDetails, 
        saveManageBooking, 
        getLatestGuest, 
        getRoomList, 
        getRoomStatus, 
        getDefaultRoomCategory, 
        getDefaultRoomStatus, 
        updateManageBooking,
        checkedOutPerticularRoom  
      } = require("./manageBookingRepository");
const { sendResponse , payLoadValidation } = require("../../../utils");
const { Message } = require("../../../Messages");
const {

  manageBooking_getManageBooking: { url: getManageBookingApi },
  manageBooking_saveManageBooking: { url: saveManageBookingApi },
  manageBooking_getLatestGuest: { url: getLatestGuestApi },
  manageBooking_getRoomList: { url: getRoomListApi},
  manageBooking_getRoomStatus: { url: getRoomStatusApi},
  manageBooking_getDefaultRoomCategory: { url: getDefaultRoomCategoryApi},
  manageBooking_getDefaultRoomStatus: { url: getDefaultRoomStatusApi},
  manageBooking_getbookingData: { url : getbookingDataApi},
  manageBooking_getGuestBookingDetails: { url : getGuestBookingDetailsApi},
  manageBooking_getRoomAssignDetails: { url : getRoomAssignDetailsApi},
  manageBooking_updateManageBooking: { url : editManageBookingApi},
  manageBooking_deleteManageBooking: { url :deleteManageBookingApi},
  manageBooking_checkedOutPerticularRoom: { url : checkedOutPerticularRoomApi}
} = require("../../../routerConstant");
const { addManageBooking, UpdateManageBooking, DeleteManageBooking } = require("../../../dataType.json");
const { handleError } = require("../../../error.js");
const { json } = require("express");
const { 
  BookingStatus:{Booked,Checked_In,Checked_Out},
  RoomStatus
} = require("../../../config.json");
/**
  * AUTOCODEUTILITY - Add comment here
  */
 router.post(
  checkedOutPerticularRoomApi,
  async function (req, res, next) {
    try {
      var result = {};
      const bodyData = {
        ...req.body,
      };
      const response = await checkedOutPerticularRoom({
        data: bodyData,
        roomStatus: RoomStatus.Dirty
      })

        if (response && response.isSuccess) {
            result = { message: Message({ code: "CHECKED_OUT" }), isSuccess: true };
        } else {
          result = {
            message: Message({ code: "INVALPAYLOAD" }),
            isSuccess: true,
          };
        }

      req.result = { isValidate:true , validationList:[], ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

router.post(
  getRoomAssignDetailsApi,
  async function (req, res, next) {
    try {
      let result = {};
      const { bookingId } = req.body;
      const response = await bookingRoomAssignDetails({bookingId});
      const { isSuccess } = response;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            roomAssignDetails: [...response.recordset],
          },
          isSuccess,
        };
      } else {
        result = {
          message: Message({}),
          isSuccess: false,
        };
      }
      req.result = { isValidate: true, validationList: [], ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

router.post(
  getGuestBookingDetailsApi,
  async function (req, res, next) {
    try {
      let result = {};
      const { bookingId } = req.body;
      const response = await guestBookingDetails({bookingId});
      const { isSuccess } = response;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            guestbookingdetails: [...response.recordset],
          },
          isSuccess,
        };
      } else {
        result = {
          message: Message({}),
          isSuccess: false,
        };
      }
      req.result = { isValidate: true, validationList: [], ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

router.post(
  getbookingDataApi,
  async function (req, res, next) {
    try {
      let result = {};
      const { filterStatus, bookingStatus, bookingId } = req.body;
      
      let condition = "";
      if(filterStatus == 1 && filterStatus != undefined)
      {
        condition = `and BD.StartDate = (select CONVERT(date, getdate())) or BD.EndDate = (select CONVERT(date, getdate()))`;
      }
      else if(filterStatus != 1 && filterStatus != undefined)
      {
        condition = `and BD.BookingStatus = ${filterStatus}`
      }
      else if(bookingId != undefined && bookingStatus!="null" && bookingStatus!="show all booking")
      {
        condition = `and BD.BookingStatus = ${bookingStatus} and BD.BookingId = ${bookingId}`
      }
      else if(bookingId != undefined && bookingStatus=="null" && bookingStatus!="show all booking")
      {
        condition = `and BD.GuestId = (select GuestId from bookingDetails where BookingId=${bookingId}) and BD.BookingStatus!=129`;
      }
      else if(bookingId != undefined && bookingStatus=="show all booking")
      {
        condition = `and BD.GuestId=(select GuestId from bookingDetails where BookingId =${bookingId}) and BookingId != ${bookingId}`;
      }
      const response = await listManageBooking( condition );
      const { isSuccess } = response;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            bookingList: [...response.recordset],
          },
          isSuccess,
        };
      } else {
        result = {
          message: Message({}),
          isSuccess: false,
        };
      }
      req.result = { isValidate: true, validationList: [], ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

router.post(
  getDefaultRoomStatusApi,
  async function(req, res, next){
    try {
      let result = {};
      const {} = req.body;
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        // payLoad: manageBooking
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {

        const response = await await getDefaultRoomStatus( );
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              DefaultRoomStatus: [...response.recordset]
            },
            isSuccess
          };
        } else {
          result = {
            message: Message({}),
            isSuccess: false
          };
        }
      } else {
        result = {
          message: Message({ code: "INVALPAYLOAD" }),
          isSuccess: true,
          ...result
        };
      }
      req.result = { isValidate, validationList, ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);


router.post(
  getDefaultRoomCategoryApi,
  async function(req, res, next){
    try {
      let result = {};
      const {} = req.body;
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        // payLoad: manageBooking
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {

        const response = await await getDefaultRoomCategory( );
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              DefaultRoomCategory: [...response.recordset]
            },
            isSuccess
          };
        } else {
          result = {
            message: Message({}),
            isSuccess: false
          };
        }
      } else {
        result = {
          message: Message({ code: "INVALPAYLOAD" }),
          isSuccess: true,
          ...result
        };
      }
      req.result = { isValidate, validationList, ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

router.post(
  getRoomStatusApi,
  async function(req, res, next){
    try {
      let result = {};
      const {} = req.body;
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        // payLoad: manageBooking
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {

        const response = await await getRoomStatus( );
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              RoomStatus: [...response.recordset]
            },
            isSuccess
          };
        } else {
          result = {
            message: Message({}),
            isSuccess: false
          };
        }
      } else {
        result = {
          message: Message({ code: "INVALPAYLOAD" }),
          isSuccess: true,
          ...result
        };
      }
      req.result = { isValidate, validationList, ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

router.post(
  getRoomListApi,
  async function(req, res, next){
    try {
      let result = {};
      const bodyData = {...req.body};
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        // payLoad: manageBooking
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {

        const response = await await getRoomList(
          {
            data:JSON.stringify(bodyData)
          }
        );
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              RoomList: [...response.recordset]
            },
            isSuccess
          };
        } else {
          result = {
            message: Message({}),
            isSuccess: false
          };
        }
      } else {
        result = {
          message: Message({ code: "INVALPAYLOAD" }),
          isSuccess: true,
          ...result
        };
      }
      req.result = { isValidate, validationList, ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);


router.post(
  getLatestGuestApi,
  async function(req, res, next){
    try {
      let result = {};
      const {} = req.body;
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        // payLoad: manageBooking
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {

        const response = await await getLatestGuest( );
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              LatestGuest: [...response.recordset]
            },
            isSuccess
          };
        } else {
          result = {
            message: Message({}),
            isSuccess: false
          };
        }
      } else {
        result = {
          message: Message({ code: "INVALPAYLOAD" }),
          isSuccess: true,
          ...result
        };
      }
      req.result = { isValidate, validationList, ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

router.post(
  getManageBookingApi,
    async function (req, res, next) {
    try {
      let result = {};
      const {
        mobileNo,
        referenceCode,
        guestId
      } = req.body;
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        // payLoad: manageBooking
      });
      let condition = "";     
      if (guestId && guestId !== "") {
        condition = ` ${condition} bd.GuestId = ${guestId} `;

        if (mobileNo && mobileNo !== "") {
          condition = ` ${condition} and gd.MobileNumber like '%${mobileNo}%'`;

          if(referenceCode && referenceCode !=="")
          {
            condition = ` ${condition} or bd.BookingReferenceCode like '%${referenceCode}%'`;
          }
        }
      }
      else if (mobileNo && mobileNo !== "")
       {
        condition = ` ${condition} gd.MobileNumber like '%${mobileNo}%'`;
        if(referenceCode && referenceCode !=="")
        {
          condition = ` ${condition} or bd.BookingReferenceCode like '%${referenceCode}%'`;
        }
      }
      else if(referenceCode && referenceCode !=="")
      {
        condition = ` ${condition} bd.BookingReferenceCode like '%${referenceCode}%'`;
      }
      else
      {
        condition = `bd.BookingReferenceCode like '%${referenceCode}%'`;
      }

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {

        const response = await await getManageBooking( condition );
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              manageBookingList: [...response.recordset]
            },
            isSuccess
          };
        } else {
          result = {
            message: Message({}),
            isSuccess: false
          };
        }
      } else {
        result = {
          message: Message({ code: "INVALPAYLOAD" }),
          isSuccess: true,
          ...result
        };
      }
      req.result = { isValidate, validationList, ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);
;/**
      * AUTOCODEUTILITY - Add comment here
      */
//  router.post(
//   saveManageBookingApi,
//    async function (req, res, next) {
//      try {
//        let result = {};
//        // AUTOCODEUTILITY - Add request params here.
//        const {} = req.body;
//         const response = await saveManageBooking();
//        const { isSuccess } = response;
//        delete response.isSuccess;
//        if (isSuccess === true) {
//         // AUTOCODEUTILITY - Add customized code here related on response.
//          result = {
//            message: Message({ code: "Success" }),
//            data: {
//             // AUTOCODEUTILITY - Make response here.
//            },
//            isSuccess
//          };
//        } else {
//          result = {
//            message: Message({}),
//            isSuccess: false
//          };
//        }
//        req.result = { isValidate: true, validationList: [], ...result };
//        next();
//      } catch (e) {
//        handleError(e, res);
//      }
//    },
//    sendResponse
//  );


router.post(
  saveManageBookingApi,
  async function (req, res, next) {
    try {
      var result = {};
      const bodyData = {
        ...req.body,
      };
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: addManageBooking,
      });
      let roomStatus;
      if(bodyData.bookingStatus == Booked || bodyData.bookingStatus == Checked_In)
      {
        roomStatus = RoomStatus.Booked
      }
      else
      {
        roomStatus=RoomStatus.Dirty
      }
      const { isValidate, validationList } = isValidDataType;

      if (isValidate) {
        const response = await saveManageBooking({
          data: JSON.stringify(bodyData),
          roomStatus: roomStatus
        });

        if (response && response.isSuccess) {
            result = { message: Message({ code: "RINS" }), isSuccess: true };
        } else {
          result = {
            message: Message({}),
            isSuccess: false,
          };
        }
      } else {
        result = {
          message: Message({ code: "INVALPAYLOAD" }),
          isSuccess: true,
          ...result,
        };
      }
      req.result = { isValidate, validationList, ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

router.post(
  editManageBookingApi,
  async function (req, res, next) {
    try {
      var result = {};
      const bodyData = {
        ...req.body,
      };
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: UpdateManageBooking,
      });

      const { isValidate, validationList } = isValidDataType;

      if (isValidate) {
        const response = await updateManageBooking({
          data: JSON.stringify(bodyData)
        });

        if (response && response.isSuccess) {
            result = { message: Message({ code: "RUPD" }), isSuccess: true };
        } else {
          result = {
            message: Message({}),
            isSuccess: false,
          };
        }
      } else {
        result = {
          message: Message({ code: "INVALPAYLOAD" }),
          isSuccess: true,
          ...result,
        };
      }
      req.result = { isValidate, validationList, ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);
router.post(
  deleteManageBookingApi,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body,
      };
      const data = {
        bookingId: bodyData.bookingId,
        loggedInUserId: bodyData.loggedInUserId,
      };

      const isValidDataType = await payLoadValidation({
        bodyData: data,
        payLoad: DeleteManageBooking,
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await deleteManageBooking({
          data,
        });

        if (response && response.isSuccess) {
          result = { message: Message({ code: "RDEL" }), isSuccess: true };
        } else {
          result = {
            message: Message({}),
            isSuccess: false,
          };
        }
      } else {
        result = {
          message: Message({ code: "INVALPAYLOAD" }),
          isSuccess: true,
          ...result,
        };
      }
      req.result = { isValidate, validationList, ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);
// router.post(
//   saveManageBookingApi,
//   async function (req, res, next) {
//     try {
//       let result = {};
//       const bodyData = {
//         ...req.body,
//       };
//       console.log(bodyData);
//       const isValidDataType = await payLoadValidation({
//         bodyData: bodyData,
//         payLoad: manageBooking,
//       });
//       const { isValidate, validationList } = isValidDataType;
//       const operationType = bodyData.bookingId ? 1 : 0;
//       if (isValidate) {
//         const response = await saveManageBooking({
//           data: JSON.stringify(bodyData),
//           operationType,
//         });
//         if (response && response.isSuccess ) {
//           if (operationType === 0 ){
//             result = { message: Message({ code: "RINS" }), isSuccess: true };
//           } 
//           if (operationType === 1) {
//             result = { message: Message({ code: "RUPD" }), isSuccess: true };
//           }
//         } else {
//           result = {
//             message: Message({ }),
//             isSuccess: false,
//           };
//         }
//       } else {
//         result = {
//           message: Message({ code: "INVALPAYLOAD" }),
//           isSuccess: true,
//           ...result,
//         };
//       }
//       req.result = { isValidate: true, validationList: [], ...result };
//       next();
//     } catch (e) {
//       handleError(e, res);
//     }
//   },
//   sendResponse
// );

module.exports = router;
