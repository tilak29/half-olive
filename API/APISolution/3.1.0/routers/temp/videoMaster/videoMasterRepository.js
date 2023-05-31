const { asyncDML } = require("../../../dbutils");

const getVideoList = async({loggedInEmployeeId, loggedInAppIndication}) => {
    const qry = `CALL GetVideoList(null, ${loggedInEmployeeId}, ${loggedInAppIndication});`;
    return await asyncDML({qry});
}

const updateUserVideoStartTime = async({loggedInEmployeeId, videoId, videoStartTime, loggedInAppIndication}) => {
    const qry = `CALL UpdateVideoStartTime_300(${loggedInEmployeeId},${videoId},'${videoStartTime}', ${loggedInAppIndication},@op_IsSussess); SELECT @op_IsSussess;`;
    return await asyncDML({qry});
}

const updateUserVideoIsLike = async({loggedInEmployeeId, videoId, isLike, loggedInAppIndication}) => {
    const qry = `SELECT MAX(ViewId) INTO @ViewId FROM videoviewdetail WHERE UserId = ${loggedInEmployeeId} AND VideoId = ${videoId} AND UserType = ${loggedInAppIndication};
    INSERT INTO videoviewdetail(ViewId, VideoId, UserId, IsLike, CreatedBy, CreatedDate, UserType) 
    VALUES(@ViewId, ${videoId}, ${loggedInEmployeeId}, '${isLike}', ${loggedInEmployeeId}, CURRENT_TIMESTAMP, ${loggedInAppIndication}) 
    ON DUPLICATE KEY UPDATE IsLike = '${isLike}', UpdatedBy = ${loggedInEmployeeId}, UpdatedDate = CURRENT_TIMESTAMP;
    SELECT LAST_INSERT_ID() AS InsertedId;
    `;
    return await asyncDML({qry});
}


const getVideoUserComment = async({loggedInEmployeeId, videoId, loggedInAppIndication}) => {
    const qry = `SELECT CommentId, Comment, CreatedDate AS DateTime FROM videousercomment WHERE UserId = ${loggedInEmployeeId} AND VideoId = ${videoId} AND UserType = ${loggedInAppIndication} ORDER BY CreatedDate DESC`;
    return await asyncDML({qry});
}

const saveVideoUserComment = async({loggedInEmployeeId, videoId, comment, loggedInAppIndication}) => {
    const qry = `INSERT INTO videousercomment (VideoId, UserId, Comment, CreatedBy, CreatedDate, UserType)
    VALUES (${videoId},${loggedInEmployeeId},'${comment}',${loggedInEmployeeId},CURRENT_TIMESTAMP, ${loggedInAppIndication})`;
    return await asyncDML({qry});
}

const getVideoMasterData = async({seriesId}) => {
    const qry = `SELECT VideoId, SeriesId, VideoPlaceholder, 
                    VideoTitle, VideoDescription, VideoUrl, 
                    VideoDuration, IsActive,
                    CONCAT(FNGetConfigurationValueByCode('VIDEO_URL',NULL),'/',VideoUrl) AS VideoFile,
                    StartDate, AppIndicatorId
                FROM videomaster 
                WHERE SeriesId = ${seriesId}
                ORDER BY VideoId DESC;`;
    return await asyncDML({qry});
}

const saveVideoData = async({loggedInEmployeeId, videoId, seriesId, videoPlaceholder, videoTitle, videoDescription, videoUrl, videoDuration, isActive,date, appIndicatorId = '[]'}) => { 
    const qry = `INSERT INTO videomaster(VideoId, SeriesId, VideoPlaceholder, 
                                        VideoTitle, VideoDescription, VideoUrl, 
                                        VideoDuration, IsActive, StartDate,
                                        CreatedBy, CreatedDate, AppIndicatorId) 
                VALUES(${videoId}, ${seriesId}, '${videoPlaceholder}', 
                        '${videoTitle}','${videoDescription}', '${videoUrl}', 
                        '${videoDuration}',${isActive},'${date}',
                        ${loggedInEmployeeId}, CURRENT_TIMESTAMP, '${appIndicatorId}') 
                ON DUPLICATE KEY UPDATE SeriesId = ${seriesId}, VideoPlaceholder = '${videoPlaceholder}',
                                        VideoTitle = '${videoTitle}', VideoDescription = '${videoDescription}',
                                        VideoUrl = '${videoUrl}', VideoDuration = '${videoDuration}',
                                        IsActive = ${isActive},
                                        StartDate = '${date}',
                                        UpdatedBy = ${loggedInEmployeeId}, 
                                        UpdatedDate = CURRENT_TIMESTAMP,
                                        AppIndicatorId = '${appIndicatorId}';
                SELECT LAST_INSERT_ID() AS InsertedId;
    `;
    return await asyncDML({qry});
}

const getSeriesData = async() => {
    const qry = `SELECT SeriesId as value, SeriesName as label
                FROM videoseriesmaster 
                WHERE IsActive = 1
                ORDER BY SeriesName ASC;`;
    return await asyncDML({qry});
}

module.exports = {
    getVideoList,
    updateUserVideoStartTime,
    updateUserVideoIsLike,
    getVideoUserComment,
    saveVideoUserComment,
    getVideoMasterData,
    saveVideoData,
    getSeriesData
};
