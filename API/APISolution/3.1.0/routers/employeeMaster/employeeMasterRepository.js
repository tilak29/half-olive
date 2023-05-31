const { asyncDML } = require("../../../dbutils");
const { EncryptionDecryptionKey, CompanyId } = require("../../../Config.json");

/**
 * @author "Khushbu Shah"
 */
const employeeGetData = async ({ stateId, condition, noOfGroupShow,status,divisionId,conditionDivision }) => {
  console.log("stateId :: ",stateId);
  const qry = `SELECT Distinct E.EmployeeId,E.MiddleName,E.FirstName,E.LastName,E.MiddleName as 'FatherName',E.DOB,E.DOA,E.Gender,
  '['+E.DivisionId+']' as 'DivisionId',
  --,(DI.DivisionName) as DivisionName,
  E.DesignationId,DE.DesignationCode,E.ManagerId
    ,E.CountryId,CM.CountryName,E.StateId,S.StateName,E.CityId,C.CityName,E.Address,E.PinCode,
    E.MobileNumber,E.Email,E.DOJ,E.DOC,E.DOR,E.DOL,E.FnFDate,E.ResignationReason,E.Status,E.Remarks,E.UpdatedDate
    ,CONCAT(E.FirstName, ' ', E.LastName, 
    ' (', DE.DesignationCode, ' | ',C.CityName, ' ', CONCAT(  STUFF(
      (
      SELECT ', '+ CONVERT(VARCHAR(MAX), DM.DivisionName)
      FROM divisionmaster DM
        WHERE DM.DivisionId IN (SELECT SplitValue FROM dbo.Split(2,','))
        FOR XML PATH(''),TYPE).value('.','NVARCHAR(MAX)'), 1, 2, ''
      ),' | ',  S.StateName,')')) as EmployeeName
    ,(SELECT CONCAT(FirstName,' ',LastName) FROM employeemaster WHERE EmployeeId = E.ManagerId) AS ManagerName
    ,0 'RefId' -- ED.RefId
  
      FROM employeemaster E
      -- LEFT JOIN employeedetails ED ON ED.EmployeeId = E.EmployeeId
      JOIN countrymaster CM on CM.CountryId=E.CountryId
      JOIN statemaster S on S.StateId=E.StateId
      JOIN citymaster C on C.CityId=E.CityId
      JOIN designationmaster DE on DE.DesignationId=E.DesignationId
      JOIN divisionmaster DI on DI.DivisionId in (select convert(int,splitvalue) from dbo.Split(E.DivisionId,','))
      WHERE E.DeletedBy is null
      AND E.IsActive = 1
      -- AND ED.DeletedBy IS NULL
      and (null IS NULL OR E.StateId = null) ${condition} and E.Status=${status}
      and E.CompanyId=1
      --GROUP BY E.EmployeeId
      ORDER BY E.FirstName`;
    //console.log("qryyy :: ",qry);
  return await asyncDML({ qry });
};
// const employeeGetData = async ({ stateId, condition, noOfGroupShow }) => {
//   const qry = `SELECT E.EmployeeId,E.MiddleName,E.FirstName,E.LastName,E.MiddleName as 'FatherName',E.DOB,E.DOA,E.Gender,'['+E.DivisionId+']' as 'DivisionId',(DI.DivisionName) as DivisionName,E.DesignationId,DE.DesignationCode,E.ManagerId
//   ,E.CountryId,CM.CountryName,E.StateId,S.StateName,E.CityId,C.CityName,E.Address,E.PinCode,E.MobileNumber,E.Email,E.DOJ,E.DOC,E.DOR,E.DOL,E.FnFDate,E.ResignationReason,E.Status,E.Remarks,E.UpdatedDate
//   ,CONCAT(E.FirstName, ' ', E.LastName, ' (', DE.DesignationCode, ' | ',C.CityName, ' | ', CONCAT(DI.DivisionName,' | ',  S.StateName,')')) as EmployeeName	 
//   ,(SELECT CONCAT(FirstName,' ',LastName) FROM employeemaster WHERE EmployeeId = E.ManagerId) AS ManagerName
//   ,0 'RefId' -- ED.RefId
//     FROM employeemaster E
//     -- LEFT JOIN employeedetails ED ON ED.EmployeeId = E.EmployeeId
//     JOIN countrymaster CM on CM.CountryId=E.CountryId
//     JOIN statemaster S on S.StateId=E.StateId
//     JOIN citymaster C on C.CityId=E.CityId
//     JOIN designationmaster DE on DE.DesignationId=E.DesignationId
//     JOIN divisionmaster DI on DI.DivisionId in (select splitvalue from dbo.Split(E.DivisionId,','))
//     WHERE E.DeletedBy is null 
//     AND E.IsActive = 1
//     -- AND ED.DeletedBy IS NULL
//     and (${stateId} IS NULL OR E.StateId = ${stateId})  ${condition} 
//     and E.CompanyId=${CompanyId} 
//     -- GROUP BY E.EmployeeId
//     ORDER BY E.FirstName ${noOfGroupShow}`;
//     console.log("qryyy :: ",qry);
//   return await asyncDML({ qry });
// };

/**
 * @author "Khushbu Shah"
 */
const employeeSaveData = async ({ data, operationType }) => {
  console.log(data);
  var jsdata = JSON.parse(data);
  var doa = jsdata.doa ? jsdata.doa : null;
  var doc = jsdata.doc ? jsdata.doc : null;
  var qry = '';
  if (operationType == 0) {
    qry = `INSERT INTO [dbo].[employeemaster]
           ([CompanyId],[DesignationId],[ManagerId],[FirstName],[LastName],[DOB],[DOA],[MiddleName],[Gender]
            ,[DivisionId],[Address],[CountryId],[CityId],[StateId],[MobileNumber],[Pincode],[Email],[WeeklyOff],[DOJ],[DOC]
            ,[Status],[ReportingPeriod],[Remarks],[IsActive],[IsFirstTimePasswordChanged],[CreatedBy],[CreatedDate])
           VALUES(${CompanyId},${jsdata.designationId},${jsdata.managerId},'${jsdata.firstName}','${jsdata.lastName}','${jsdata.dob}',${doa},'${jsdata.fatherName}',${jsdata.gender}
           ,replace(replace('${jsdata.divisionId}','[',''),']',''),'${jsdata.address}',${jsdata.countryId},${jsdata.cityId},${jsdata.stateId},'${jsdata.mobileNumber}','${jsdata.pinCode}','${jsdata.email}',replace(replace('${jsdata.weeklyOff}','[',''),']',''),'${jsdata.doj}',${doc}
           ,${jsdata.status},${jsdata.reportingPeriod},'${jsdata.remarks}',1,${jsdata.isFirstTimePasswordChanged},'${jsdata.loggedInReferenceId}',GETDATE())`;
  }
  else if (operationType == 1) {
    qry = `
    UPDATE [dbo].[employeemaster]
       SET [CompanyId] = ${CompanyId}
          ,[DesignationId] = ${jsdata.designationId}
          ,[ManagerId] = ${jsdata.managerId}
          ,[FirstName] = '${jsdata.firstName}'
          ,[LastName] = '${jsdata.lastName}'
          ,[DOB] = '${jsdata.dob}'
          ,[DOA] = ${doa}
          ,[MiddleName] = '${jsdata.fatherName}'
          ,[Gender] = ${jsdata.gender}
          ,[DivisionId] = replace(replace('${jsdata.divisionId}','[',''),']','')
          ,[Address] = '${jsdata.address}'
          ,[CountryId] = ${jsdata.countryId}
          ,[CityId] = ${jsdata.cityId}
          ,[StateId] = ${jsdata.stateId}
          ,[MobileNumber] = '${jsdata.mobileNumber}'
          ,[Pincode] = '${jsdata.pinCode}'
          ,[Email] = '${jsdata.email}'
          ,[DOJ] = '${jsdata.doj}'
          ,[DOC] = ${doc}
          ,[DOR] = (CASE WHEN ${jsdata.dor} IS NULL THEN NULL ELSE '${jsdata.dor}' END)
          ,[ResignationReason] = '${jsdata.resignationReason}'
          ,[DOL] = (CASE WHEN ${jsdata.dol} IS NULL THEN NULL ELSE '${jsdata.dol}' END)
          ,[FnFDate] = (CASE WHEN ${jsdata.fnFDate} IS NULL THEN NULL ELSE '${jsdata.fnFDate}' END)
          ,[Status] = ${jsdata.status}
          -- ,[ReportingPeriod] = ${jsdata.reportingPeriod}      
          ,[Remarks] = '${jsdata.remarks}'
          -- ,[IsActive] = '${jsdata.isActive}'      
          ,[UpdatedBy] = ${jsdata.loggedInReferenceId}      
          ,[UpdatedDate] = GETDATE()
     WHERE EmployeeId = ${jsdata.employeeId}`;
  }
  // const qry = `INSERT INTO [dbo].[TestingDetail]([Value],[createddate])
  //               VALUES('${jsdata.firstName}',GETDATE())`;




  // const qry = `SET @op_IsSuccess = 0;SET @op_Flag = 0; 
  // CALL SaveEmployeeMaster('${data}','${EncryptionDecryptionKey}',${operationType},@op_IsSuccess, @op_Flag);
  // SELECT @op_IsSuccess, @op_Flag;`;
  return await asyncDML({ qry });
};

/**
 * @author "Aadilkhan"
 */
const mobileOwnerNameGetData = async ({ mobileNumber }) => {
  const qry = `SET @Name = FNGetMobileOwnerName(${mobileNumber});
  SELECT @Name;`;
  return await asyncDML({ qry });
};

/**
 * @author "Dileep Lohar"
 */
const SingleEmployeeData = async ({loggedInReferenceId}) => {
  //console.log("loggedInReferenceId :: ",loggedInReferenceId);
  const qry = `select EmployeeId,WeeklyOff from employeemaster where EmployeeId = ${loggedInReferenceId} and DeletedBy is null and DeletedDate is null and IsActive = 1`;
  //console.log("qryyy :: ",qry);
  return await asyncDML({ qry });
};


module.exports = {
  employeeGetData,
  employeeSaveData,
  mobileOwnerNameGetData,
  SingleEmployeeData
};
