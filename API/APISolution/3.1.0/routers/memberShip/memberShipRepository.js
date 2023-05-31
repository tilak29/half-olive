const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");
const js2xml = require("js2xml").Js2Xml;

/**
 * @author "Manish Viradiya"
 */

const getEffectiveDate = async ({}) => {
    const qry = `select distinct EffectiveDate from MemberShipMaster where DeletedBy is null`;
    return await asyncDML({ qry })
}

/**
 * @author "Manish Viradiya"
 */

const getRoomMemberShip = async ({ effectiveDate }) => {
    const qry = `select MemberShipMasterId,RoomCategoryId,Days,OccupancyId,Amount,EffectiveDate from MemberShipMaster where EffectiveDate = '${effectiveDate}' and DeletedBy is null`;
    return await asyncDML({ qry });
};

/**
 * @author "Manish Viradiya"
 */

const getOccupancy = async ({ }) => {
    const qry = `select SplitValue as Value,sd.StaticName from configurationmaster as cm cross apply dbo.Split(cm.Value,',') as O
    Join staticData as sd on O.SplitValue = sd.StaticId
    where cm.ConfigurationId = 38 `;
    return await asyncDML({ qry });
};

/**
 * @author "Manish Viradiya"
 */

const getMemberShipDays = async ({ }) => {
    const qry = `select SplitValue as Value from configurationmaster as cm cross apply dbo.Split(cm.Value,',') 
    where cm.ConfigurationId = 37`;
    return await asyncDML({ qry });
};

/**
 * @author "Manish Viradiya"
 */

const saveMemberShip = async ({ data}) => {
    var jsdata = JSON.parse(data);
    let MemberShipData = jsdata.memberShipData
    const MemberShipDataXML = new js2xml(
        "ArrayOfMemberShip",
        MemberShipData
      );
      let qry = `AddMemberShipMaster ${CompanyId},'${jsdata.effectiveDate}',${jsdata.loggedInUserId},'${MemberShipDataXML}'`
    return await asyncDML({ qry });
};

/**
 * @author "Manish Viradiya"
 */

const updateMemberShip = async ({ data}) => {
    var jsdata = JSON.parse(data);
    const MemberShipDataXML = new js2xml(
        "ArrayOfMemberShip",
        jsdata.memberShipData
      );
      let qry =`UpdateMemberShipMaster ${CompanyId},'${jsdata.effectiveDate}',${jsdata.loggedInUserId},'${MemberShipDataXML}'`
    return await asyncDML({ qry });
};

const deleteMemberShip = async ({ data }) => {
    let qry = `update MemberShipMaster 
    set DeletedBy = ${data.loggedInUserId}, 
        DeletedDate = GETDATE() 
    where EffectiveDate = '${data.effectiveDate}'`;
    return await asyncDML({ qry });
}

module.exports = {
    getRoomMemberShip,
    saveMemberShip,
    getMemberShipDays,
    getOccupancy,
    updateMemberShip,
    getEffectiveDate,
    deleteMemberShip
};
