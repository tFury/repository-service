//#region import
import { IField,
         IDbConnection,
         ITableFieldDef,
         ITables }                  from "../lib/interfaces";
import { Pool,
         Client,
         PoolClient }               from "pg";
import { Logger,
         ETransportType,
         ELoglevel }                from "../../node_modules/letslog/src/index";
import * as errorCollection         from "../lib/error";
//#endregion

//#region CONST DEFINITION
const loglevel: string = process.env.NODE_LOGLEVEL;
//#endregion

export class PostgresProvider {

    private pool: Pool;
    private logger: Logger;

    constructor(config: IDbConnection) {
        console.log(config);

        this.logger = new Logger({
            transports: [
                {
                    baseComment: "postgresProvider.ts",
                    loglvl: ELoglevel[loglevel],
                    type: ETransportType.console,
                    showBaseComment: true,
                    showDate: true,
                    showLoglevel: true
                }
            ]
        });

        this.pool = new Pool({
            host: "localhost", // config.host,
            user: "postgres", // config.username,
            password: "mysecretpassword", // config.password,
            database: "test", // config.dbName,
            port: 5432, // config.port,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });
    }

    /**
     * getAllTableNames
     */
    public getAllTables(): Promise<ITables[]> {
        this.logger.info("fcn - getAllTableNames");
        return new Promise((resolve, reject) => {

            let sql: string = `
                select *
                from pg_tables
                where schemaname!='pg_catalog' and schemaname!='information_schema'
            `;

            let requestClient: PoolClient;

            this.pool.connect()
            .then((client) => {
                this.logger.trace("connected");
                requestClient = client;
                return client.query(sql);
            })
            .then((res) => {
                this.logger.trace("queried");
                requestClient.release();
                resolve(res.rows);
            })
            .catch((error) => {
                this.logger.error("ERROR in getAllTableNames", error);
                // requestClient.release();
                reject(error);
            });
        });
    }

}
