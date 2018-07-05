//#region IMPORTS
import * as chai                from "chai";
import * as chaiHttp            from "../../node_modules/chai-http/index";
import { RepositoryService }    from "../../src/index";
//#endregion

let service = new RepositoryService(require("../config.json")).app;
chai.use(chaiHttp);

describe("TABLE", () => {

  const request = chai.request(service);

    /*
    * Test the /Connectiontest route
    */
    describe("/v1/table", () => {
        it("it should return success", (done) => {
            request.get("/v1/table")
            .end((err, res) => {
                console.log("RES", res.body);
                chai.expect(res).to.have.status(200);
                chai.expect(res.body.msg).to.equal("success");
                done();
            });
        });
    });
});