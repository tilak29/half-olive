const { asyncDML } = require("../../../../dbutils");


const getWorkFlowIdList = async ({staticId = null}) =>{
    const qry = `SELECT NextStaticId AS value, StaticName AS label
    from workflowmaster WF
    INNER JOIN staticdata SD ON WF.NextStaticId = SD.StaticId
    WHERE WF.StaticId = ${staticId} AND WF.DeletedBy IS NULL
    `;
    return await asyncDML({qry});
}

module.exports = {
    getWorkFlowIdList
}

