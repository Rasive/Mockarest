import { Scenario } from "../../domains/Scenario";
import { ISupplier } from "../../interfaces/Supplier";
import { JSONMap } from "../../utils/JSONMap";

export class ScenarioSupplier implements ISupplier<Scenario> {

    constructor(private _stateSupplier) { }

    public create(): Scenario {
        return new Scenario();
    }

    public createFromJSON(json: any): Scenario {
        const scenario = this.create();
        scenario.name = json.name;
        scenario.description = json.description;
        scenario.states = JSONMap.map(json.states, this._stateSupplier.createFromJSON);

        return scenario;
    }

}
