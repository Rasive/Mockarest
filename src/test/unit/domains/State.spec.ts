import { Endpoint, State } from "@app/domains";
import { expect } from "chai";
import { Router } from "express";
import { anything, instance, mock, spy, verify } from "ts-mockito";

describe("State", () => {
    context("fetchRouter", () => {
        it("should return a router instance when called", () => {
            // given
            const state = new State();

            // when
            const router = state.fetchRouter();

            // then
            expect(router).to.not.be.undefined;
        });

        it("should return a new router instance when called with rebuild set to true", () => {
            // given
            const state = new State();
            const router = state.fetchRouter();

            // when
            const newRouter = state.fetchRouter(true);

            // then
            expect(newRouter).to.not.equal(router);
        });

        it("should reset the router when called with reset set to true", () => {
            // given
            const state = new State();
            state.router = mock(Router);
            const stateSpy = spy(state);

            // when
            state.fetchRouter(false, true);

            // then
            verify(stateSpy.reset()).once();
        });

        it("should call endpoint::process with a new router instance, when called", () => {
            // given
            const endpointMock = mock(Endpoint);
            const state = new State();
            state.endpoints = [instance(endpointMock)];

            // when
            const router = state.fetchRouter();

            // then
            verify(endpointMock.process(anything())).once();
        });
    });

    context("reset", () => {
        it("should call endpoint::reset when called", () => {
            // given
            const endpointMock = mock(Endpoint);
            const state = new State();
            state.endpoints = [instance(endpointMock)];

            // when
            state.reset();

            // then
            verify(endpointMock.reset()).once();
        });
    });
});
