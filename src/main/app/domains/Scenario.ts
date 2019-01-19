import { State } from "@app/domains";
import { IScenario, IState } from "@app/interfaces";
import { Router } from "express";
import { Subject } from "rxjs";
import { Log } from "@app/utils";

export class Scenario implements IScenario {

    constructor(
        public readonly activeStateSubject: Subject<string>,
        public readonly activeRouterSubject: Subject<Router>) {

        if (!this.activeStateSubject || !this.activeRouterSubject) {
            return;
        }

        this.activeStateSubject.subscribe((stateId) => {
            const state = this.findState(stateId);

            if (state) {
                Log.verbose("Setting active state to:", state.id);

                const router = state.fetchRouter();
                this.activeRouterSubject.next(router);
            }
        });
    }

    public name: string;
    public description: string;

    private _states: IState[];

    public findState(id: string): IState {
        if (!this.states) {
            Log.warning("No states for scenario");

            return undefined;
        }

        const foundState = this._states.find((obj: IState) => obj.id === id);

        if (!foundState) {
            Log.warning("No state could be found with id:", id);
        }

        return foundState;
    }

    public get states() {
        return this._states;
    }

    public set states(states: IState[]) {
        if (states && states.length > 0) {
            this._states = states;

            Log.verbose("Setting states for scenario");

            if (this.activeStateSubject) {
                this.activeStateSubject.next(states[0].id);
            }
        }
    }

}
