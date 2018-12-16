import { IResponse } from "@app/interfaces";
import { IAction } from "./IAction";

export interface IEndpoint {

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
