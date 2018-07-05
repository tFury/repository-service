//#region IMPORTS
import { writeJson,
         respondWithCode }          from "../lib/write";
import { Logger,
         ETransportType,
         ELoglevel }                from "../../node_modules/letslog/src/index";
import { Swagger20Request,
         Swagger20Response }        from "swagger-tools";
//#endregion

//#region CONST DEFINITION
const loglevel: string = process.env.NODE_LOGLEVEL;
const logger = new Logger({
    transports: [
        {
            baseComment: "index.ts",
            loglvl: ELoglevel[loglevel],
            type: ETransportType.console,
            showBaseComment: true,
            showDate: true,
            showLoglevel: true
        }
    ]
});
//#endregion

export function connectiontest (req: Swagger20Request<any>, res: Swagger20Response) {
    logger.info("Endpoint called: GET /connectiontest");

    writeJson(res, respondWithCode(200, {msg:"success"}));
}