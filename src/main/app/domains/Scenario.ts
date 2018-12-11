import { BehaviorSubject, Subject } from "rxjs";
import { Parsable } from "../interfaces/Parsable";
import { JSONMap } from "../utils/JSONMap";
import { State } from "./State";

export class Scenario {

    public name: string;
    public description: string;

    private _states: State[];

    public findState(id: string): State {
        return this._states.find((obj: State) => obj.id === id);
    }

    public get states(): State[] {
        return this._states;
    }

    public set states(states: State[]) {
        this._states = states;
    }

}
