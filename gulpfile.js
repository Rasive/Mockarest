var gulp = require("gulp");
var ts = require("gulp-typescript");
var upath = require("upath");
var tjs = require("typescript-json-schema");
var tap = require("gulp-tap");
var fs = require("fs");

gulp.task("build:dist:dev", () => {
    var tsProject = ts.createProject("tsconfig.json")

    return gulp.src("./src/main/**/*.ts")
        .pipe(tsProject())
        .pipe(tap((file) => {
            var normalizedFileDirAbsolutePath = upath.dirname(upath.normalizeSafe(file.path));
            var normalizedAppAbsolutePath = upath.normalizeSafe(__dirname + "/src/main/app");

            file.contents = Buffer.from(String(file.contents).replace(/"@app(\/.+)"/g, `"./${upath.relative(normalizedFileDirAbsolutePath, normalizedAppAbsolutePath + "$1")}"`));
        }))
        .pipe(gulp.dest("dist"))
});

gulp.task("gen:schema", (done) => {
    var basePath = "./src/main";
    var compilerOptions = {
        "target": "es6",
        "module": "commonjs",
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "baseUrl": "./src",
        "paths": {
            "@app/*": [
                "main/app/*"
            ],
        }
    };
    var settings = {};
    var program = tjs.getProgramFromFiles(["./src/main/app/interfaces/index.ts"], compilerOptions);
    var schema = tjs.generateSchema(program, "IScenario", settings);
    var schemaStr = JSON.stringify(schema, null, 4).replace(/\[at\]/g, "@");

    fs.writeFile("./res/schemas/schema.json", schemaStr, null, done);
});
