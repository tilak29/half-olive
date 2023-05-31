const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");

/**
 * @author "Dileep Lohar"
 */
const getdailytherapy = async ({bodyData}) => {
    var qry =
    `SELECT DT.GuestId,CONCAT(GS.FirstName, ' ', GS.LastName) AS GuestName,
    CONVERT(XML,(SELECT LDT.TherapyId, TTM.TypeName,RIGHT(Convert(VARCHAR(20), TSM.StartTime,100),7) as StartTime,RIGHT(Convert(VARCHAR(20), TSM.EndTime,100),7) as EndTime,TSM.TherapySlotId
               FROM dailytherapy LDT
               INNER JOIN TherapyTypeMaster AS TTM ON LDT.TherapyId=TTM.TherapyId
               INNER JOIN TherapySlotMaster AS TSM ON LDT.TherapySlotId=TSM.TherapySlotId
               WHERE LDT.GuestId = DT.GuestId AND TTM.DeletedBy IS NULL AND TSM.DeletedBy IS NULL
               FOR XML PATH ('Type'), ROOT ('Daily'))) AS 'DailyReport'
               
    from dailytherapy AS DT
    INNER JOIN guestdetails AS GS ON DT.GuestId=GS.GuestID
    WHERE DT.DeletedBy IS NULL AND DT.CompanyId = ${CompanyId} AND DT.Date='${bodyData.date}' AND DT.DeletedBy IS NULL
    GROUP BY DT.GuestId,GS.FirstName,GS.LastName`
    return await asyncDML({ qry })
}

const getdailytherapyColumnName = async () => {
    var qry =
    `SELECT TherapyId, TypeName as title,Typename as field,SortName,
    CONVERT(XML,(SELECT convert(varchar(10), TSMT.StartTime, 108) AS label,TSMT.TherapySlotId
                  FROM TherapySlotMaster TSMT 
                  inner join TherapyTypeMaster as TTM on TSMT.type = TTM.TherapyId
                  where TSMT.Type = TTTM.TherapyId and TSMT.DeletedBy is null and TTTM.DeletedBy is null and TSMT.IsActive = 1
                  FOR XML PATH ('Type'), ROOT ('Time'))) AS 'TherapyTime'
    FROM TherapyTypeMaster TTTM WHERE DeletedBy IS NULL`
    return await asyncDML({ qry })
}
const getdailytherapyTypeSlot = async () => {
    var qry =
    `SELECT convert(varchar(10), StartTime, 108) AS label,TherapySlotId AS value, Type FROM TherapySlotMaster WHERE IsActive=1 AND DeletedBy IS NULL `
    return await asyncDML({ qry })
}
const getdailytherapyupdate = async ({Data,date,GuestId,loggedInUserId}) => {
    var qry =
    `DECLARE @test XML
    SET @test = '${Data}'

DECLARE @Temp TABLE(TherapyId INT,TherapySlotId INT) 

	INSERT INTO @Temp
	SELECT 
		d.v.value('therapyid[1]','INT'),
		d.v.value('value[1]','INT')
	FROM @test.nodes('/root/body') d(v)

select * from @Temp

UPDATE dt
SET    TherapySlotId = tm.TherapySlotId,
        Updatedby= ${loggedInUserId},
		UpdatedDate= GETDATE()
FROM   dailytherapy dt
       INNER JOIN @Temp tm ON dt.TherapyId = tm.TherapyId
        AND dt.GuestId = ${GuestId} and Date = '${date}'`
    return await asyncDML({ qry })
}

module.exports = {
    getdailytherapy,
    getdailytherapyColumnName,
    getdailytherapyupdate,
    getdailytherapyTypeSlot
};