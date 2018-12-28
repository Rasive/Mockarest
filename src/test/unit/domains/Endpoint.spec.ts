import { Endpoint } from "@app/domains";
import { expect } from "chai";
import { Request, Response, Router } from "express";
import { anyString, anything, spy, verify } from "ts-mockito";

describe("Endpoint", () => {
    context("process", () => {
        it("should setup GET, POST, PUT, PATCH and DELETE for router", () => {
            // given
            const router = Router();
            const routerSpy = spy(router);
            const endpoint = new Endpoint();
            const fn = (req: Request, res: Response) => anything();

            endpoint.method = ["GET", "POST", "PUT", "PATCH", "DELETE"];
            endpoint.path = "/some/path";

            // when
            endpoint.process(router);

            // then
            verify(routerSpy.get(anyString(), anything())).once();
            verify(routerSpy.post(anyString(), anything())).once();
            verify(routerSpy.put(anyString(), anything())).once();
            verify(routerSpy.patch(anyString(), anything())).once();
            verify(routerSpy.delete(anyString(), anything())).once();
        });
    });

    context("reset", () => {
        it("should set callCount to zero when called", () => {
            // given
            const endpoint = new Endpoint();
            endpoint.callCount = 9;

            // when
            endpoint.reset();

            // then
            expect(endpoint.callCount).to.be.equal(0);
        });
    });
});
