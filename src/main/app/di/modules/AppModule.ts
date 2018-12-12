import { Subject } from "rxjs";
import App from "../../App";
import { IModule } from "../../interfaces/IModule";
import { ActionSupplier } from "../suppliers/ActionSupplier";
import { AppSupplier } from "../suppliers/AppSupplier";
import { EndpointSupplier } from "../suppliers/EndpointSupplier";
import { ResponseSupplier } from "../suppliers/ResponseSupplier";
import { ScenarioSupplier } from "../suppliers/ScenarioSupplier";
import { StateSupplier } from "../suppliers/StateSupplier";

export class AppModule {

    public build(json: any): App {
        const actionSupplier = new ActionSupplier();
        const responseSupplier = new ResponseSupplier();
        const endpointSupplier = new EndpointSupplier(responseSupplier, actionSupplier);
        const stateSupplier = new StateSupplier(endpointSupplier);
        const scenarioSupplier = new ScenarioSupplier(stateSupplier);
        const appSupplier = new AppSupplier(scenarioSupplier);

        return appSupplier.createFromJSON(json);
    }

}
