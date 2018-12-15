import { Scenario } from "@app/domains";
import { Log } from "@app/utils";
import * as Express from "express";
import { Router } from "express";
import { Subject } from "rxjs";

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
