import { Router } from "express";
import { Subject } from "rxjs";
import { State } from "./State";

export class Scenario {

    constructor(
        public readonly activeStateSubject: Subject<string>,
        public readonly activeRouterSubject: Subject<Router>) {

        this.activeStateSubject.subscribe((stateId) => {
            const state = this.findState(stateId);

            if (state) {
                const router = state.fetchRouter();
                this.activeRouterSubject.next(router);
            }
        });
    }

    public name: string;
    public description: string;

    private _states: State[];

    public findState(id: string): State {
        if (!this.states) { return undefined; }

        return this._states.find((obj: State) => obj.id === id);
    }

    public get states() {
        return this._states;
    }

    public set states(states: State[]) {
        if (states && states.length > 0) {
            this._states = states;

            this.activeStateSubject.next(states[0].id);
        }
    }

}
