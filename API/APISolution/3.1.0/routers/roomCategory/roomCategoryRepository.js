const { asyncDML } = require("../../../dbutils");

const getRoomCategory = async (effectiveDate) => {
  effectiveDate = effectiveDate ? effectiveDate : null;
  const qry = `SELECT E.RoomCategoryId,E.CategoryName,E.EffectiveDate,E.IsActive ,E.Description,
        (CASE WHEN E.IsActive = 1 THEN 'Yes' ELSE 'No' END) 'Active', '[' + Amenities + ']' as Amenities
        FROM roomcategory E       
        WHERE E.DeletedBy is null   
        and ('${effectiveDate}' IS NULL OR E.EffectiveDate = CONVERT(Date,'${effectiveDate}'))
        ORDER BY E.CategoryName`;
  console.log(qry);
  return await asyncDML({ qry });
};
const saveRoomCategory = async ({data,operationType}) => {
  var jsdata = JSON.parse(data);
  var qry = '';
  if (operationType == 0) {
    qry = `INSERT INTO [dbo].[roomcategory]
           ([CategoryName],[EffectiveDate],[IsActive],[Description],[Amenities],[CreatedBy],[CreatedDate])
           VALUES('${jsdata.categoryName}',CONVERT(DATE,'${jsdata.effectiveDate}'),${jsdata.isActive},'${jsdata.description}','${jsdata.amenities}','${jsdata.loggedInReferenceId}',GETDATE())`;
  }
  else if (operationType == 1) {
    qry = `
    UPDATE [dbo].[roomcategory]
       SET [CategoryName] = '${jsdata.categoryName}'
          ,[EffectiveDate] = CONVERT(DATE,'${jsdata.effectiveDate}')
          ,[IsActive] = ${jsdata.isActive}
          ,[Description] = '${jsdata.description}'   
          ,[Amenities] = '${jsdata.amenities}'
          ,[UpdatedBy] = ${jsdata.loggedInReferenceId}      
          ,[UpdatedDate] = GETDATE()
     WHERE RoomCategoryId = ${jsdata.roomCategoryId}`;
  }

  return await asyncDML({ qry });
}
module.exports = {
  getRoomCategory, saveRoomCategory
};
