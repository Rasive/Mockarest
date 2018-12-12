import { Router } from "express";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { State } from "./State";

export class Scenario {

    constructor(public readonly activeStateSubject: Subject<string>) {
        this.activeRouterObservable =
            this.activeStateSubject.pipe(map((stateId) =>
                this.findState(stateId).fetchRouter()));
    }

    public name: string;
    public description: string;

    public states: State[];

    public readonly activeRouterObservable: Observable<Router>;

    public findState(id: string): State {
        return this.states.find((obj: State) => obj.id === id);
    }

}
