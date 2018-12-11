import * as Chai from "chai";
import { BehaviorSubject, Subject } from "rxjs";
import * as SafeEval from "safe-eval";
import { IMock, It, Mock, Times } from "typemoq";
import { Action } from "../../../main/app/domains/Action";

describe("Action", () => {
    context("fromJSON", () => {
        it("should create an instance from json", () => {
            // arrange
            const json: JSON = JSON.parse(`{
                "precondition": "1 == 1",
                "goto": "@null"
            }`);

            // act
            const action = Action.fromJSON(json, It.isAnyObject(undefined));

            // assert
            Chai.expect(action).to.not.be.undefined;
        });
    });

    context("execute", () => {
        it("should run SafeEval when precondition and goto is set", () => {
            // arrange
            const safeEvalMock = Mock.ofInstance<(string, any) => any>((string, any) => any);

            const action = new Action(
                It.isAnyObject(undefined),
                safeEvalMock.object);

            action.precondition = It.isAnyString();
            action.goto = It.isAnyString();

            // act
            action.execute(It.isAny());

            // assert
            safeEvalMock.verify((x) =>
                x.call(It.isAnyString(), It.isAny()), Times.once());
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
