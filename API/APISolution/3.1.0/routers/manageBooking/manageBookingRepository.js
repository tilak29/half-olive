const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../config.json");
const js2xml = require("js2xml").Js2Xml;

const getDefaultRoomCategory = async () => {
  const qry = `select dbo.FNGetConfigurationValueByCode('Default_RoomCategory',GETDATE()) as Default_RoomCategory`;
  return await asyncDML({ qry });
};

const getDefaultRoomStatus = async () => {
  const qry = `select dbo.FNGetConfigurationValueByCode('Default_RoomStatus',GETDATE()) as Default_RoomStatus`;
  return await asyncDML({ qry });
};

const getRoomStatus = async () => {
  const qry = `
  select StaticId,StaticName from staticdata where ParentId=140 and CompanyId=${CompanyId} and IsActive=1 
  and DeletedBy is null order by StaticName asc`;
  return await asyncDML({ qry });
};
const getRoomList = async ({ data }) => {
  let jsdata = JSON.parse(data);
  const qry = `
declare @StartDate nvarchar(max) = '${jsdata.startDate}', @EndDate nvarchar(max) ='${jsdata.endDate}',
@RoomStatus nvarchar(max) = '${jsdata.roomStatus}',@RoomCategory nvarchar(max) = '${jsdata.roomCategory}'
select RM.RoomId,RM.RoomName,RM.KeyId,KM.KeyNo,RM.RoomStatusId,SD.StaticName,RC.CategoryName,RM.Amenities
,RM.CategoryId,
STUFF(
(
select ', ' + CONVERT(VARCHAR(MAX),AM.Name) from 
amenitymaster as AM where AM.AmenityId in (select SplitValue from dbo.Split(RM.Amenities,','))
and AM.IsActive=1 and AM.DeletedBy is null
for xml path('')
),1,1,'')Features
from roommaster as RM join roomcategory as RC
on RM.CategoryId = RC.RoomCategoryId
join keymaster as KM on RM.KeyId=KM.KeyId
join staticdata as SD on SD.StaticId = RM.RoomStatusId
where 
RM.RoomId not in(
  select distinct RoomId from BookingRoomAssignment where BookingId in (
    select BookingId from bookingDetails where DeletedBy is null and BookingStatus !=130 and
    (
    (@startdate between StartDate and EndDate)or
    (@enddate between StartDate and EndDate)or
    (@startdate<= StartDate and @enddate>= EndDate)
    )
    ) and DeletedBy is null and CheckOutDate is null
) 
and RM.CategoryId in(select SplitValue from dbo.Split(@RoomCategory,','))
and RM.RoomStatusId in (select SplitValue from dbo.Split(@RoomStatus,',')) and 
RM.IsActive=1 and RM.DeletedBy is null`;
  return await asyncDML({ qry });
};

const getLatestGuest = async () => {
  const qry = `SELECT top(1)gd.GuestId,CONCAT(gd.FirstName, ' ', gd.LastName, ' (', cm.CityName, ' | ', sm.StateName,')') as GuestName,
  gd.FirstName,gd.LastName,gd.MobileNumber as mobileNo,gd.DOB,gd.Gender,
  (CASE WHEN gd.Gender = 1 THEN 'Male' Else 'Female' END) 'GenderName'
    FROM guestdetails as gd 
 JOIN citymaster as cm ON gd.CityId = cm.CityId
 JOIN statemaster as sm ON gd.StateId = sm.StateId
    WHERE gd.DeletedBy IS NULL and IsActive=1 ORDER BY gd.GuestId DESC`;
  return await asyncDML({ qry });
};
const getManageBooking = async (condition) => {
  const qry = `SELECT bd.BookingId,bd.GuestId,CONCAT(gd.FirstName, ' ', gd.LastName, ' (', cm.CityName, ' | ', sm.StateName,')') as GuestName,gd.MobileNumber as mobileNo,bd.BookingReferenceCode,bd.StartDate,bd.EndDate,
  gd.FirstName,gd.LastName,gd.DOB,gd.Gender,bd.BookingStatus,
  (CASE WHEN gd.Gender = 1 THEN 'Male' ELSE 'Female' END) 'genderName'
    FROM [dbo].[bookingDetails] as bd
    JOIN staticdata as sd ON bd.BookingStatus=sd.StaticId
 JOIN guestdetails as gd ON bd.GuestId = gd.GuestId
 JOIN citymaster as cm ON gd.CityId = cm.CityId
 JOIN statemaster as sm ON gd.StateId = sm.StateId
    WHERE bd.DeletedBy IS NULL
    and ${condition}
`;
  // console.log(qry)
  // ,BRA.RoomId,BRA.KeyId,BRA.NoOfPax,RM.RoomName,KM.KeyNo
  // JOIN BookingRoomAssignment as BRA ON bd.BookingId = BRA.BookingId
  //  JOIN roommaster as RM on BRA.RoomId = RM.RoomId
  //  JOIN keymaster as KM on BRA.keyId = KM.KeyId
  return await asyncDML({ qry });
};

const listManageBooking = async (condition) => {
  let qry = `select BD.BookingId,E.GuestId,BD.StartDate,BD.EndDate,BD.BookingReferenceCode,BD.BookingStatus,SD.StaticName,E.MobileNumber as mobileNo
  ,CONCAT(E.FirstName, ' ', E.LastName, ' (', C.CityName, ' | ', S.StateName,')') as GuestName,
  (CASE WHEN E.Gender = 1 THEN 'Male' Else 'Female' END) 'GenderName' from bookingDetails as BD inner join guestdetails as E on E.GuestId = BD.GuestId	 
    JOIN statemaster S on S.StateId=E.StateId
    JOIN citymaster C on C.CityId=E.CityId
	  JOIN staticdata SD on SD.StaticId = BD.BookingStatus
    WHERE E.DeletedBy is null and BD.DeletedBy is null ${condition}`;
  return await asyncDML({ qry });
};

const guestBookingDetails = async ({ bookingId }) => {
  let qry = `select GBD.BookingId,GBD.BookingRoomAssignId,GBD.Treatment,E.GuestId,E.GuestId as value,CONCAT (E.FirstName , ' ', E.LastName) as label,E.FirstName,E.LastName,E.MiddleName,E.MobileNumber as mobileNo,E.DOB,E.Gender,
(CASE WHEN E.Gender = 1 THEN 'Male' Else 'Female' END) 'GenderName' from GuestBookingDetails as GBD inner join guestdetails as E on E.GuestId = GBD.GuestId	 
WHERE E.DeletedBy is null and GBD.DeletedBy is null and GBD.BookingId = ${bookingId}`;
  return await asyncDML({ qry });
};

const bookingRoomAssignDetails = async ({ bookingId }) => {
  let qry = `select BRA.BookingRoomAssignmentId,BRA.BookingId,BRA.RoomId,BRA.KeyId,GBD.GuestId,GD.FirstName,GD.LastName,RM.RoomName,KM.KeyNo,SD.StaticName,RC.CategoryName,RM.Amenities
  ,RM.CategoryId,
  STUFF(
  (
  select ', ' + CONVERT(VARCHAR(MAX),AM.Name) from 
  amenitymaster as AM where AM.AmenityId in (select SplitValue from dbo.Split(RM.Amenities,','))
  and AM.IsActive=1 and AM.DeletedBy is null
  for xml path('')
  ),1,1,'')Features,
    concat ('[',
    STUFF(
    (
    select ',"' + CONVERT(VARCHAR(MAX),GBD.GuestId) + '"' from GuestBookingDetails as GBD
    where GBD.BookingRoomAssignId = BRA.BookingRoomAssignmentId and GBD.DeletedBy is Null
    for xml path('')
    ),1,1,''),']')selectGuest
    from BookingRoomAssignment as BRA 
      join GuestBookingDetails as GBD on BRA.BookingRoomAssignmentId = GBD.BookingRoomAssignId 
      join guestdetails as GD on GD.GuestId = GBD.GuestId
      join roommaster as RM on RM.RoomId = BRA.RoomId
      join keymaster as KM on KM.KeyId = BRA.KeyId
    join staticdata as SD on SD.StaticId = RM.RoomStatusId
    join roomcategory as RC on RM.CategoryId = RC.RoomCategoryId
    where BRA.BookingId = ${bookingId} and BRA.DeletedBy is null and GBD.DeletedBy is null
`;
  return await asyncDML({ qry });
};

const saveManageBooking = async ({ data, roomStatus }) => {
  var jsdata = JSON.parse(data);
  const BookingRoomAssign = jsdata.bookingRoomAssign;
  const GuestBookingDetails = jsdata.guestBookingDetails;
  const BookingRoomAssignXML = new js2xml(
    "ArrayOfBookingRoomAssign",
    BookingRoomAssign
  );
  const GuestBookingDetailsXML = new js2xml(
    "ArrayOfGuestBookingDetails",
    GuestBookingDetails
  );
  let qry = `AddBooking ${CompanyId},${jsdata.guestId},'${jsdata.startDate}','${jsdata.endDate}',${jsdata.bookingStatus},${jsdata.loggedInUserId},'${BookingRoomAssignXML}','${GuestBookingDetailsXML}',${roomStatus}`;

  return await asyncDML({ qry });
};

const updateManageBooking = async ({ data }) => {
  var jsdata = JSON.parse(data);
  const BookingRoomAssign = jsdata.bookingRoomAssign;
  const GuestBookingDetails = jsdata.guestBookingDetails;
  const BookingRoomAssignXML = new js2xml("ArrayOfBookingRoomAssign",BookingRoomAssign);
  const GuestBookingDetailsXML = new js2xml(
    "ArrayOfGuestBookingDetails",
    GuestBookingDetails
  );
  let qry = `UpdateBooking ${CompanyId},${jsdata.guestId},${jsdata.bookingId},'${jsdata.bookingReferenceCode}','${jsdata.startDate}','${jsdata.endDate}',${jsdata.bookingStatus},${jsdata.loggedInUserId},'${BookingRoomAssignXML}','${GuestBookingDetailsXML}'`;
  return await asyncDML({ qry });
};

const deleteManageBooking = async ({ data }) => {
  let qry = `UPDATE [dbo].[bookingDetails]
              SET [DeletedBy] = ${data.loggedInUserId}
              ,[DeletedDate] = GETDATE()
            WHERE BookingId = ${data.bookingId}

            UPDATE [dbo].[BookingRoomAssignment]
              SET [DeletedBy] = ${data.loggedInUserId}
              ,[DeletedDate] = GETDATE()
            WHERE BookingId = ${data.bookingId}

            UPDATE [dbo].[GuestBookingDetails]
              SET [DeletedBy] = ${data.loggedInUserId}
              ,[DeletedDate] = GETDATE()
            WHERE BookingId = ${data.bookingId}`;
  return await asyncDML({ qry });
}

const checkedOutPerticularRoom = async ({ data, roomStatus }) =>{
  let qry = `UPDATE BookingRoomAssignment 
	set CheckOutDate = GETDATE(),
		UpdatedBy = ${data.loggedInUserId},
		UpdatedDate = GETDATE()
		where BookingId = ${data.bookingId} and BookingRoomAssignmentId = ${data.bookingRoomAssignmentId} and DeletedBy is null

UPDATE roommaster
	set RoomStatusId = ${roomStatus},
		UpdatedBy = ${data.loggedInUserId},
		UpdatedDate = GETDATE()
		where RoomId in (select RoomId from BookingRoomAssignment where BookingRoomAssignmentId = ${data.bookingRoomAssignmentId} and BookingId = ${data.bookingId} and DeletedBy is null)`;
  return await asyncDML ({ qry });
}
module.exports = {
  getManageBooking,
  saveManageBooking,
  getLatestGuest,
  getRoomList,
  getRoomStatus,
  getDefaultRoomCategory,
  getDefaultRoomStatus,
  listManageBooking,
  guestBookingDetails,
  bookingRoomAssignDetails,
  updateManageBooking,
  deleteManageBooking,
  checkedOutPerticularRoom
};
