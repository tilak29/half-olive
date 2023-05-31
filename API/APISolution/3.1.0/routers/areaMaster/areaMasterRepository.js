const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../Config.json");

/**
 * @author "Parth Suthar,Khushbu Shah"
 * @description "City fo chemist count"
 */
const areaGetData = async ({ cityId }) => {
  const qry = `SELECT AM.*,TC.TotalChemist
  FROM areamaster AM  
  LEFT JOIN (
    SELECT CM.AreaId, COUNT(1) AS TotalChemist
    FROM chemistmaster CM 
    WHERE CM.CityId = ${cityId}
    AND CM.DeletedBy IS NULL 
    AND CM.IsActive = 1
    GROUP BY CM.AreaId
  ) AS TC ON TC.AreaId = AM.AreaId
  WHERE AM.DeletedBy is null
  and AM.CityId = ${cityId}
  and AM.CompanyId=${CompanyId}`;
  return await asyncDML({ qry });
};

/**
 * @author "Parth Suthar"
 */
const areaSaveData = async ({ data, operationType }) => {
  const qry = `SET @op_IsSuccess = 0;SET @op_Flag = 0; 
  CALL SaveAreaMaster('${data}',${operationType},@op_IsSuccess, @op_Flag);SELECT @op_IsSuccess, @op_Flag;`;
  return await asyncDML({ qry });
};

module.exports = {
  areaGetData,
  areaSaveData
};
