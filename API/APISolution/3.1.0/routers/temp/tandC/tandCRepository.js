const {asyncDML} = require("../../../dbutils");

const saveTandC = async ({loggedInEmployeeId, tandcBody}) => {
    const qry = `SET @TemplateId = (SELECT TemplateId FROM templatemaster WHERE Code = 'TandCforSmartLabApplication');
    INSERT INTO templatemaster(TemplateId, Code, Name, Body, IsActive, CreatedBy, CreatedDate) 
    VALUES(@TemplateId, 'TandCforSmartLabApplication', 'TandCforSmartLabApplication','${tandcBody}', 1, ${loggedInEmployeeId}, CURRENT_TIMESTAMP) 
    ON DUPLICATE KEY UPDATE Body = '${tandcBody}' ,UpdatedBy = ${loggedInEmployeeId} ,UpdatedDate = CURRENT_TIMESTAMP;
    SELECT LAST_INSERT_ID() AS InsertedId;`

    return await asyncDML({qry});
}

const getTandC = async () => {
    const qry = `SELECT Body FROM templatemaster WHERE Code = 'TandCforSmartLabApplication'`;
    return await asyncDML({qry});
}

module.exports = {
    getTandC,
    saveTandC
};
