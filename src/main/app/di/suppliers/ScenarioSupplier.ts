import { BehaviorSubject } from "rxjs";
import App from "../../App";
import { Scenario } from "../../domains/Scenario";
import { ISupplier } from "../../interfaces/ISupplier";
import { JSONMap } from "../../utils/JSONMap";
import { ActionSupplier } from "./ActionSupplier";
import { StateSupplier } from "./StateSupplier";

export class ScenarioSupplier implements ISupplier<Scenario> {

    constructor(
        private _stateSupplier: StateSupplier) { }

    public create(): Scenario {
        const activeState = new BehaviorSubject<string>(undefined);
        const scenario = new Scenario(activeState);

        return new Scenario(activeState);
    }

    public createFromJSON(json: any, app: App): Scenario {
        const scenario = this.create();
        scenario.name = json.name;
        scenario.description = json.description;
        scenario.states = JSONMap.map(json.states, (stateJson) =>
            this._stateSupplier.createFromJSON(stateJson, scenario, app));

        return scenario;
    }

}
