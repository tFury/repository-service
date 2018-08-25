//#region IMPORTS
import * as express                 from "express";
import * as cors                    from "cors";

import { safeLoad }                 from "js-yaml";
import { readFileSync }             from "fs";
import { join }                     from "path";
import { IConfig }                  from "./lib/interfaces";
import { Server }                   from "http";

import { Logger,
         ELoglevel,
         ETransportType }           from "../node_modules/letslog/src/index";
import { SwaggerRouter20Options,
         initializeMiddleware }     from "swagger-tools";
import { urlencoded,
         json }                     from "body-parser";
//#endregion

export class RepositoryService {

    //#region variables
    private config: IConfig;
    private server: Server;
    private logger: Logger;
    private swaggerDoc: object;
    private swaggerRouterOptions: SwaggerRouter20Options;

    public app: express.Express;
    //#endregion

    constructor(config: IConfig) {
        this.config = config;

        let loglevel: string = process.env.NODE_LOGLEVEL;
        this.logger = new Logger({
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
        this.logger.info("server is starting");

        let swaggerYaml = readFileSync(join(__dirname,"api/swagger.yaml"), "utf8");
        this.swaggerDoc = safeLoad(swaggerYaml);

        this.swaggerRouterOptions = {
            controllers: join(__dirname, "./controllers"),
            useStubs: process.env.NODE_ENV === "development" ? true : false
        };

        this.app = express();
        this.app.use(cors());
        this.app.use(urlencoded({extended: false}));
        this.app.use(json());

        initializeMiddleware(this.swaggerDoc, (middleware) => {
            this.app.use(middleware.swaggerMetadata());
            this.app.use(middleware.swaggerValidator());
            this.app.use(middleware.swaggerRouter(this.swaggerRouterOptions));
            this.app.use(middleware.swaggerUi());
        });

    }

    /**
     * start
     */
    public start() {
        this.server = this.app.listen(this.config.port);
        this.logger.info("server listen on port: ", this.config.port);
    }
}


let service: RepositoryService = new RepositoryService(require("./config.json"));
service.start();
