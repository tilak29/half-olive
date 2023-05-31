const { asyncDML } = require("../../../dbutils");
const { EncryptionDecryptionKey, CompanyId } = require("../../../Config.json");
/**
 * @author "Imran Patwa"
 */

const guestGetData = async ({ stateId }) => {
  stateId = stateId ? stateId : null;
  const qry = `SELECT E.GuestId,E.FirstName,E.LastName,E.MiddleName as 'MiddleName',E.DOB,E.Gender,E.CountryId,CM.CountryName,E.StateId,S.StateName,E.CityId,C.CityName,E.Address,E.PinCode,E.MobileNumber,E.Email,E.Remarks,E.UpdatedDate
  ,CONCAT(E.FirstName, ' ', E.LastName, ' (', C.CityName, ' | ', S.StateName,')') as GuestName,
  E.Profession,E.MaritalStatus,E.AadharNo,
  (CASE WHEN E.Gender = 1 THEN 'Male' Else 'Female' END) 'GenderName'	 
    FROM guestdetails E
    JOIN countrymaster CM on CM.CountryId=E.CountryId
    JOIN statemaster S on S.StateId=E.StateId
    JOIN citymaster C on C.CityId=E.CityId
    WHERE E.DeletedBy is null   
    and (${stateId} IS NULL OR E.StateId = ${stateId})
    ORDER BY E.FirstName`;
  // console.log(qry);
  return await asyncDML({ qry });
};

/**
 * @author "Imran Patwa"
 */
const guestSaveData = async ({ data, operationType }) => {
  var jsdata = JSON.parse(data);
  var qry = '';
  if (operationType == 0) {
    let pincode = (jsdata.pinCode== undefined || jsdata.pinCode=="")?"NULL":jsdata.pinCode;
    let email = (jsdata.email== undefined || jsdata.email=="")?"NULL":jsdata.email;
    let remarks = (jsdata.remarks == undefined || jsdata.remarks=="")?"NULL":jsdata.remarks;
    let aadharNo = (jsdata.aadharNo == undefined || jsdata.aadharNo=="")?"NULL":jsdata.aadharNo;
    let profession = (jsdata.profession == undefined || jsdata.profession=="")?"NULL":jsdata.profession;
    let address = (jsdata.address == undefined || jsdata.address=="")?"NULL":jsdata.address;
    qry = `
    INSERT INTO [dbo].[guestdetails]
           ([FirstName]
           ,[LastName]
           ,[DOB]
           ,[MiddleName]
           ,[Kyc]
           ,[Gender]
           ,[Address]
           ,[CountryId]
           ,[CityId]
           ,[StateId]
           ,[MobileNumber]
           ,[Pincode]
           ,[Email]
           ,[Remarks]
           ,[IsActive]
           ,[AadharNo]
           ,[AadharAttachment]
           ,[Profession]
           ,[MaritalStatus]
           ,[CreatedBy]
           ,[CreatedDate])
     VALUES
           ('${jsdata.firstName}','${jsdata.lastName}','${jsdata.dob}','${jsdata.middleName}','${jsdata.file}',
           ${jsdata.gender},'${address}',${jsdata.countryId},${jsdata.cityId},${jsdata.stateId},
           '${jsdata.mobileNumber}','${pincode}','${email}','${remarks}',1,'${aadharNo}',
           'NULL','${profession}',${jsdata.maritalStatus},${jsdata.loggedInUserId},GETDATE())`;
  }
  else if (operationType == 1) {

    qry = `
    UPDATE [dbo].[guestdetails]
       SET [FirstName] = '${jsdata.firstName}'
          ,[LastName] = '${jsdata.lastName}'
          ,[DOB] = '${jsdata.dob}'
          ,[MiddleName] = '${jsdata.middleName}'
          ,[Kyc] = '${jsdata.file}'
          ,[Gender] = ${jsdata.gender}
          ,[Address] = '${jsdata.address}'
          ,[CountryId] = ${jsdata.countryId}
          ,[CityId] = ${jsdata.cityId}
          ,[StateId] = ${jsdata.stateId}
          ,[MobileNumber] = '${jsdata.mobileNumber}'
          ,[Pincode] = '${jsdata.pinCode}'
          ,[Email] = '${jsdata.email}'
          ,[Remarks] = '${jsdata.remarks}'
          ,[MaritalStatus] = ${jsdata.maritalStatus}
          ,[Profession] = '${jsdata.profession}'
          ,[AadharNo] = ${jsdata.aadharNo}
          -- ,[IsActive] = '${jsdata.isActive}'      
          ,[UpdatedBy] = ${jsdata.loggedInReferenceId}      
          ,[UpdatedDate] = GETDATE()
     WHERE GuestId = ${jsdata.guestId}`;
  }
  // const qry = `INSERT INTO [dbo].[TestingDetail]([Value],[createddate])
  //               VALUES('${jsdata.firstName}',GETDATE())`;




  // const qry = `SET @op_IsSuccess = 0;SET @op_Flag = 0; 
  // CALL SaveEmployeeMaster('${data}','${EncryptionDecryptionKey}',${operationType},@op_IsSuccess, @op_Flag);
  // SELECT @op_IsSuccess, @op_Flag;`;
  return await asyncDML({ qry });
};
const latestGuestId = async () => {
  const qry = `select top(1)GuestId from guestdetails where DeletedBy is null order by GuestId desc`;
  return await asyncDML({ qry });
}
const getFiles = async ({guestId}) => {
  const qry = `select distinct
  STUFF(
  (
  select ',' + CONVERT(VARCHAR(MAX),concat ('http://localhost:789/uploaded_data/guest/${guestId}/',SplitValue)) from
  guestdetails cross apply dbo.Split(kyc,',') where GuestId=${guestId} and DeletedBy is null and kyc is not null
  for xml path('')
  ),1,1,'')data from guestdetails`;
  return await asyncDML({ qry });
}


module.exports = {
  guestGetData,
  guestSaveData,
  latestGuestId,
  getFiles
};
