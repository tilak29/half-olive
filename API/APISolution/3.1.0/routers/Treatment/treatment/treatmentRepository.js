const { asyncDML } = require("../../../../dbutils");
const { CompanyId } = require("../../../../config.json");
const js2xml = require("js2xml").Js2Xml
/**
 * @author "Bhargav Bhagiya"
 */
const getDayWiseDate = async ({ BookingId, BookingStatus }) => {
    const qry = `getDayWiseDate ${BookingId},${BookingStatus},${CompanyId}`
    return await asyncDML({ qry })
}

const getMorningTherapy = async () => {
    const qry = `getMorningTherapy ${CompanyId}`
    return await asyncDML({ qry })
}

const getDefaultTherapy = async () => {
    const qry = `getDefaultTherapy ${CompanyId}`
    return await asyncDML({ qry })
}
const getAdditionalTherapy = async () => {
    const qry = `getAdditionalTherapy ${CompanyId}`
    return await asyncDML({ qry })
}

const getDietPlanName = async () => {
    const qry = `getDietPlanName ${CompanyId}`
    return await asyncDML({ qry })
}

const getExistingRecord = async ({ GuestId, BookingId, Date }) => {
    const qry = `getExistingRecordOfTreatment ${GuestId},${BookingId},'${Date}',${CompanyId}`
    return await asyncDML({ qry })
}
/**
 * @author "Bhargav Bhagiya"
 */
const saveTreatmentSectionDetails = async ({ data, operationType }) => {
    var jsdata = JSON.parse(data);
    var qry = '';
    if (operationType == 0) {
        const data = jsdata.MealData;
        const convertJS2XML = new js2xml("ArrayOfMealTypeData", data);
        qry = `saveTreatmentSectionDetails ${CompanyId},${jsdata.GuestId},${jsdata.BookingId},'${jsdata.Date}',
                ${jsdata.loggedInReferenceId},'${jsdata.MorningTherapy}','${jsdata.EveningTherapy}',
                '${jsdata.DefaultTherapy}','${jsdata.AdditionalTherapy}','${jsdata.dietId}','${jsdata.AvoidedItems}',
                '${jsdata.Remarks}','${convertJS2XML}'`;
    }
    return await asyncDML({ qry });
};

const getMealTypeName = async () => {
    const qry = `SELECT StaticName AS Label,StaticId AS Value FROM staticdata WHERE ParentId=147 AND IsActive = 1 AND CompanyId=${CompanyId} AND DeletedBy IS NULL`
    return await asyncDML({ qry })
}

module.exports = {
    getDayWiseDate,
    getMorningTherapy,
    getDefaultTherapy,
    getAdditionalTherapy,
    getDietPlanName,
    getExistingRecord,
    saveTreatmentSectionDetails,
    getMealTypeName
};