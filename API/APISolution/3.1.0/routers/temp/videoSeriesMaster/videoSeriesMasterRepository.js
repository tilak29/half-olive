const { asyncDML } = require("../../../dbutils");


const getVideoSeriesList = async() => {
    const qry = `select vsm.SeriesId, vsm.SeriesName, 
                    CONCAT(FNGetConfigurationValueByCode('VIDEO_URL',NULL),'/',vsm.SeriesIcon) AS SeriesIcon, 
                    vsm.SeriesDescription, vsm.IsActive,
                    (SELECT count(*) FROM videomaster vm where vm.IsActive = 1 AND vm.SeriesId = vsm.SeriesId) as VideoCount
                    FROM videoseriesmaster vsm;`;
    return await asyncDML({qry});
}

const saveVideoSeries = async({loggedInEmployeeId, seriesId, seriesIcon, seriesName, seriesDescription, isActive}) => {

    const dupCheckQry = `SELECT 1 AS DuplicateExists
                        FROM videoseriesmaster 
                        WHERE (${seriesId} IS NULL AND SeriesName = '${seriesName}') 
                        OR (${seriesId} IS NOT NULL AND SeriesId != ${seriesId} AND SeriesName = '${seriesName}')`
    const dupResponse = await asyncDML({qry:dupCheckQry});
    
    if(dupResponse && dupResponse.isSuccess && dupResponse[0] && dupResponse[0]["DuplicateExists"] == "1")
    {
        return {
            isSuccess : false,
            isDuplicate: true
        }
    }

    const qry = `INSERT INTO videoseriesmaster(SeriesId, SeriesName, SeriesIcon, SeriesDescription, IsActive, CreatedBy, CreatedDate) 
                VALUES(${seriesId}, '${seriesName}','${seriesIcon}', '${seriesDescription}', ${isActive}, ${loggedInEmployeeId}, CURRENT_TIMESTAMP) 
                ON DUPLICATE KEY UPDATE SeriesName = '${seriesName}', SeriesIcon ='${seriesIcon}' , SeriesDescription = '${seriesDescription}', IsActive = ${isActive}, UpdatedBy = ${loggedInEmployeeId}, UpdatedDate = CURRENT_TIMESTAMP;
                SELECT LAST_INSERT_ID() AS InsertedId;
                `;
    return await asyncDML({qry});
}


module.exports = {
    getVideoSeriesList,
    saveVideoSeries
};
