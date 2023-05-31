const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");
/**
 * @author "Manish Viradiya"
 */

const getTreatmentroommaster = async ({ filterStatus }) => {
  const qry = `GetTreatmentRoom ${filterStatus}, ${CompanyId}`;
  return await asyncDML({ qry });
};

/**
 * @author "Manish Viradiya"
 */

const getTherapistList = async () => {
  const qry = `select EmployeeId as value, CONCAT(FirstName,' ',LastName) as label from employeemaster 
  cross apply dbo.Split(DivisionId,',')
  where DesignationId = 5 and DeletedBy is null and Status=8 and IsActive=1 
  and SplitValue=1
  order by concat(FirstName,' ',LastName)`;
  return await asyncDML({ qry });
};

/**
 * @author "Manish Viradiya"
 */

const saveTreatmentRoomMaster = async ({ data }) => {
  var jsdata = JSON.parse(data);
  const qry = `InsertTreatmentRoom '${jsdata.roomName}','${jsdata.description}',${jsdata.locationId},
    '${jsdata.therapistId}',${jsdata.isActive},${jsdata.loggedInUserId},'${jsdata.TreatmentId}',${CompanyId}`;
  return await asyncDML({ qry });
};

/**
 * @author "Manish Viradiya"
 */

const updateTreatmentMasterRoom = async ({ data }) => {
  var jsdata = JSON.parse(data);
 const qry =`
  UpdateTreatmentRoom '${jsdata.roomName}','${jsdata.description}',${jsdata.locationId},
    '${jsdata.therapistId}',${jsdata.isActive},${jsdata.loggedInUserId},'${jsdata.TreatmentId}',
    ${jsdata.treatmentRoomId},${CompanyId}`

  return await asyncDML({ qry });
};

/**
 * @author "Manish Viradiya"
 */

const deleteTreatmentroommaster = async ({ data }) => {
  const qry = `
    DeleteTreatmentRoom ${data.loggedInUserId},${data.TreatmentRoomId},${CompanyId}
    `;
  return await asyncDML({ qry });
};
module.exports = {
  getTreatmentroommaster,
  getTherapistList,
  saveTreatmentRoomMaster,
  updateTreatmentMasterRoom,
  deleteTreatmentroommaster,
};
