
class ErrorDef {

    group: string;
    id: string;
    description: string;

    constructor(id: string, group: string, description?: string) {
        this.group = group;
        this.id = id;
        this.description = typeof(description)!== "undefined"? description: "Default Error";
    }

    /**
     * output
     */
    public output(): string {
        return `${this.id} - ${this.group} - ${this.description}`;
    }
}

let errorCollection = {
    rst0001: new ErrorDef("rst0001", "tablenameConflict", "insertet tablename comntains of more then one word"),
    rst0002: new ErrorDef("rst0002", "tablenameConflict", "inserted tablename should not be empty"),
    rst0003: new ErrorDef("rst0003", "tablenameConflict", "inserted tablename is to long"),
    rst0101: new ErrorDef("rst0101", "fieldConflict", "insertet fieldvalue comntains of more then one word"),
    rst0102: new ErrorDef("rst0102", "fieldConflict", "inserted fieldvalue should not be empty"),
    rst0103: new ErrorDef("rst0103", "fieldConflict", "inserted fieldvalue is to long")
};

export = errorCollection;