import { SafeEval } from "@app/utils";
import * as safe_eval from "safe-eval";
import { anything, spy, capture, verify, anyString } from "ts-mockito";

describe("SafeEval", () => {
    context("execute", () => {
        it("should call safe-eval function when called", () => {
            // given
            const safeEval = { fn: (x, y) => anything };
            const safeEvalUtil = new SafeEval(safeEval);
            const safeEvalSpy = spy(safeEval);
            const statement = "abc";
            const args = {};

            // when
            safeEvalUtil.execute(statement, args);

            // then
            verify(safeEvalSpy.fn(statement, args)).once();
        })
    })
})