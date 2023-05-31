const { asyncDML } = require("../../../dbutils");

const getTreatmentTemplateCategories = async () => {
  const qry = `SELECT TemplateName AS Label,
                      TreatmentTempleteId AS Value 
                      FROM TreatmentTempleteMaster
               WHERE DeletedBy IS NULL AND IsActive = 1 
                      ORDER BY TemplateName`;
  return await asyncDML({ qry });
};

const getTreatmentList = async ({ filterCategory }) => {
  const qry = `select TTM.TreatmentTempleteId,
                      TTT.TreatmentID,
                      TM.TreatmentName
                      from TreatmentTempleteMaster as TTM
                      join TreatmentTempleteTreatment as TTT on TTT.TreatmentTempleteId = TTM.TreatmentTempleteId
                      join Treatmentmaster as TM on TM.TreatmentID = TTT.TreatmentID
               WHERE TTM.DeletedBy IS NULL AND (${filterCategory} IS NULL OR TTM.TreatmentTempleteId = ${filterCategory})
                      ORDER BY TM.TreatmentName`;
  return await asyncDML({ qry });
};

const getDietList = async ({ filterCategory }) => {
  const qry = `select TTM.TreatmentTempleteId,
                      TTD.DietId,
                      DM.DietName 
                      from TreatmentTempleteMaster as TTM
                      join TreatmentTempleteDiet as TTD on TTD.TreatmentTempleteId = TTM.TreatmentTempleteId
                      join dietmaster as DM on DM.DietId = TTD.DietId
               WHERE TTM.DeletedBy IS NULL AND (${filterCategory} IS NULL OR TTM.TreatmentTempleteId = ${filterCategory})
                      ORDER BY DM.DietName`;
  return await asyncDML({ qry });
};

const insertDayWisePlanData = async ({ data }) => {
  
};

module.exports = {
  getTreatmentTemplateCategories,
  getTreatmentList,
  getDietList,
  insertDayWisePlanData
};
