import * as safe_eval from "safe-eval";

export class SafeEval {

    constructor(
        private readonly _safeeval: { fn: safe_eval }) { }

    public execute(statement: string, args: any): any {
        if (!this._safeeval.fn) return;

        return this._safeeval.fn(statement, args);
    }

}