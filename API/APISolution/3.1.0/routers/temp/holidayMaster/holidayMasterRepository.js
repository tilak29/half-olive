const { asyncDML } = require("../../../dbutils");
const { CompanyId, CountryId } = require("../../../Config.json");

/**
 * @author "Parth Suthar"
 */
const holidayGetData = async ({ stateId, year, noOfGroupShow }) => {
  const qry = `select *  from holidaymaster where (DeletedBy is null or DeletedBy='' )  and CompanyId=${CompanyId} and date_format(HolidayDate,'%Y')=${year} and StateId = ${stateId} ORDER by HolidayDate ${noOfGroupShow};`;
  return await asyncDML({ qry });
};

/**
 * @author "Parth Suthar"
 */
const holidaySaveData = async ({ data, operationType }) => {
  const qry = `SET @op_IsSuccess = 0;SET @op_Flag = 0; 
  CALL SaveHolidayMaster('${data}',${operationType},@op_IsSuccess, @op_Flag);SELECT @op_IsSuccess, @op_Flag;`;
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const holidayDownloadData = async ({}) => {
  const qry = `Select SM.StateId,SM.StateName,DATE_FORMAT(HM.HolidayDate,' %Y-%m-%d') as HolidayDate,HM.HolidayName,HM.Remarks from holidaymaster HM 
  JOIN statemaster SM on SM.stateId=HM.StateId and Year(HM.HolidayDate)=YEAR(CURDATE()) 
  where HM.DeletedBy is NULL or HM.DeletedBy='' order by SM.StateName,CAST(HM.HolidayDate as date);
  Select StateId,StateName from statemaster WHERE (DeletedBy is null or DeletedBy='') and CountryId = ${CountryId} and CompanyId=${CompanyId} Order by StateName; `;
  return await asyncDML({ qry });
};

/**
 * @author "Khushbu Shah"
 */
const holidayUploadData = async ({ data, loggedInEmployeeId }) => {
  const qry = `CALL SaveImportedHolidayData(${loggedInEmployeeId},'${JSON.stringify(
    data
  )}',@op_IsSuccess);
  SELECT @op_IsSuccess;`;
  return await asyncDML({ qry });
};

module.exports = {
  holidayGetData,
  holidaySaveData,
  holidayDownloadData,
  holidayUploadData
};
