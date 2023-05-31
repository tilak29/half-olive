const { asyncDML } = require("../../../dbutils");
/**
 * @author "Vishal Thakkar"
 */
const dietPlanGetData = async ({ GuestId }) => {
  const qry = `select gd.GuestId,dm.DietName,d.DiseaseName,SplitValue as DiseaseId from guestHealthDetails gd 
    cross apply dbo.Split(gd.DiseaseId,',')
    JOIN dietmaster dm on dm.DiseaseId= SplitValue
    JOIN diseaseMaster d on d.DiseaseId= SplitValue
    WHERE dm.DeletedBy is null
    and gd.DeletedBy is null
    and dm.isActive=1
    and gd.GuestId=${GuestId}
    ORDER BY DiseaseName,DietName`;
  return await asyncDML({ qry });
};
/**
 * @author "Vishal Thakkar"
 */
const therapyPlanGetData = async ({ GuestId }) => {
  const qry = `select gd.GuestId,tm.TreatmentName,d.DiseaseName,SplitValue as DiseaseId from guestHealthDetails gd 
    cross apply dbo.Split(gd.DiseaseId,',')
    JOIN Treatmentmaster tm on tm.DiseaseId= SplitValue
    JOIN diseaseMaster d on d.DiseaseId= SplitValue
    WHERE tm.DeletedBy is null
    and gd.DeletedBy is null
    and tm.isActive=1
    and gd.GuestId=${GuestId}
    ORDER BY DiseaseName,TreatmentName`;
  return await asyncDML({ qry });
};

module.exports = {
  dietPlanGetData,
  therapyPlanGetData,
};
