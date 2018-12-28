import { App } from "@app/App";
import { EndpointSupplier } from "@app/di/suppliers";
import { Scenario, State } from "@app/domains";
import { ISupplier } from "@app/interfaces";
import { JSON } from "@app/utils";

export class StateSupplier implements ISupplier<State> {

    constructor(private readonly _endpointSupplier: EndpointSupplier) { }

    public create(): State {
        return new State();
    }

    public createFromJSON(json: any, scenario: Scenario, app: App): State {
        const state = this.create();
        state.id = json.id;
        state.endpoints = JSON.map(json.endpoints, (endpointJson) =>
            this._endpointSupplier.createFromJSON(endpointJson, scenario));

        return state;
    }

}
