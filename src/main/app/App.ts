import * as Express from "express";
import minimist = require("minimist");
import { Scenario } from "./domains/Scenario";

export default class App {

    public scenario: Scenario;

    public run(): any {
        throw new Error("Method not implemented.");
    }
}
