import { Action } from "@app/domains";
import { BehaviorSubject, Subject } from "rxjs";
import * as SafeEval from "safe-eval";
import { IMock, It, Mock, Times } from "typemoq";

describe("Action", () => {

    context("execute", () => {
        it("should run SafeEval when precondition and goto is set", () => {
            // arrange
            const safeEvalMock = Mock.ofInstance<(string, any) => any>((string, any) => It.isAny());

            const action = new Action(
                It.isAnyObject(undefined),
                safeEvalMock.object);

            action.precondition = "true == true";
            action.goto = It.isAnyString();

            // act
            action.execute(It.isAny());

            // assert
            safeEvalMock.verify((x) =>
                x(It.isAnyString(), It.isAny()), Times.once());
        });

        it("should run Subject::next when goto is set", () => {
            // arrange
            const subjectMock = Mock.ofType<Subject<string>>();
            const action = new Action(
                subjectMock.object,
                It.isAnyObject(undefined));
            action.goto = "abc";

            // act
            action.execute(It.isAny());

            // assert
            subjectMock.verify((x) => x.next(It.isAnyString()), Times.atLeastOnce());
        });
    });

});
