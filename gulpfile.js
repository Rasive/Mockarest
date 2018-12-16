var gulp = require("gulp");
var ts = require("gulp-typescript");
var upath = require("upath");
var print = require("gulp-print").default;
var tap = require("gulp-tap");

gulp.task("build-dist", () => {
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