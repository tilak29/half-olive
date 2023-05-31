const { asyncDML } = require("../../../dbutils");

const getRoomMaster = async ({filterCategory,filterStatus,filterRoomStatus}) => {
  filterCategory = filterCategory ? filterCategory : null;
  filterStatus = filterStatus ? filterStatus : null;
  filterRoomStatus = filterRoomStatus ? filterRoomStatus : null;
  const qry = `SELECT rm.RoomId, rm.RoomName,rm.RoomStatusId,sd.StaticName,rm.KeyId,k.keyNo as RoomKey,rc.CategoryName,rc.RoomCategoryId,
  (CASE WHEN rm.IsActive = 1 THEN 'Yes' ELSE 'No' END) 'Active',rm.Description,rm.IsActive,'[' + rm.Amenities + ']' as Amenities,
  rm.RoomName + ' - ' + rc.CategoryName as Room
  FROM roommaster rm
  INNER JOIN roomcategory rc ON rm.CategoryId = rc.RoomCategoryId
  INNER JOIN staticdata sd ON rm.RoomStatusId = sd.StaticId
  INNER JOIN keyMaster k ON rm.keyId = k.keyId
  WHERE rm.DeletedBy IS NULL
  AND (${filterCategory} IS NULL OR rm.CategoryId = ${filterCategory})
  AND (${filterStatus} IS NULL OR rm.IsActive = ${filterStatus})
  AND (${filterRoomStatus} IS NULL OR rm.RoomStatusId = ${filterRoomStatus})
  AND rc.DeletedBy IS NULL`;  
  console.log("filterCategory :: ",qry);
  return await asyncDML({ qry });
};

const saveRoomMaster = async ({data,operationType}) => {
  var jsdata = JSON.parse(data);
  var qry = '';
  if (operationType == 0) {
    qry = `INSERT INTO [dbo].[roommaster]
           ([RoomName],[RoomStatusId],[KeyId],[CategoryId],[Description],[IsActive],[Amenities],[CreatedBy],[CreatedDate])
           VALUES('${jsdata.roomName}','${jsdata.roomStatus}',ISNULL(${jsdata.keyId},0),${jsdata.categoryId},'${jsdata.description}',${jsdata.isActive},'${jsdata.amenities}','${jsdata.loggedInReferenceId}',GETDATE())`;
  }
  else if (operationType == 1) {
    qry = `
    UPDATE [dbo].[roommaster]
       SET [RoomName] = '${jsdata.roomName}'
          ,[RoomStatusId] =  ${jsdata.roomStatus}
          ,[KeyId] =  ISNULL(${jsdata.keyId},0)
          ,[CategoryId] = ${jsdata.categoryId}
          ,[Description] = '${jsdata.description}'   
          ,[IsActive] = ${jsdata.isActive}
          ,[Amenities] = '${jsdata.amenities}'
          ,[UpdatedBy] = ${jsdata.loggedInReferenceId}      
          ,[UpdatedDate] = GETDATE()
     WHERE RoomId = ${jsdata.roomId}`;
  }

  return await asyncDML({ qry });
};

const getRoomCategories = async () => {
  const qry =
    `SELECT CategoryName AS Label,RoomCategoryId AS Value,'[' + Amenities + ']' as Amenities FROM roomcategory WHERE Deletedby IS NULL AND IsActive = 1 ORDER BY CategoryName`;
  return await asyncDML({ qry });
};

const getKeyList = async () => {
  const qry = `SELECT KeyNo AS Label,KeyId AS Value FROM keymaster WHERE Deletedby IS NULL AND IsActive = 1 ORDER BY KeyNo`;
  return await asyncDML({ qry });
};
module.exports = {
  getRoomMaster,
  saveRoomMaster,
  getRoomCategories,
  getKeyList,
};
