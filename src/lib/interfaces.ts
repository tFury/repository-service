export interface IConfig {
    port: number;
}

/**
 * definition of the server response
 */
export interface IPayload<T> {
    /**
     * message for the description
     */
    msg: string;

    /**
     * shows if target opperation was succesfull
     */
    success: boolean;

    /**
     * variable date to be returned
     */
    data: T;
}

/**
 * definition of the connections which can be added to the service
 */
export interface IDbConnection {

    /**
     * username for the login; optionale
     */
    username: string;

    /**
     * password for the login; optionale
     */
    password: string;

    /**
     * hostname for the source; optionale
     */
    host: string;

    /**
     * port over which the connection will be established; optionale
     */
    port: number;

    /**
     * name of the db; optionale
     */
    dbName: string;
}

/**
 * definition of a fild from database tables
 */
export interface IField {
    /**
     * name of the field
     */
    fieldName: string;

    /**
     * datatype of the field
     */
    content: string;
}

/**
 * Definition of a field fromo a table with type
 */
export interface ITableFieldDef {

    /**
     * name of the field
     */
    fieldname: string;

    /**
     * type of the filed
     */
    fieldtype: string;
}

export interface ITables {
    schemaname: string;
    tablename: string;
    tableowner: string;
    tablespace: string;
    hasindexes: boolean;
    hasrules: boolean;
    hastriggers: boolean;
    rowsecurity: boolean;
}