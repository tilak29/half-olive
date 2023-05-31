const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");

/**
 * @author "Parth Suthar"
 */
const deviceConfigurationGetData = async ({ stateId, divisionId }) => {
  const qry = `select DC.DeviceConfigId,CONCAT(EM.FirstName,' ',EM.LastName,'(', DM.DesignationCode,' | ',CM.CityName, ' | ',GROUP_CONCAT(DVM.DivisionName),' | ',SM.StateName,')') AS Employee,DC.MobileNumber,DC.MobileModal,DC.OSVersion,DC.FakeGPS,DC.AppVersion,DC.ChangeDevice,DC.UpdatedBy,DC.UpdatedDate
  from deviceconfigurationmaster DC
  inner join employeemaster EM on EM.EmployeeId = DC.EmployeeId
  inner join designationmaster DM ON DM.DesignationId = EM.DesignationId
  inner join citymaster CM ON CM.CityId = EM.CityId
  inner join divisionmaster DVM ON JSON_CONTAINS(EM.DivisionId,CONVERT(DVM.DivisionId,CHAR)) = 1
  inner join statemaster SM ON EM.StateId = SM.StateId
  where EM.StateId = ${stateId} 
  AND JSON_CONTAINS(EM.DivisionId,'${divisionId}') = 1 
  AND DC.DeletedBy IS NULL 
  GROUP BY DC.DeviceConfigId
  ORDER BY CONCAT(EM.FirstName,' ',EM.LastName) `;
  return await asyncDML({ qry });
};

/**
 * @author "Parth Suthar"
 */
const deviceConfigurationInsertData = async ({
  deviceId,
  appVersion,
  changeDevice,
  fakeGPS,
  mobileModal,
  mobileNumber,
  osVersion
}) => {
  const qry = `SELECT ReportingPeriod,EmployeeId FROM employeemaster where MobileNumber = '${mobileNumber}'`;
  const result = await asyncDML({ qry });
  if (result[0] && result[0].ReportingPeriod >= 1) {
    const loggedInEmployeeId = result[0].EmployeeId;
    const qry = `SELECT DeviceConfigId,DeviceId,ChangeDevice FROM deviceconfigurationmaster WHERE MobileNumber='${mobileNumber}' AND DeletedBy IS NULL`;
    const deviceRes = await asyncDML({ qry });
    if (deviceRes.length === 0) {
      const qry = `INSERT INTO deviceconfigurationmaster(CompanyId,EmployeeId,DeviceId,MobileModal,OSVersion,FakeGPS,MobileNumber,AppVersion,ChangeDevice,CreatedBy,CreatedDate)
            VALUES (${CompanyId},${loggedInEmployeeId},'${deviceId}','${mobileModal}','${osVersion}','${fakeGPS}','${mobileNumber}','${appVersion}',${changeDevice},${loggedInEmployeeId},CURRENT_TIMESTAMP)`;
      return await asyncDML({ qry });
    } else if (
      (
        deviceRes[0].DeviceId !== deviceId &&
        deviceRes[0].ChangeDevice === 1
      )
      || 
      (
        deviceRes[0].AppVersion !== appVersion &&
        deviceRes[0].DeviceId === deviceId
      )
    ) {
      const qry = `UPDATE deviceconfigurationmaster SET CompanyId = ${CompanyId},DeviceId='${deviceId}',MobileModal='${mobileModal}',OSVersion='${osVersion}',FakeGPS=${fakeGPS},AppVersion='${appVersion}',ChangeDevice=0 WHERE MobileNumber= '${mobileNumber}'`;
      return await asyncDML({ qry });
    } else if (deviceRes[0].DeviceId !== deviceId) {
      return {
        isSuccess: false,
        flag: "ContactAdmin"
      };
    } else {
      return {
        isSuccess: true
      };
    }
  } else if (result[0] && result[0].ReportingPeriod === 0) {
    return {
      isSuccess: false,
      flag: "applicationBlock"
    };
  } else {
    return {
      isSuccess: false
    };
  }
};

const deviceConfigurationUpdateData = async ({
  changeDevice,
  updatedDate,
  deviceConfigId,
  loggedInEmployeeId
}) => {
  const qry = `SELECT UpdatedDate FROM deviceconfigurationmaster WHERE DeviceConfigId=${deviceConfigId} AND DeletedBy IS NULL`;
  const result = await asyncDML({ qry });
  if (updatedDate === null) {
    const qry = `UPDATE deviceconfigurationmaster SET ChangeDevice= ${changeDevice},UpdatedBy=${loggedInEmployeeId},UpdatedDate=CURRENT_TIMESTAMP WHERE DeviceConfigId = ${deviceConfigId}`;
    return await asyncDML({ qry });
  } else if (updatedDate !== result[0].UpdatedDate) {
    return { isSuccess: false, flag: "Concurrency" };
  } else {
    const qry = `UPDATE deviceconfigurationmaster SET ChangeDevice= ${changeDevice},UpdatedBy=${loggedInEmployeeId},UpdatedDate=CURRENT_TIMESTAMP WHERE DeviceConfigId = ${deviceConfigId}`;
    return await asyncDML({ qry });
  }
};
module.exports = {
  deviceConfigurationInsertData,
  deviceConfigurationUpdateData,
  deviceConfigurationGetData
};
