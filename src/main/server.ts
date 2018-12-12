// import * as Express from "express";
// import * as fs from "fs";
// import * as Minimist from "minimist";
// import * as path from "path";
// import { BehaviorSubject } from "rxjs";
// import { Scenario } from "./app/domains/Scenario";
// import { ObjectGraph } from "./app/utils/ObjectGraph";

// const PORT = 8080;

// // tslint:disable-next-line:no-console
// const log = console.log;
// const app = Express();
// let router;

// let args: Minimist.ParsedArgs;

// process.argv.forEach((value, idx) => {
//     if (__filename === value) {
//         args = Minimist(process.argv.slice(idx + 1));
//     }
// });

// if (args && args.scenario) {
//     let scnearioFileName;
//     if (Array.isArray(args.scenario) && args.scenario.length > 0) {
//         scnearioFileName = args.scenario[0];
//     } else {
//         scnearioFileName = args.scenario;
//     }

//     const data: JSON = JSON.parse(fs.readFileSync(path.resolve(scnearioFileName), "utf8").toString());
//     const activeStateSubject = new BehaviorSubject<string>(undefined);
//     ObjectGraph.store("activeStateSubject", activeStateSubject);
//     // const scenario = Scenario.parseJSON(data);

//     // activeStateSubject.subscribe((name: string) => {
//     //     if (scenario && scenario.states.length > 0) {
//     //         const state = scenario.findState(name);

//     //         if (state) {
//     //             router = state.fetchRouter();
//     //         }
//     //     }
//     // });
//     // activeStateSubject.next(scenario.states[0].name);
// }

// app.use((req, res, next) => {
//     if (router) {
//         router(req, res, next);
//     } else {
//         next();
//     }
// });

// app.listen(PORT, () => {
//     log("Server started on port: " + PORT);
// });
