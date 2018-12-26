import { Mock } from "typemoq";
import { State, Scenario } from "@app/domains";
import { expect } from "chai";
import { IState } from "@app/interfaces";
import { Substitute } from "@fluffy-spoon/substitute";

describe("Scenario", () => {
    context("findState", () => {
        it("should find state from state id", () => {
            // arrange
            const stateMock1 = Substitute.for<IState>()
            stateMock1.id.returns("one");
            const stateMock2 = Substitute.for<IState>();
            stateMock2.id.returns("two");
            const stateMock3 = Substitute.for<IState>();
            stateMock3.id.returns("three");

            const scenario = new Scenario(null, null);
            scenario.states = [stateMock1, stateMock2, stateMock3];

            // act
            const state = scenario.findState("two");
            
            // assert
            expect(state).to.be.not.undefined;
        });
    });
});