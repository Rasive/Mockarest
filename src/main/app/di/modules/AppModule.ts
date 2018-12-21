import { App } from "@app/App";
import {
    ActionSupplier, AppSupplier, EndpointSupplier,
    ResponseSupplier, ScenarioSupplier, StateSupplier,
} from "@app/di/suppliers";

export class AppModule {

    constructor(
        private readonly _port: number,
        private readonly _json: any) { }

    public build(): App {
        const actionSupplier = new ActionSupplier();
        const responseSupplier = new ResponseSupplier();
        const endpointSupplier = new EndpointSupplier(responseSupplier, actionSupplier);
        const stateSupplier = new StateSupplier(endpointSupplier);
        const scenarioSupplier = new ScenarioSupplier(stateSupplier);
        const appSupplier = new AppSupplier(scenarioSupplier);

        return appSupplier.createFromJSON(this._json, this._port);
    }

}
