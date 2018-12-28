import { IAction } from "@app/interfaces";
import { SafeEval } from "@app/utils";
import { Subject } from "rxjs";

export class Action implements IAction {

    public precondition: string;
    public goto: string;

    constructor(
        private readonly _activeStateSubject: Subject<string>,
        private readonly _safeEval: SafeEval) { }

    public execute(vars: any): void {
        if (this.precondition && this.goto) {
            const result = this._safeEval.execute(this.precondition, vars);

            if (result) {
                this.publishNextState(this.goto);
            }
        } else if (this.goto) {
            this.publishNextState(this.goto);
        }
    }

    private publishNextState(stateid: string) {
        if (!this._activeStateSubject ||
            !this._activeStateSubject) { return; }

        this._activeStateSubject.next(stateid);
    }

}
