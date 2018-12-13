import { Router } from "express";
import { BehaviorSubject, Subject } from "rxjs";
import App from "../../App";
import { Scenario } from "../../domains/Scenario";
import { ISupplier } from "../../interfaces/ISupplier";
import { JSONMap } from "../../utils/JSONMap";
import { StateSupplier } from "./StateSupplier";

export class ScenarioSupplier implements ISupplier<Scenario> {

    constructor(
        private _stateSupplier: StateSupplier) { }

    public create(activeRouterSubject: Subject<Router>): Scenario {
        const activeStateSubject = new BehaviorSubject<string>(undefined);

        return new Scenario(activeStateSubject, activeRouterSubject);
    }

    public createFromJSON(json: any, app: App): Scenario {
        const scenario = this.create(app.activeRouterSubject);
        scenario.name = json.name;
        scenario.description = json.description;
        scenario.states = JSONMap.map(json.states, (stateJson) =>
            this._stateSupplier.createFromJSON(stateJson, scenario, app));

        return scenario;
    }

}
