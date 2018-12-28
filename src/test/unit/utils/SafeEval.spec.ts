import { SafeEval } from "@app/utils";
import { anything, spy, verify } from "ts-mockito";

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
        });
    });
});
