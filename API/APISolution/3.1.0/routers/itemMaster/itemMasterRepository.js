const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");

const mysql = require("mysql");

/**
 * @author "Parth Suthar"
 */
const itemGetData = async ({
  loggedInEmployeeId,
  divisionId = null,
  loggedInDivisionId,
  isActive,
  page,
  pageSize,
  orderBy = null,
  orderDirection = null,
  search = null,
  loggedInAppIndication
}) => {
  // const division =
  //   divisionId || loggedInAppIndication === 0 || loggedInAppIndication
  //     ? divisionId
  //     : loggedInDivisionId;
  let division = divisionId == null ? null : `'[${divisionId}]'`;
  if(division == null){
    division = loggedInAppIndication === 3 ? JSON.stringify(loggedInDivisionId) : division;
  }
  const qry = `CALL GetItemMasterData_300(${loggedInEmployeeId}, ${CompanyId}, ${division}, ${isActive}, null, ${loggedInAppIndication});`;
  return await asyncDML({ qry });
};

/**
 * @author "Parth Suthar"
 */
const itemSaveData = async ({ data, operationType }) => {
  const qry = `SET @op_IsSuccess = 0;SET @op_Flag = 0; 
  CALL SaveItemMaster('${data}',${operationType},@op_IsSuccess, @op_Flag);SELECT @op_IsSuccess, @op_Flag;`;  
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const itemDownloadData = async ({divisionId}) => {
  const qry = `SELECT 
  DM.DivisionName,IM.ItemId
  ,Brand,Pack,BoxSize,Composition,SCH,CM.CategoryName,IP.MRP,IP.PTR,Sequence,IP.PTS
  FROM itemmaster IM
  INNER JOIN categorymaster CM ON CM.CategoryId = IM.CategoryId
  INNER JOIN divisionmaster DM ON DM.DivisionId = IM.DivisionId
  INNER JOIN staticdata SD ON SD.StaticId = IM.UOM
  INNER JOIN (
  SELECT ItemId
    ,MAX(EffectiveStartDate) MaxEffectiveStartDate
    ,MAX(iIP.ItemPriceId) MaxItemPriceId
  FROM itemprice iIP
  WHERE DeletedBy IS NULL
  AND iIP.EffectiveStartDate <= CURRENT_DATE
  GROUP BY iIP.ItemId
  ) II ON II.ItemId = IM.ItemId
  INNER JOIN itemprice IP ON IP.ItemId = II.ItemId AND IP.ItemPriceId = II.MaxItemPriceId AND IP.DeletedBy IS NULL
  WHERE IM.DeletedBy IS NULL
  AND IM.DivisionId = ${divisionId}
  AND (IM.IsActive = 1)
  AND DM.IsActive=1
  ORDER BY DM.DivisionName,IM.Sequence,IM.Brand;`;
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const itemUploadData = async ({ data }) => {
  let qry = ``;
  data.Export.map((item) => {
    qry += mysql.format(
      "UPDATE itemmaster As I " +
        "JOIN itemprice Ip on Ip.ItemId=I.ItemId " +
        "JOIN categorymaster CM on CM.CategoryId=I.CategoryId " +
        "JOIN divisionmaster DM on DM.DivisionId=I.DivisionId SET I.sequence = ? WHERE I.itemid = ? ;",        
      [
        item.sequence,
        item.id
      ]
    );
  });
  return await asyncDML({ qry });
};

module.exports = {
  itemGetData,
  itemSaveData,
  itemDownloadData,
  itemUploadData
};
