import { Logger, ELoglevel, ETransportType } from "../node_modules/letslog/src/index";

interface IConfig {
    port: number;
    loglevel: string;
}

class RepositoryService {

    //#region variables
    private config: IConfig;
    private logger: Logger;
    //#endregion

    constructor(config: IConfig) {

        this.logger = new Logger({
            transports: [
                {
                    baseComment: "index.ts",
                    loglvl: ELoglevel[config.loglevel],
                    type: ETransportType.console,
                    showBaseComment: true,
                    showDate: true,
                    showLoglevel: true
                }
            ]
        });

        this.config = config;
    }

    /**
     * start
     */
    public start() {
        this.logger.info("Starting Service");
    }
}


let service: RepositoryService = new RepositoryService(require("./config.json"));
service.start();