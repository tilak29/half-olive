const { asyncDML } = require("../../../../dbutils");
const { CompanyId } = require("../../../../Config.json");

/**
 * @author "Khushbu Shah"
 */
const getLookupData = async ({schemeId = null,divisionId = null}) => {
  const qry = `SET @IsScanBox = EXISTS (select 1 from schememaster where schemeid = ${schemeId} AND UOM = 97); -- 97: Box Scan scheme UOM
              select ItemId AS value,Brand AS label 
              FROM itemmaster im 
              WHERE not exists (SELECT 1 FROM schemewiseitem swi 
                                INNER JOIN schememaster SM ON swi.schemeId = SM.SchemeId
                                WHERE im.itemid = swi.itemid 
                                and swi.deletedby is null 
                                AND (
                                    ${schemeId} IS NULL
                                    OR (@IsScanBox = 0 AND SM.UOM != 97)
                                    OR (@IsScanBox = 1 AND swi.SchemeId = ${schemeId}))
                                ) 
              AND im.IsActive=1 
              AND im.DeletedBy is null 
              AND CompanyId =${CompanyId}
              AND ('${divisionId}' IS NULL OR JSON_CONTAINS('${divisionId}', CONVERT(im.divisionId,CHAR)) = 1) 
              ORDER BY Brand;`;
  return await asyncDML({ qry });
};

module.exports = {
  getLookupData
};
