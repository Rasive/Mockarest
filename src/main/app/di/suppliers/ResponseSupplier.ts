import { Response } from "../../domains/Response";
import { ISupplier } from "../../interfaces/Supplier";

export class ResponseSupplier implements ISupplier<Response> {

    public create(): Response {
        return new Response();
    }

    public createFromJSON(json: any): Response {
        const response = this.create();
        response.delay = json.delay;
        response.statusCode = json.statusCode;
        response.header = json.header;
        response.body = json.body;

        return response;
    }

}
