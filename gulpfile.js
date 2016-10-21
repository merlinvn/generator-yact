var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", ['scripts']);

gulp.task('scripts', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("app"));
});


gulp.task('watch', ['scripts'], function () {
    gulp.watch('src/**/*.ts', ['scripts']);
});