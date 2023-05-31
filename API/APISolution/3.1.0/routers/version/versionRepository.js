const { asyncDML } = require("../../../dbutils");
// const { CompanyId } = require("../../../Config.json");

/**
 * @author "Harsh Patel"
 */
const versionGetData = async ({ application, currentVersion, appVersion = ""}) => {
//   const searchtext = search ? `'${search}'` : null;
//   const orderBytext = orderBy ? `'${orderBy}'` : null;
//   const orderDir = orderDirection ? `'${orderDirection}'` : null;
  const qry = `CALL App_GetLatestVersionDetailByApplication ('${application}','${currentVersion}', '${appVersion}');`;
  return await asyncDML({ qry });
};

/**
 * @author "Aadilkhan"
 */
 const getApplicationPath = async (application) => {
    let linkcode = 'APPLICATION_DOWNLOAD_LINK';
    if(application==='SALES')
       linkcode = 'APPLICATION_UPDATE_LINK';

    const qry = `SELECT FNGetConfigurationValueByCode('${linkcode}', null) AS AppPath;`;
    return await asyncDML({ qry });
  };

/**
 * @author "Harsh Patel"
 */

module.exports = {
  versionGetData,
  getApplicationPath
};
