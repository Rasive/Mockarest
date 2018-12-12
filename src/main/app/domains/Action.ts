import { Subject } from "rxjs";
import * as SafeEval from "safe-eval";
import { Parsable } from "../interfaces/Parsable";

export class Action {

    public precondition: string;
    public goto: string;

    constructor(
        private readonly _activeStateSubject: Subject<string>,
        private readonly _safeEval: SafeEval) { }

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
