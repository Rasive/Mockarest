import { State } from "@app/domains";
import { expect } from "chai";
import Substitute from "@fluffy-spoon/substitute";
import { IEndpoint } from "@app/interfaces";

describe("State", () => {
    context("fetchRouter", () => {
        it("should return a router instance when called", () => {
            // arrange
            const state = new State();

            // act
            const router = state.fetchRouter();

            // assert
            expect(router).to.not.be.undefined;
        });

        it("should return a new router instance when called with rebuild set to true", () => {
            // arrange
            const state = new State();
            const router = state.fetchRouter();

            // act
            const newRouter = state.fetchRouter(true);

            // assert
            expect(newRouter).to.not.equal(router);
        });

        it("should return a router instance and call reset when called with reset set to true", () => {
            // arrange
            const state = Substitute.for<State>();
            state.mimick(new State());

            // act
            state.fetchRouter();

            // assert
            state.received().reset();
        });

        it("should call endpoint::process with a new router instance, when called", () => {
            // arrange
            const endpoint = Substitute.for<IEndpoint>();
            const state = new State();
            state.endpoints = [endpoint];

            // act
            const router = state.fetchRouter();

            // assert
            endpoint.received().process(router);
        })
    });

    context("reset", () => {
        it("should call endpoint::reset when called", () => {
            // arrange
            const endpoint = Substitute.for<IEndpoint>();
            const state = new State();
            state.endpoints = [endpoint];

            // act
            state.reset();

            // assert
            endpoint.received().reset();
        });
    });
});