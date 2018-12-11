import * as minimist from "minimist";
import App from "./app/App";
import FileUtil from "./app/utils/FileUtil";

let args: minimist.ParsedArgs;

process.argv.forEach((value, idx) => {
    if (__filename === value) {
        args = minimist(process.argv.slice(idx + 1));
    }
});

if (!args["load-scenario"] || typeof args["load-scenario"] !== "string") {
    throw new Error("Missing argument: --load-scenario <path>");
}

const scenario = FileUtil.loadScenario(args["load-scenario"]);
const app: App = new App();
app.run();
app.scenario = scenario;
