import * as Express from "express";
import { Router } from "express";
import { Observable, Subject } from "rxjs";
import { Scenario } from "./domains/Scenario";
import { Log } from "./utils/Log";

export default class App {

    constructor(
        private readonly _port: number,
        private readonly _app: Express.Application,
        public readonly activeRouterObservable: Observable<Router>) {
        this.activeRouterObservable.subscribe((router) => {
            this._router = router;
        });
    }

    private _router: Express.Router;

    public scenario: Scenario;

    public run(): any {
        this._app.use((req, res, next) => {
            if (this._router) {
                this._router(req, res, next);
            } else {
                next();
            }
        });

        this._app.listen(this._port, () => {
            Log.verbose("Server started on port: " + this._port);
        });
    }

}
