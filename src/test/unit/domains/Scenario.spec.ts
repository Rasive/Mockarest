import { Scenario, State } from "@app/domains";
import { IState } from "@app/interfaces";
import { expect } from "chai";
import { instance, mock, when } from "ts-mockito";

describe("Scenario", () => {
    context("findState", () => {
        it("should find state from state id", () => {
            // given
            const stateMock1 = mock(State);
            when(stateMock1.id).thenReturn("one");
            const stateMock2 = mock(State);
            when(stateMock2.id).thenReturn("two");
            const stateMock3 = mock(State);
            when(stateMock3.id).thenReturn("three");

            const scenario = new Scenario(null, null);
            scenario.states = [instance(stateMock1), instance(stateMock2), instance(stateMock3)];

            // when
            const state = scenario.findState("two");

            // then
            expect(state).to.be.not.undefined;
        });
    });
});
