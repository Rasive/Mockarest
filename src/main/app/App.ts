import * as Express from "express";
import minimist = require("minimist");
import { Scenario } from "./domains/Scenario";
import { Log } from "./utils/Log";

export default class App {

    public express;
    public router: Express.Router;
    public scenario: Scenario;

    constructor(private readonly _port: number) {
        this.express = Express();
    }

    public run(): any {
        this.express.use((req, res, next) => {
            if (this.router) {
                this.router(req, res, next);
            } else {
                next();
            }
        });

        this.express.listen(this._port, () => {
            Log.verbose("Server started on port: " + this._port);
        });
    }

}
