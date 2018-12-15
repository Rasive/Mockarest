import * as fs from "fs";
import * as path from "path";

export class FileUtil {

    public static loadScenario(scnearioFileName): any {
        if (!scnearioFileName) {
            return undefined;
        }

        return JSON.parse(fs.readFileSync(path.resolve(scnearioFileName), "utf8").toString());
    }

}
