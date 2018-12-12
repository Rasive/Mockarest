import { Subject } from "rxjs";
import { Scenario } from "../../domains/Scenario";
import { IScope } from "../../interfaces/IScope";

export class ScenarioScope {

    constructor(public activeState: Subject<string>) { }

}
