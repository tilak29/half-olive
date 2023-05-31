const { asyncDML } = require("../../../dbutils");
const { CompanyId } = require("../../../config.json");
const js2xml = require("js2xml").Js2Xml

/**
 * @author "Bhargav Bhagiya"
 */
const getEffectiveDate = async () => {
    const qry = `SELECT DISTINCT EffectiveDate FROM DateWiseMealTemplate  WHERE CompanyId = ${CompanyId} AND DeletedBy IS NULL`
    return await asyncDML({ qry })
}

/**
 * @author "Bhargav Bhagiya"
 */
const getDateWiseMealTemplateList = async ({ effectiveDate }) => {
    const qry = `getDateWiseMealTemplateList '${effectiveDate}',${CompanyId}`
    return await asyncDML({ qry })
}

/**
 * @author "Bhargav Bhagiya"
 */
const getExistingDateWiseMealTemplateList = async ({ effectiveDate }) => {
    const qry = `getExistingDateWiseMealTemplateList '${effectiveDate}',${CompanyId}`
    return await asyncDML({ qry })
}

/**
 * @author "Bhargav Bhagiya"
 */
const getDateWiseMealTemplateExistingData = async ({ effectiveDate, dayindex }) => {
    const qry = `getDateWiseMealTemplateExistingData ${CompanyId},'${effectiveDate}',${dayindex} `
    return await asyncDML({ qry })
}

/**
 * @author "Bhargav Bhagiya"
 */
const saveDateWiseMealTemplateData = async ({ data, operationType }) => {
    var jsdata = JSON.parse(data);
    var qry = '';
    if (operationType == 0) {
        const AddDateWiseMealData = jsdata.DateWiseMealTemplateData;
        const AddDateWiseMealDataXML = new js2xml("ArrayOfDateWiseMealTemplateData", AddDateWiseMealData);
        qry = `insertDateWiseMealTemplateData ${CompanyId},'${jsdata.EffectiveDate}',${jsdata.loggedInReferenceId},'${AddDateWiseMealDataXML}'`
    }
    else if (operationType == 1) {
        const UpdateDateWiseMealData = jsdata.DateWiseMealTemplateData;
        const UpdateDateWiseMealDataXML = new js2xml("ArrayOfUpdateDateWiseMealTemplateData", UpdateDateWiseMealData);
        qry = `updateDateWiseMealTemplateData '${jsdata.EffectiveDate}',${jsdata.loggedInReferenceId},${jsdata.dateWiseMealTemplateId},'${UpdateDateWiseMealDataXML}'`
    }
    else if (operationType == 2) {
        qry = `deleteDateWiseMealTemplateData ${jsdata.DateWiseMealTemplateId},${jsdata.loggedInReferenceId},${CompanyId}`
    }
    return await asyncDML({ qry })
}

module.exports = {
    getEffectiveDate,
    getDateWiseMealTemplateList,
    getExistingDateWiseMealTemplateList,
    getDateWiseMealTemplateExistingData,
    saveDateWiseMealTemplateData
};
