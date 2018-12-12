import * as express from "express";
import { Router } from "express";
import { BehaviorSubject } from "rxjs";
import App from "../../App";
import { ISupplier } from "../../interfaces/ISupplier";
import { ScenarioSupplier } from "./ScenarioSupplier";

export class AppSupplier implements ISupplier<App> {

    constructor(private _scenarioSupplier: ScenarioSupplier) { }

    public create(port: number): App {
        const expressApp = express();
        const routerSubject = new BehaviorSubject<Router>(undefined);
        const app = new App(port, expressApp, routerSubject);

        return app;
    }

    public createFromJSON(json: any, port: number): App {
        const app = this.create(port);
        app.scenario = this._scenarioSupplier.createFromJSON(json.scenario);

        return app;
    }

}
