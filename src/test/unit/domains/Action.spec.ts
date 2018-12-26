import { Action } from "@app/domains";
import { mock, verify, instance, anything, anyString } from "ts-mockito";
import { SafeEval } from "@app/utils";
import { Subject } from "rxjs";

describe("Action", () => {
    context("execute", () => {
        it("should run SafeEval when precondition and goto is set", () => {
            // given
            const precondition = "1 == 1";
            const _goto = "something";
            const safeEvalMock = mock(SafeEval);
            const action = new Action(null, instance(safeEvalMock));
            action.precondition = precondition;
            action.goto = _goto;
            const vars = {};

            // when
            action.execute(vars);

            // then
            verify(safeEvalMock.execute(anyString(), anything())).once();
        });

        it("should run Subject::next when goto is set", () => {
            // given
            const _goto = "something";
            const precondition = null;
            const activeStateSubjectMock = mock(Subject);
            const action = new Action(instance(activeStateSubjectMock), null);
            action.goto = _goto;
            action.precondition = precondition;
            const vars = {};

            // when
            action.execute(vars);

            // then
            verify(activeStateSubjectMock.next(anything())).once();
        });
    });
});
