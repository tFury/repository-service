//#region IMPORTS
import * as chai                from "chai";
import * as chaiHttp            from "../../node_modules/chai-http/index";
import { RepositoryService }    from "../../src/index";
//#endregion


let service = new RepositoryService(require("../config.json")).app;
chai.use(chaiHttp);

describe("CONNECTIONTEST", () => {

  const request = chai.request(service);

    /*
    * Test the /Connectiontest route
    */
    describe("/v1/connectiontest", () => {
        it("it should return success", (done) => {
            request.get("/v1/connectiontest")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body.msg).to.equal("success");
                done();
            });
        });
    });
});