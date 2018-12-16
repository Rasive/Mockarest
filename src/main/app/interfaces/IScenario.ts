import { IState } from "@app/interfaces";

export interface IScenario {

    /**
     * The name of the scenario
     */
    name: string;

    /**
     * A short description for the scenario
     */
    description?: string;

    /**
     * All possibly states the scenario is supposed to have
     */
    states: IState[];

}
