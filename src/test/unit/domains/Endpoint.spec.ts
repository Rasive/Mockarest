import { Endpoint } from "@app/domains";
import { expect } from "chai";
import { Request, Response, Router } from "express";
import { IMock, It, Mock, Times } from "typemoq";

describe("Endpoint", () => {
    context("process", () => {
        it("should setup GET, POST, PUT, PATCH and DELETE for router", () => {
            // arange
            const routerMock = Mock.ofType<Router>();
            const endpoint = new Endpoint();
            const fn = (req: Request, res: Response) => void (0);

            endpoint.method = ["GET", "POST", "PUT", "PATCH", "DELETE"];
            endpoint.path = "/some/path";

            // act
            endpoint.process(routerMock.object);

            // assert
            routerMock.verify((x) => x.get(It.isAnyString(), It.isAny()), Times.once());
            routerMock.verify((x) => x.post(It.isAnyString(), It.isAny()), Times.once());
            routerMock.verify((x) => x.put(It.isAnyString(), It.isAny()), Times.once());
            routerMock.verify((x) => x.patch(It.isAnyString(), It.isAny()), Times.once());
            routerMock.verify((x) => x.delete(It.isAnyString(), It.isAny()), Times.once());
        });
    });
});
