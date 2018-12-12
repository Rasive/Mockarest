import { BehaviorSubject, Subject } from "rxjs";
import { Parsable } from "../interfaces/Parsable";
import { JSONMap } from "../utils/JSONMap";
import { State } from "./State";

export class Scenario {

    public name: string;
    public description: string;

    public states: State[];

    constructor(public activeStateSubject: Subject<string>) { }

    public findState(id: string): State {
        return this.states.find((obj: State) => obj.id === id);
    }

}
