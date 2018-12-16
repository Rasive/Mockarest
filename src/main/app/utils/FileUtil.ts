import * as fs from "fs";
import * as path from "path";

export class FileUtil {

    public static loadJSON(filename): any {
        if (!filename) {
            return undefined;
        }

        return JSON.parse(fs.readFileSync(path.resolve(filename), "utf8").toString());
    }

}
