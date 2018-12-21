import { ActionSupplier, ResponseSupplier } from "@app/di/suppliers";
import { Endpoint, Scenario } from "@app/domains";
import { ISupplier } from "@app/interfaces";

export class EndpointSupplier implements ISupplier<Endpoint> {

    constructor(
        private readonly _responseSupplier: ResponseSupplier,
        private readonly _actionSupplier: ActionSupplier) { }

    public create(): Endpoint {
        return new Endpoint();
    }

    public createFromJSON(json: any, scenario: Scenario): Endpoint {
        const endpoint = this.create();
        endpoint.method = json.method;
        endpoint.path = json.path;
        endpoint.response = this._responseSupplier.createFromJSON(json.response);
        endpoint.action = this._actionSupplier.createFromJSON(json.action, scenario);

        return endpoint;
    }

}
