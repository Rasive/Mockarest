import App from "../../App";
import { ISupplier } from "../../interfaces/ISupplier";
import { ScenarioSupplier } from "./ScenarioSupplier";

export class AppSupplier implements ISupplier<App> {

    constructor(private _scenarioSupplier: ScenarioSupplier) { }

    public create(): App {
        return new App();
    }

    public createFromJSON(json: any): App {
        const app = this.create();
        app.scenario = this._scenarioSupplier.createFromJSON(json.scenario);

        return app;
    }

}
