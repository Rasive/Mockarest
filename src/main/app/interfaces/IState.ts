import { IEndpoint } from "@app/interfaces";

export interface IState {
    
    fetchRouter(): any;

    /**
     * The id of the state, this can be referred to in the action of the endpoint
     */
    id: string;

    /**
     * Endpoints which this state has
     */
    endpoints: IEndpoint[];

}
