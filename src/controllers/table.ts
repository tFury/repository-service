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
const loglevel: string = process.argv[2];
const dbConfig: IDbConnection = {
    host: process.argv[3],
    port: parseInt(process.argv[4], 10),
    dbName: process.argv[5],
    username: process.argv[6],
    password: process.argv[7]
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
    logger.info("Endpoint called: GET /table");

    postgresProvider.getAllTables()
    .then((tables) => {
        writeJson(res, {tables: tables}, 200);
    })
    .catch((error) => {
        writeJson(res, error, 400);
        logger.error("ERROR", error);
    });
}