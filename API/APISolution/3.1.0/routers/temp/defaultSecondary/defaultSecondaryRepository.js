const { asyncDML } = require("../../../dbutils");


const getDefaultSecondary = async () => {
//U166116 - Right join is used to show all states.
    const qry = `SELECT spm.SecondaryPointId,sm.StateId,spm.Point, sm.StateName
        FROM secondarypointmaster spm
        RIGHT JOIN statemaster sm on spm.StateId = sm.StateId
        WHERE spm.DeletedBy IS NULL
        AND sm.DeletedBy IS NULL
        ORDER BY sm.StateName ASC;`;
    return await asyncDML({ qry });
}
//U166118 
const updateDefaultSecondary = async ({ loggedInEmployeeId, secondaryPointId = null, point, stateId }) => {
    const qry = `INSERT INTO secondarypointmaster(secondaryPointId, stateId, Point, CreatedBy, CreatedDate) 
    VALUES(${secondaryPointId}, ${stateId},${point}, ${loggedInEmployeeId}, CURRENT_TIMESTAMP) 
    ON DUPLICATE KEY UPDATE Point = '${point}', UpdatedBy = ${loggedInEmployeeId}, UpdatedDate = CURRENT_TIMESTAMP;
    SELECT LAST_INSERT_ID() AS InsertedId;`;
    return await asyncDML({qry});
}
//U166118 
const updateAllDefaultSecondary = async ({ loggedInEmployeeId, jsonData }) => {
    const qry = `SET @op_IsSuccess = 0;
    CALL SaveSecondaryPointData(${loggedInEmployeeId},'${jsonData}',@op_IsSuccess);SELECT @op_IsSuccess;`;
    return await asyncDML({ qry });
}

// const updateAllDefaultSecondary = async ({ loggedInEmployeeId, jsonData }) => {
//     const qry = ` Update secondarypointmaster set Point = ${point},UpdatedBy=${loggedInEmployeeId},UpdatedDate=Current_Timestamp WHERE SecondaryPointId=${secondaryPointId};`;
//     return await asyncDML({ qry });
// }

module.exports = {
    getDefaultSecondary,
    updateDefaultSecondary,
    updateAllDefaultSecondary
};
