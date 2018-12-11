import { Subject } from "rxjs";
import * as SafeEval from "safe-eval";
import { Parsable } from "../interfaces/Parsable";

@Parsable<Action>()
export class Action {
    public static fromJSON(json: any, activeStateSubject: Subject<string>): Action {
        const action = new Action(activeStateSubject, SafeEval);
        action.precondition = json.precondition;
        action.goto = json.goto;

        return action;
    }

    public precondition: string;
    public goto: string;

    constructor(
        private _activeStateSubject: Subject<string>,
        private _safeEval: SafeEval) { }

    public execute(vars: any): void {
        if (this.precondition && this.goto) {
            const result = this._safeEval.call(this.precondition, vars);

            if (result) {
                this._activeStateSubject.next(this.goto);
            }
        } else if (this.goto) {
            this._activeStateSubject.next(this.goto);
        }
    }
}
