import mysql from "mysql";
import appConfig from "./app-config";

// Create a connection to mySql Database
const connection = mysql.createPool({
    host: appConfig.mySqlHost,
    database: appConfig.mySqlDataBase,
    user: appConfig.mySqlUser,
    password: appConfig.mySqlPassword
});


// Execute any sql:
function execute( sql: string, values?: any[] ):Promise<any>{

    // Promisify:
    return new Promise((resolve, reject) => {

        // Execute sql qurey:
        connection.query(sql, values, ( err, result ) => {
            
            // If query faild:
            if( err ){
                reject(err);
            }

            // Query succesed:
            resolve(result);

        })
    });
}

export default {
    execute
}




