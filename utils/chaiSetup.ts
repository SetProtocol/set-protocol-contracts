import * as chai from "chai";
import ChaiAsPromised = require("chai-as-promised");
import ChaiBigNumber = require("chai-bignumber");

export class ChaiSetup {
    private isConfigured: boolean;

    constructor() {
        this.isConfigured = false;
    }

    public configure() {
        if (this.isConfigured) {
            return;
        }

        chai.config.includeStack = true;
        chai.use(ChaiBigNumber());
        chai.use(ChaiAsPromised);
        this.isConfigured = true;
    }
}

export default new ChaiSetup();
