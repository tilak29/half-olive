const mssql = require("mssql");

const config = require("./config.json");
// const { loggerInfo } = require("./logger.js");

//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root@123' Run query
//grant all privileges on pharmasolution.* to root@'localhost';

/**
 * @author "Arpankumar Patel"
 */

const pool = new mssql.ConnectionPool(config.db);

const asyncDML = async ({ qry }) => {
  return new Promise((resolve, reject) => {
    pool.connect(function(err){
      if (err) {
        const currentDateTime = new Date();
        console.log(`1 ${currentDateTime} :Logger DB Error : ${err}   Query:${qry}`);
        resolve(err);
      } else {
        /* Begin transaction */
        const transaction = new mssql.Transaction(pool);
        transaction.begin(function (err) {
          if (err) {
            const currentDateTime = new Date();
            console.log(`2 ${currentDateTime} :Logger DB Error : ${err}   Query:${qry}`);
            resolve(err);
          } else {
            let rolledBack = false
            // transaction.on('rollback', aborted => {
            //     rolledBack = true
            // })
            const request = new mssql.Request(transaction)
            request.query(qry,  async function (error, results={}) {
              if (error) {
                  if (!rolledBack) {
                      transaction.rollback(function () {
                  const currentDateTime = new Date();
                  console.log(`3 ${currentDateTime} :Logger DB Error : ${err}   Query:${qry}`);
                  resolve(error);
                });
                  }
              } else {
                 transaction.commit(function (err) {
                  if (err) {
                    transaction.rollback(function () {
                      const currentDateTime = new Date();
                      console.log(`4 ${currentDateTime} :Logger DB Error : ${err}   Query:${qry}`);
                      resolve(err);
                    });
                  } else {
                    if (!results) {
                      results = {};
                      results["isSuccess"] = false;
                    } else {
                      results["isSuccess"] = true;
                    }
                    resolve(results);
                  }
                });
              }
            });
          }
        });
        /* End transaction */
      }
      // if(connection)
      // connection.release();
    });
  });
};

// const asyncBulkDML = async ({ qry, value }) => {
//   return new Promise((resolve, reject) => {
//     pool.getConnection(function (err, connection) {
//       if (err) {
//         const currentDateTime = new Date();
//         console.log(`1 ${currentDateTime} :Logger DB Error : ${err}   Query:${qry}`);
//         resolve(err);
//       } else {
//         /* Begin transaction */
//         connection.beginTransaction(function (err) {
//           if (err) {
//             const currentDateTime = new Date();
//             console.log(`2 ${currentDateTime} :Logger DB Error : ${err}   Query:${qry}`);
//             resolve(err);
//           } else {
//             const sql = mysql.format(qry);
//             connection.query(sql, [value], async function (error, results) {
//               if (error) {
//                 connection.rollback(function () {
//                   const currentDateTime = new Date();
//                   console.log(`3 ${currentDateTime} :Logger DB Error : ${err}   Query:${qry}`);
//                   resolve(error);
//                 });
//               } else {
//                 connection.commit(function (err) {
//                   if (err) {
//                     connection.rollback(function () {
//                       const currentDateTime = new Date();
//                       console.log(`4 ${currentDateTime} :Logger DB Error : ${err}   Query:${qry}`);
//                       resolve(err);
//                     });
//                   } else {
//                     if (!results) {
//                       results = {};
//                       results["isSuccess"] = false;
//                     } else {
//                       results["isSuccess"] = true;
//                     }
//                     resolve(results);
//                   }
//                 });
//               }
//             });
//           }
//         });
//         /* End transaction */
//       }
//       if(connection)
//       connection.release();
//     });
//   });
// };
module.exports = { asyncDML };

// module.exports = { asyncDML, asyncBulkDML };
