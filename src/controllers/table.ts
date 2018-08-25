//#region IMPORTS
import { writeJson,
         respondWithCode }          from "../lib/write";
import { IDbConnection }                  from "../lib/interfaces";
import { Logger,
         ETransportType,
         ELoglevel }                from "../../node_modules/letslog/src/index";
import { Swagger20Request,
         Swagger20Response }        from "swagger-tools";
//#endregion

//#region CONST DEFINITION
const loglevel: string = process.env.NODE_LOGLEVEL;
let host = process.env.NODE_HOST;
let port = process.env.NODE_PORT;
let dbName = process.env.NODE_DBNAME;
let username = process.env.NODE_USERNAME;
let password = process.env.NODE_PASSWORD;

console.log("host", host);
console.log("port", port);
console.log("dbName", dbName);
console.log("username", username);
console.log("password", password);


const dbConfig: IDbConnection = {
    host: host?host:"localhost",
    port: port?parseInt(port, 10):5432,
    dbName: dbName?dbName:"test",
    username: username?username:"postgres",
    password: password?password:"mysecretpassword"
};
const logger = new Logger({
    transports: [
        {
            baseComment: "tables.ts",
            loglvl: ELoglevel[loglevel],
            type: ETransportType.console,
            showBaseComment: true,
            showDate: true,
            showLoglevel: true
        }
    ]
});
//#endregion

import { PostgresProvider } from "../lib/postgresProvider";

const postgresProvider = new PostgresProvider(dbConfig);


export function showAllTables(req: Swagger20Request<any>, res: Swagger20Response) {
    logger.info("Endpoint called: GET /table", dbConfig);

    postgresProvider.getAllTables()
    .then((tables) => {
        let responseObject = {
            success: true,
            data: tables
        };
        writeJson(res, responseObject, 200);
    })
    .catch((error) => {
        writeJson(res, error, 400);
        logger.error("ERROR in showAllTables", error);
    });
}