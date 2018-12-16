import { AppModule } from "@app/di/modules";
import { FileUtil } from "@app/utils";
import * as ajv from "ajv";
import * as minimist from "minimist";

let args: minimist.ParsedArgs;

process.argv.forEach((value, idx) => {
    if (__filename === value) {
        args = minimist(process.argv.slice(idx + 1));
    }
});

if (!args["load-scenario"] || typeof args["load-scenario"] !== "string") {
    throw new Error("Missing argument: --load-scenario <path>");
}

const json = FileUtil.loadScenario(args["load-scenario"]);
const AJV = ajv();

const port = 8080;

const appModule = new AppModule(port, json);
const app = appModule.build();

app.run();
