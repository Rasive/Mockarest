import { Action } from "@app/domains";
import { Response } from "@app/domains";
import { IEndpoint } from "@app/interfaces";
import * as Express from "express";

export class Endpoint implements IEndpoint {

    public method: string[];
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
