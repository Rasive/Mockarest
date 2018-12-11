import { Endpoint } from "../../domains/Endpoint";
import { ISupplier } from "../../interfaces/ISupplier";
import { ActionSupplier } from "./ActionSupplier";
import { ResponseSupplier } from "./ResponseSupplier";

export class EndpointSupplier implements ISupplier<Endpoint> {

    constructor(
        private _responseSupplier: ResponseSupplier,
        private _actionSupplier: ActionSupplier) { }

    public create(): Endpoint {
        return new Endpoint();
    }

    public createFromJSON(json: any): Endpoint {
        const endpoint = this.create();
        endpoint.method = json.method;
        endpoint.path = json.path;
        endpoint.response = this._responseSupplier.createFromJSON(json.response);
        endpoint.action = this._actionSupplier.createFromJSON(json.action);

        return endpoint;
    }

}
