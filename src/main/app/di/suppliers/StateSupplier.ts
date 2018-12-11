import { State } from "../../domains/State";
import { ISupplier } from "../../interfaces/ISupplier";
import { JSONMap } from "../../utils/JSONMap";
import { EndpointSupplier } from "./EndpointSupplier";

export class StateSupplier implements ISupplier<State> {

    constructor(private _endpointSupplier: EndpointSupplier) { }

    public create(): State {
        return new State();
    }

    public createFromJSON(json: any): State {
        const state = this.create();
        state.id = json.id;
        state.endpoints = JSONMap.map(json.endpoints, this._endpointSupplier.createFromJSON);

        return state;
    }

}
