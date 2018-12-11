import { Subject } from "rxjs";
import * as SafeEval from "safe-eval";
import { Action } from "../../domains/Action";
import ISupplier from "../../interfaces/Supplier";

export default class ActionSupplier implements ISupplier<Action> {

    constructor(private _activeStateSubject: Subject<string>) {}

    public create(): Action {
        return new Action(this._activeStateSubject, SafeEval);
    }

    public createFromJSON(json: any): Action {
        const action = this.create();
        action.precondition = json.precondition;
        action.goto = json.goto;

        return action;
    }

}
