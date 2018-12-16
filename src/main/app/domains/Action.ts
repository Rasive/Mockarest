import { IAction } from "@app/interfaces";
import { Log } from "@app/utils";
import { Subject } from "rxjs";
import * as SafeEval from "safe-eval";

export class Action implements IAction {

    public precondition: string;
    public goto: string;

    constructor(
        private readonly _activeStateSubject: Subject<string>,
        private readonly _safeEval: SafeEval) { }

    public execute(vars: any): void {
        if (this.precondition && this.goto) {
            let result;
            try {
                result = this._safeEval(this.precondition, vars);
            } catch (error) {
                Log.error(error);
            }

            if (result) {
                this._activeStateSubject.next(this.goto);
            }
        } else if (this.goto) {
            this._activeStateSubject.next(this.goto);
        }
    }

}
