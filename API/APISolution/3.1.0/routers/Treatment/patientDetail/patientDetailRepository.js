const { asyncDML } = require("../../../../dbutils");


// // <<<<<<< .mineconst accountSid = "AC6685087309d1da987b3bf59d622ecad7";
// const authToken = "c8a396866e0f263b5f946f5fcf99ff06";
// //const client = require('twilio')(accountSid, authToken);
// =======// const accountSid = "AC6685087309d1da987b3bf59d622ecad7";
// // const authToken = "c8a396866e0f263b5f946f5fcf99ff06";
// // const client = require('twilio')(accountSid, authToken);
// >>>>>>> .theirs
/**
 * @author "Bhargav Bhagiya"
 */
const patientName = async ({ searchName, checkedIn }) => {
    var qry
    if (checkedIn) {
        qry = `select distinct BD.BookingId,GBD.GuestId,BD.BookingStatus, CONCAT(GD.FirstName, ' ', GD.LastName) as GuestName
        from bookingDetails as BD
		join GuestBookingDetails as GBD on GBD.BookingId = BD.BookingId
        JOIN guestdetails GD on GBD.GuestId=GD.GuestId
        where GD.DeletedBy is null and CONCAT(GD.FirstName, ' ', GD.LastName) like '%${searchName}%' and
        BD.BookingStatus = 129 and BD.DeletedBy is null and GBD.Treatment = 1 and GBD.DeletedBy is null`
    } else {
        qry = `select distinct BD.BookingId,GBD.GuestId,BD.BookingStatus, CONCAT(GD.FirstName, ' ', GD.LastName) as GuestName
        from bookingDetails as BD
		join GuestBookingDetails as GBD on GBD.BookingId = BD.BookingId
        JOIN guestdetails GD on GBD.GuestId=GD.GuestId
        where GD.DeletedBy is null and CONCAT(GD.FirstName, ' ', GD.LastName) like '%${searchName}%' and
        BD.BookingStatus = 128 and BD.DeletedBy is null and GBD.Treatment = 1 and GBD.DeletedBy is null`
    }
    return await asyncDML({ qry })

}


/**
 * @author "Bhargav Bhagiya"
 */
const patientPersonalDetail = async ({ GuestId }) => {
    const qry = `SELECT gd.GuestId,
                        CONCAT(gd.FirstName, ' ', gd.LastName) as GuestName,
                        gd.Address,
                        C.CityName,
                        S.StateName,
                        CM.CountryName,
                        gd.MobileNumber,
                        gd.Email
                FROM guestdetails gd
                JOIN countrymaster CM on CM.CountryId=gd.CountryId
                JOIN statemaster S on S.StateId=gd.StateId
                JOIN citymaster C on C.CityId=gd.CityId
                WHERE gd.DeletedBy is null
                and (${GuestId} is null or GuestId = ${GuestId})   
                ORDER BY gd.FirstName`
    return await asyncDML({ qry })
}

// const messageonwhatsapp = async () => {
//     client.messages 
//       .create({ 
//          body: 'Smart Lab', 
//          from: 'whatsapp:+14155238886',       
//          to: 'whatsapp:+917016544054' 
//        }) 
//       .then(message => console.log(message.sid)) 
//       .done();
// }

module.exports = {
    patientName,
    patientPersonalDetail
    // messageonwhatsapp
};