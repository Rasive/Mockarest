import { App } from "@app/App";
import { ScenarioSupplier } from "@app/di/suppliers";
import { ISupplier } from "@app/interfaces";
import * as express from "express";
import { Router } from "express";
import { BehaviorSubject } from "rxjs";

export class AppSupplier implements ISupplier<App> {

    constructor(private readonly _scenarioSupplier: ScenarioSupplier) { }

    public create(port: number): App {
        const expressApp = express();
        const routerSubject = new BehaviorSubject<Router>(undefined);
        const app = new App(port, expressApp, routerSubject);

        return app;
    }

    public createFromJSON(json: any, port: number): App {
        const app = this.create(port);

        if (json) {
            app.scenario = this._scenarioSupplier.createFromJSON(json, app);
        }

        return app;
    }

}
