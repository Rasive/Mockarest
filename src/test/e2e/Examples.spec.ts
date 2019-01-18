import { expect } from "chai";
import { spawn } from "child_process";

const sleep = async (ms: number) => {
    await _sleep(ms);
};

const _sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

describe("Examples", () => {
    context("static-post-and-fetch-users", () => {
        it("Should start", async () => {
            // given
            const args = [
                "-r", "./node_modules/ts-node/register",
                "-r", "./node_modules/tsconfig-paths/register",
                "./src/main/main.ts", "--load-scenario", "./examples/static-post-and-fetch-users/scenario.json"];

            // when
            const process = spawn("node", args);
            let output = "";
            let error = "";

            process.stdout.on("data", (data) => {
                const buff = Buffer.from(data);
                output = buff.toString("utf-8");
            });

            process.stderr.on("data", (data) => {
                const buff = Buffer.from(data);
                error = buff.toString("utf-8");
            });

            await sleep(1000);
            process.kill();

            // then
            expect(error).to.be.empty;
        });
    });
});
