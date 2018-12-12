import { Router } from "express";
import { Subject } from "rxjs";
import App from "../../App";
import { Endpoint } from "../../domains/Endpoint";
import { Scenario } from "../../domains/Scenario";
import { ISupplier } from "../../interfaces/ISupplier";
import { ActionSupplier } from "./ActionSupplier";
import { ResponseSupplier } from "./ResponseSupplier";

export class EndpointSupplier implements ISupplier<Endpoint> {

    constructor(
        private _responseSupplier: ResponseSupplier,
        private _actionSupplier: ActionSupplier) { }

    public create(routerSubject: Subject<Router>): Endpoint {
        return new Endpoint(routerSubject);
    }

    public createFromJSON(json: any, scenario: Scenario, app: App): Endpoint {
        const endpoint = this.create(app.routerSubject);
        endpoint.method = json.method;
        endpoint.path = json.path;
        endpoint.response = this._responseSupplier.createFromJSON(json.response);
        endpoint.action = this._actionSupplier.createFromJSON(json.action, scenario);

        return endpoint;
    }

}
