const js2xml = require("js2xml").Js2Xml;
const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");
/**
 * @author "Vishal Thakkar"
 */

const getTime = async () => {
  const qry = `
    --  select EffectiveDate from RoomRateMaster  WHERE DeletedBy IS NULL  ORDER BY EffectiveDate asc
    select DISTINCT EffectiveDate from RoomRateMaster where DeletedBy is null `;
  return await asyncDML({ qry });
};
/**
 * @author "Vishal Thakkar"
 */

const datefilter = async (effectiveDate) => {
  const qry = `
select distinct RoomCategoryId,OccupancyId,Amount,RoomRateId  from RoomRateMaster where EffectiveDate='${effectiveDate}' and DeletedBy IS NULL`;
  return await asyncDML({ qry });
};
/**
 * @author "Vishal Thakkar"
 */

const listallcategoryname = async () => {
  const qry = `SELECT rm.RoomCategoryId,rc.CategoryName
    FROM roomcategory rm
    JOIN roomcategory rc on rc.RoomCategoryId=rm.RoomCategoryId
    AND rm.DeletedBy IS NULL`;
  return await asyncDML({ qry });
};
/**
 * @author "Vishal Thakkar"
 */

const listdays = async () => {
  const qry = `select SplitValue as Value from configurationmaster as cm cross apply dbo.Split(cm.Value,',') 
  where cm.ConfigurationId = 37`;
  return await asyncDML({ qry });
};
/**
 * @author "Vishal Thakkar"
 */

const saveroomRate = async ({ data }) => {
  var jsdata = JSON.parse(data);
  const RoomRateData = jsdata.Data;
  const RoomRateDataXML = new js2xml("ArrayOfRoomRateData", RoomRateData);
  let qry = `AddRoomRateMaster ${CompanyId},'${jsdata.EffectiveDate}',${jsdata.loggedInUserId},'${RoomRateDataXML}'`;
  return await asyncDML({ qry });
};
/**
 * @author "Vishal Thakkar"
 */

const updateroomRate = async ({ data }) => {
  var jsdata = JSON.parse(data);
  const RoomRateData = jsdata.Data;
  const RoomRateDataXML = new js2xml("ArrayOfRoomRateData", RoomRateData);
  let qry =`UpdateRoomRateMaster ${CompanyId},'${jsdata.EffectiveDate}',${jsdata.loggedInUserId},'${RoomRateDataXML}'`;
  return await asyncDML({ qry });
};

/**
 *  @author "Vishal Thakkar"
 */

const deleteroomrate = async (bodyData) => {
  let qry =` UPDATE [dbo].[RoomRateMaster]
   SET [DeletedBy] = ${bodyData.loggedInReferenceId}
      ,[DeletedDate] = GETDATE()
   WHERE EffectiveDate = '${bodyData.effectiveDate}'`;
return await asyncDML({ qry });
}
module.exports = {
  getTime,
  datefilter,
  listallcategoryname,
  listdays,
  saveroomRate,
  updateroomRate,
  deleteroomrate
};
