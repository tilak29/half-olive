const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../config.json");
const js2xml = require("js2xml").Js2Xml

/**
 * @author "Bhargav Bhagiya"
 */
const getEffectiveDateFilter = async () => {
    const qry = `SELECT DISTINCT EffectiveDate FROM MealTemplate WHERE CompanyId = ${CompanyId} AND DeletedBy IS NULL`
    return await asyncDML({ qry })
}

/**
 * @author "Bhargav Bhagiya"
 */
const getExistingDataOnEffeDateWise = async ({ effectiveDate, dayindex }) => {
    const qry = `getExistingDataOnEffeDateWise ${CompanyId},'${effectiveDate}',${dayindex} `
    return await asyncDML({ qry })
}

/**
 * @author "Bhargav Bhagiya"
 */
const getMealTemplateList = async ({ effectiveDate }) => {
    const qry = `getMealTemplateList '${effectiveDate}',${CompanyId}`
    return await asyncDML({ qry })
}

/**
 * @author "Bhargav Bhagiya"
 */
const getExistingMealData = async ({ mealTemplateId }) => {
    const qry = `getExistingMealData ${mealTemplateId},${CompanyId}`
    return await asyncDML({ qry })
}

/**
 * @author "Bhargav Bhagiya"
 */
const saveMealTemplateData = async ({ data, operationType }) => {
    var jsdata = JSON.parse(data);
    var qry = '';
    if (operationType == 0) {
        const AddMealData = jsdata.TemplateMealData;
        const AddMealDataXML = new js2xml("ArrayOfMealTemplateData", AddMealData);
        qry = `insertMealTemplateData ${CompanyId},'${jsdata.EffectiveDate}',${jsdata.dayindex},${jsdata.loggedInReferenceId},'${AddMealDataXML}'`
    }
    else if (operationType == 1) {
        const UpdateMealData = jsdata.TemplateMealData;
        const UpdateMealDataXML = new js2xml("ArrayOfUpdateMealTemplateData", UpdateMealData);
        qry = `updateMealTemplateData '${jsdata.EffectiveDate}',${jsdata.loggedInReferenceId},${jsdata.mealTemplateId},'${UpdateMealDataXML}'`
    }
    else if (operationType == 2) {
        qry = `DeleteMealTemplateData ${jsdata.mealTemplateId},${jsdata.loggedInReferenceId},${CompanyId}`
    }
    return await asyncDML({ qry })
}

const getMealEditDay = async () => {
    const qry = `SELECT dbo.FNGetConfigurationValueByCode('MealEditDay',GETDATE()) as MealEditDay`
    return await asyncDML({ qry });
}

module.exports = {
    getEffectiveDateFilter,
    getMealTemplateList,
    getExistingMealData,
    saveMealTemplateData,
    getMealEditDay,
    getExistingDataOnEffeDateWise
};
