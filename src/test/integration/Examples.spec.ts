import { expect } from "chai";
import { spawn } from "child_process";
import * as request from "request";

const sleep = async (ms: number) => {
    await _sleep(ms);
};

const _sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const requestPromised = (options: request.Options): Promise<request.Response> => {
    return new Promise((resolve, reject) => {
        request(options)
            .on("response", (response) => {
                response.body = "";
                response
                    .on("data", (chuck) => {
                        response.body += chuck;
                    })
                    .on("end", () => {
                        resolve(response);
                    })
                    .on("error", (error) => reject(error));

                response.on("end", () => {
                    resolve(response);
                });
            })
            .on("error", (error) => reject(error));
    });
};

const baseurl = "http://localhost:8080";

describe("Examples", () => {
    context("static-post-and-fetch-users", () => {
        it("Should start", async () => {
            // given
            const args = [
                "-r", "./node_modules/ts-node/register",
                "-r", "./node_modules/tsconfig-paths/register",
                "./src/main/main.ts", "--load-scenario", "./examples/static-post-and-fetch-users/scenario.json"];

            const stdout = (data) => {
                const buff = Buffer.from(data);
                output = buff.toString("utf-8");
            };
            const stderr = (data) => {
                const buff = Buffer.from(data);
                error = buff.toString("utf-8");
            };

            // when
            const process = spawn("node", args);
            let output = "";
            let error = "";

            process.stdout.on("data", stdout);
            process.stderr.on("data", stderr);

            await sleep(1000);
            process.kill();

            // then
            expect(error).to.be.empty;
        });

        it("Should return different output after post", async () => {
            // given
            const args = [
                "-r", "./node_modules/ts-node/register",
                "-r", "./node_modules/tsconfig-paths/register",
                "./src/main/main.ts", "--load-scenario", "./examples/static-post-and-fetch-users/scenario.json"];

            const expected = [
                {
                    id: 1,
                    name: "Jens Jensen",
                    dob: "1988-02-06",
                },
                {
                    id: 2,
                    name: "Hans Hansen",
                    dob: "1985-10-12",
                },
            ];

            const payload = {
                id: 2,
                name: "Hans Hansen",
                dob: "1985-10-12",
            };

            // when
            const process = spawn("node", args);

            await sleep(1000);

            await requestPromised({
                uri: baseurl + "/users",
                method: "POST",
                json: payload,
            });

            await sleep(100);

            const response = await requestPromised({
                uri: baseurl + "/users",
                method: "GET",
            });

            process.kill();

            // then
            expect(response.body).to.be.equal(JSON.stringify(expected));
        });
    });
});
