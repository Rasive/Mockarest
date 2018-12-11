import { expect } from "chai";
import { Router, Request, Response } from "express";
import { IMock, It, Mock, Times } from "typemoq";
import { Endpoint } from "../../../main/app/domains/Endpoint";

describe("Endpoint", () => {
    context("fromJSON", () => {
        it("should create an instance from json", () => {
            // arrange
            const json = `{
                "method": "GET",
                "path": "/some/path"
            }`;

            // act
            const endpoint = Endpoint.fromJSON(json);

            // assert
            expect(endpoint).to.not.be.undefined;
        });
    });

    context("process", () => {
        it("should setup GET, POST, PUT, PATCH and DELETE for router", () => {
            // arange
            const routerMock = Mock.ofType<Router>();
            const endpoint = new Endpoint();
            endpoint.method = "GET|POST|PUT|PATCH|DELETE";
            endpoint.path = "/some/path";
            const fn = (req: Request, res: Response) => void(0);

            // act
            endpoint.process(routerMock.object);

            // assert
            routerMock.verify((x) => x.get(It.isAnyString(), fn), Times.once());
            routerMock.verify((x) => x.post(It.isAnyString(), fn), Times.once());
            routerMock.verify((x) => x.put(It.isAnyString(), fn), Times.once());
            routerMock.verify((x) => x.patch(It.isAnyString(), fn), Times.once());
            routerMock.verify((x) => x.delete(It.isAnyString(), fn), Times.once());
        });
    });
});
