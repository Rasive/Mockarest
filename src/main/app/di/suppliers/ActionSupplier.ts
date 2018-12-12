import { Subject } from "rxjs";
import * as SafeEval from "safe-eval";
import { Action } from "../../domains/Action";
import { Scenario } from "../../domains/Scenario";
import { ISupplier } from "../../interfaces/ISupplier";

export class ActionSupplier implements ISupplier<Action> {

    public scenario: Scenario;

    public create(activeStateSubject: Subject<string>): Action {
        return new Action(activeStateSubject, SafeEval);
    }

    public createFromJSON(json: any, scenario: Scenario): Action {
        const action = this.create(scenario.activeStateSubject);
        action.precondition = json.precondition;
        action.goto = json.goto;

        return action;
    }

}
