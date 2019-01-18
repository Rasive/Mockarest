import { App } from "@app/App";
import { StateSupplier } from "@app/di/suppliers";
import { Scenario } from "@app/domains";
import { ISupplier } from "@app/interfaces";
import { JSON } from "@app/utils";
import { Router } from "express";
import { BehaviorSubject, Subject } from "rxjs";

export class ScenarioSupplier implements ISupplier<Scenario> {

    constructor(
        private readonly _stateSupplier: StateSupplier) { }

    public create(activeRouterSubject: Subject<Router>): Scenario {
        const activeStateSubject = new BehaviorSubject<string>(undefined);

        return new Scenario(activeStateSubject, activeRouterSubject);
    }

    public createFromJSON(json: any, app: App): Scenario {
        const scenario = this.create(app.activeRouterSubject);

        if (json) {
            scenario.name = json.name;
            scenario.description = json.description;
            scenario.states = JSON.map(json.states, (stateJson) =>
                this._stateSupplier.createFromJSON(stateJson, scenario, app));
        }

        return scenario;
    }

}
