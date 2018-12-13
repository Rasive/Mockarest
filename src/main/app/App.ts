import * as Express from "express";
import { Router } from "express";
import { Observable, Subject } from "rxjs";
import { Scenario } from "./domains/Scenario";
import { Log } from "./utils/Log";

export default class App {

    constructor(
        public readonly port: number,
        public readonly app: Express.Application,
        public readonly activeRouterSubject: Subject<Router>) {
        this.activeRouterSubject.subscribe((router) => {
            this._activeRouter = router;
        });
    }

    private _activeRouter: Express.Router;

    public scenario: Scenario;

    public run(): any {
        this.app.use((req, res, next) => {
            if (this._activeRouter) {
                this._activeRouter(req, res, next);
            } else {
                next();
            }
        });

        this.app.listen(this.port, () => {
            Log.verbose("Server started on port: " + this.port);
        });
    }

}
