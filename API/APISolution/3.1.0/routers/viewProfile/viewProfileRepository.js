const { asyncDML } = require("../../../dbutils");

/**
 * @author "Parth Suthar"
 */
const viewProfileGetData = async ({ loggedInEmployeeId }) => {
  const qry = `select EM.EmployeeId,CONCAT(FirstName,' ',LastName) AS Name,MobileNumber,FatherName,Gender,DOB,DOA,Address,CM.CountryName,SM.StateName,CTM.CityName,EM.PinCode,
  EM.Email,DM.DesignationCode, GROUP_CONCAT(DVM.DivisionName) as DivisionName,EM.DOJ,EM.DOC,(SELECT CONCAT(FirstName,' ',LastName) from employeemaster where EmployeeId = EM.ManagerId) AS Manager
  from employeemaster EM 
  inner join countrymaster CM on CM.CountryId = EM.CountryId 
  inner join statemaster SM on SM.StateId = EM.StateId
  inner join citymaster CTM on CTM.CityId = EM.CityId 
  inner join designationmaster DM on DM.DesignationId = EM.DesignationId
  inner join divisionmaster DVM on JSON_CONTAINS(EM.DivisionId, CONVERT(DVM.DivisionId,CHAR)) = 1
  where EM.EmployeeId = ${loggedInEmployeeId}`;
  return await asyncDML({ qry });
};

/**
 * @author "Aadilkhan"
 */
const viewStockistProfileGetData = async ({ loggedInEmployeeId }) => {
  const qry = `select MobileNumber AS EmployeeId, SM.StockistName AS Name, MobileNumber,'' FatherName,-1 Gender,DOB,null DOA,Address,CM.CountryName,STM.StateName,CTM.CityName,SM.PinCode,
  SM.Email,DM.Description AS DesignationCode,null DivisionName,null DOJ,null DOC,'' AS Manager
  from stockistmaster SM 
  INNER JOIN staticdata SD ON SD.ParentId = 71 AND SD.MinValue = SM.IsSuperStockist
  inner join countrymaster CM on CM.CountryId = SM.Country
  inner join statemaster STM on STM.StateId = SM.State
  inner join citymaster CTM on CTM.CityId = SM.City
  inner join designationmaster DM on DM.DesignationId = SD.MaxValue
  where SM.StockistId = ${loggedInEmployeeId}`;
  return await asyncDML({ qry });
};

module.exports = {
  viewProfileGetData,
  viewStockistProfileGetData
};
