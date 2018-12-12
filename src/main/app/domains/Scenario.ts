import { Router } from "express";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Log } from "../utils/Log";
import { State } from "./State";

export class Scenario {

    constructor(public readonly activeStateSubject: Subject<string>) {
        this.activeRouterObservable =
            this.activeStateSubject.pipe(map((stateId) =>
                this.findState(stateId).fetchRouter()));

        this.activeStateSubject.subscribe((stateId) => {
            Log.debug("Setting active state", stateId);
        });
    }

    public name: string;
    public description: string;

    private _states: State[];

    public readonly activeRouterObservable: Observable<Router>;

    public findState(id: string): State {
        return this._states.find((obj: State) => obj.id === id);
    }

    public get states() {
        return this._states;
    }

    public set states(states: State[]) {
        if (states && states.length > 0) {
            Log.debug("Setting states");
            this._states = states;
            this.activeStateSubject.next(this.states[0].id);
        }
    }

}
