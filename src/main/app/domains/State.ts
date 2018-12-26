import { Endpoint } from "@app/domains";
import { IState, IEndpoint } from "@app/interfaces";
import { Router } from "express";

export class State implements IState {

    public id: string;
    public endpoints: IEndpoint[];
    public callCount = 0;

    private _router: Router;

    public fetchRouter(rebuild: boolean = false, reset: boolean = true): Router {
        if (this._router && !rebuild) {
            if (reset) { this.reset(); }

            return this._router;
        }

        this._router = Router();

        if (this.endpoints) {
            this.endpoints.forEach((endpoint: IEndpoint) => endpoint.process(this._router));
        }

        return this._router;
    }

    public reset(): void {
        if (this.endpoints) {
            this.endpoints.forEach((endpoint: IEndpoint) => endpoint.reset());
        }
    }

}
