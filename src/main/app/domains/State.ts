import { Router } from "express";
import { Endpoint } from "./Endpoint";

export class State {

    public id: string;
    public endpoints: Endpoint[];
    public callCount = 0;

    private _router: Router;

    public fetchRouter(rebuild: boolean = false, reset: boolean = true): Router {
        if (this._router && !rebuild) {
            if (reset) { this.reset(); }

            return this._router;
        }

        this._router = Router();
        this.endpoints.forEach((endpoint: Endpoint) => endpoint.process(this._router));

        return this._router;
    }

    public reset(): void {
        this.endpoints.forEach((endpoint: Endpoint) => endpoint.reset());
    }

}
