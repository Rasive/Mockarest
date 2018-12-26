import { IEndpoint, IState } from "@app/interfaces";
import { Router } from "express";

export class State implements IState {

    public id: string;
    public endpoints: IEndpoint[];
    public callCount = 0;

    public router: Router;

    public fetchRouter(rebuild: boolean = false, reset: boolean = true): Router {
        if (this.router && !rebuild) {
            if (reset) {
                this.reset();
            }

            return this.router;
        }

        this.router = Router();

        if (this.endpoints) {
            this.endpoints.forEach((endpoint: IEndpoint) => endpoint.process(this.router));
        }

        return this.router;
    }

    public reset(): void {
        if (this.endpoints) {
            this.endpoints.forEach((endpoint: IEndpoint) => endpoint.reset());
        }
    }

}
