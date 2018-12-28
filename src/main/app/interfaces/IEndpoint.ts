import { IResponse } from "@app/interfaces";
import { Router } from "express";
import { IAction } from "./IAction";

export interface IEndpoint {

    reset(): void;

    process(_router: Router): void;

    /**
     * The http method to expect, can be more than one
     *
     * @minItems 1
     */
    method: string[];

    /**
     * The path to match on, can be a regular expression
     */
    path: string;

    /**
     * The response to send
     */
    response: IResponse;

    /**
     * The action to take after hitting the endpoint
     */
    action?: IAction;

}
