const gulp = require("gulp");
const ts = require("gulp-typescript");
const upath = require("upath");
const tjs = require("typescript-json-schema");
const tap = require("gulp-tap");
const fs = require("fs");
const tslint = require("gulp-tslint");
const sourcemaps = require("gulp-sourcemaps");
const clean = require("gulp-clean");
const mocha = require("gulp-mocha");

const tsProject = ts.createProject("tsconfig.json");

gulp.task("build", () => {
    return gulp.src("./src/main/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write(".", { sourceRoot: "./", includeContent: false }))
        .pipe(tap((file) => {
            const normalizedFileDirAbsolutePath = upath.dirname(upath.normalizeSafe(file.path));
            const normalizedAppAbsolutePath = upath.normalizeSafe(__dirname + "/src/main/app");

            file.contents = Buffer.from(String(file.contents).replace(/"@app(\/.+)"/g, `"./${upath.relative(normalizedFileDirAbsolutePath, normalizedAppAbsolutePath + "$1")}"`));
        }))
        .pipe(gulp.dest("dist/main"))
});

gulp.task("build:test", () => {
    return gulp.src("./src/test/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write(".", { sourceRoot: "./", includeContent: false }))
        .pipe(tap((file) => {
            const normalizedFileDirAbsolutePath = upath.dirname(upath.normalizeSafe(file.path));
            const normalizedAppAbsolutePath = upath.normalizeSafe(__dirname + "/src/main/app");

            file.contents = Buffer.from(String(file.contents).replace(/"@app(\/.+)"/g, `"./${upath.relative(normalizedFileDirAbsolutePath, normalizedAppAbsolutePath + "$1")}"`));
        }))
        .pipe(gulp.dest("dist/test"))
});

gulp.task("test:mocha", () => {
    return gulp.src("./dist/test/**/*.spec.js", { read: false })
        .pipe(mocha())
});

gulp.task("test", gulp.series("build:test", "test:mocha"));

gulp.task("clean:dist", () => {
    return gulp.src("./dist", { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task("clean:node", () => {
    return gulp.src("./node_modules", { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task("clean:all", gulp.parallel("clean:dist", "clean:node"));

gulp.task("lint", () => {
    return tsProject.src().pipe(tslint({
        formatter: "stylish"
    })).pipe(tslint.report());
});

gulp.task("gen:schema", (done) => {
    const basePath = "./src/main";
    const compilerOptions = {
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
    const settings = {};
    const program = tjs.getProgramFromFiles(["./src/main/app/interfaces/index.ts"], compilerOptions);
    const schema = tjs.generateSchema(program, "IScenario", settings);
    const schemaStr = JSON.stringify(schema, null, 4).replace(/\[at\]/g, "@");

    fs.writeFile("./res/schemas/schema.json", schemaStr, null, done);
});

gulp.task("travis", gulp.series("lint", "build", "test"));
