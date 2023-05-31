const { asyncDML } = require("../../../dbutils");

const getDocumentTypeData = async({documentGroupId = null}) => {
    const qry = `SELECT DTM.DocumentTypeId, DTM.DocumentType, DTM.DocumentCode, DTM.Description, DTM.DocumentGroupId, DTM.IsActive, SD.StaticName as documentGroupName
    FROM documenttypemaster DTM INNER JOIN staticdata SD  ON DTM.DocumentGroupId = SD.StaticId
    WHERE (${documentGroupId} IS NULL OR DocumentGroupId = ${documentGroupId});`;

    return await asyncDML({qry});
}

const saveDocumentTypeData = async({loggedInEmployeeId, documentTypeId, documentType, documentCode, description="", isActive, documentGroupId = null}) => {    
    const dupCheckQry = `SELECT 1 AS DuplicateExists
                        FROM documenttypemaster 
                        WHERE (${documentTypeId} IS NULL AND documentType = '${documentType}' AND DocumentGroupId = '${documentGroupId}') 
                        OR (${documentTypeId} IS NOT NULL AND documentTypeId != ${documentTypeId} AND documentType = '${documentType}' AND DocumentGroupId = '${documentGroupId}')`
    const dupResponse = await asyncDML({qry:dupCheckQry});

    if(dupResponse && dupResponse.isSuccess && dupResponse[0] && dupResponse[0]["DuplicateExists"] == "1")
    {
        return {
                isSuccess : false,
                isDuplicate: true
        }
    }

    let qry = "";
    if(documentTypeId === null){
        qry = `INSERT INTO documenttypemaster(DocumentType, Description, DocumentCode, IsActive, CreatedBy, CreatedDate, DocumentGroupId)
                SELECT '${documentType}', '${description}', '${documentCode}', ${isActive}, ${loggedInEmployeeId}, CURRENT_TIMESTAMP, ${documentGroupId};`;
    }
    else{
        qry = `UPDATE documenttypemaster
                SET DocumentType = '${documentType}' ,DocumentGroupId = '${documentGroupId}' , Description = '${description}', IsActive = ${isActive}, UpdatedBy = ${loggedInEmployeeId}, UpdatedDate =  CURRENT_TIMESTAMP
                WHERE DocumentTypeId = ${documentTypeId};
                `;
    }
    return await asyncDML({qry});
}

const getActiveDocumentTypeData = async({documentGroupId = null}) => {
    const qry = `SELECT DTM.DocumentTypeId, DTM.DocumentType, DTM.DocumentCode, DTM.Description, DTM.DocumentGroupId, DTM.IsActive, SD.StaticName as documentGroupName
    FROM documenttypemaster DTM INNER JOIN staticdata SD  ON DTM.DocumentGroupId = SD.StaticId
    WHERE (${documentGroupId} IS NULL OR DocumentGroupId = ${documentGroupId}) AND (DTM.IsActive = 1);`;
    return await asyncDML({qry});
}

module.exports = {
    getDocumentTypeData,
    saveDocumentTypeData,
    getActiveDocumentTypeData
}
