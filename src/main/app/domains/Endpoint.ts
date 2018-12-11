import * as Express from "express";
import { Parsable } from "../interfaces/Parsable";
import { Action } from "./Action";
import { Response } from "./Response";
import { State } from "./State";

@Parsable<Endpoint>()
export class Endpoint {

    public static fromJSON(json: any): Endpoint {
        const endpoint = new Endpoint();
        endpoint.method = json.method;
        endpoint.path = json.path;

        return endpoint;
    }
    public method: string;
    public path: string;
    public response: Response;
    public action: Action;

    public callCount: number = 0;

    public process(router: Express.Router): void {
        const processMethod = (req: Express.Request, res: Express.Response) => {
            setTimeout(() => {
                res
                    .status(this.response.statusCode)
                    .header(this.response.header)
                    .send(this.response.body);

                this.callCount++;

                if (this.action) { this.action.execute(this); }
            }, this.response.delay || 0);
        };

        if (this.method.indexOf("GET") >= 0) {
            router.get(this.path, processMethod);
        }
        if (this.method.indexOf("POST") >= 0) {
            router.post(this.path, processMethod);
        }
        if (this.method.indexOf("PUT") >= 0) {
            router.put(this.path, processMethod);
        }
        if (this.method.indexOf("PATCH") >= 0) {
            router.patch(this.path, processMethod);
        }
        if (this.method.indexOf("DELETE") >= 0) {
            router.delete(this.path, processMethod);
        }
    }

    public reset(): void {
        this.callCount = 0;
    }
}
