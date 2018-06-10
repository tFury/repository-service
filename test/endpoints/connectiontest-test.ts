//#region IMPORTS
import * as chai from "chai";
import * as chaiHttp from "../../node_modules/chai-http/index";
import { RepositoryService } from "../../src/index";


let service = new RepositoryService(require("../config.json")).app;
let should = chai.should();

chai.use(chaiHttp);
describe("connectiontest", () => {

    /*
    * Test the /Connectiontest route
    */
    describe("/v1/connectiontest", () => {
      it("it should return success", (done) => {
        chai.request(service)
            .get("/v1/connectiontest")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body.msg).to.equal("success");
              done();
            });
      });
  });

});