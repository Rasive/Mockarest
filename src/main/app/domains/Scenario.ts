import { BehaviorSubject, Subject } from "rxjs";
import { Parsable } from "../interfaces/Parsable";
import { JSONMap } from "../utils/JSONMap";
import { State } from "./State";

export class Scenario {

    public name: string;
    public description: string;

    public states: State[];

    private _activeState: State;

    constructor(public readonly activeStateSubject: Subject<string>) {
        this.activeStateSubject.subscribe((stateId) => {
            this._activeState = this.findState(stateId);
        });

        if (this.states.length > 0) {
            this._activeState = this.states[0];
        }
    }

    public findState(id: string): State {
        return this.states.find((obj: State) => obj.id === id);
    }

    public get activeState(): State {
        return this._activeState;
    }

}
