//#region
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
//#endregion

describe("PSEUDOCHECK", () => {

    describe("test something", () => {
        it("should return 2", (done) => {
            chai.expect(2).to.equal(2);
            done();
        });
    });

});