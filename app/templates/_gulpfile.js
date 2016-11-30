
var gulp = require('gulp');

var exec = require('child_process').exec;

var cmakeCommand = "mkdir -p build; cd build; cmake ..;";
var cleanCommand = "rm -rf build";
var testCommand = "cd build; ctest -V";

//"cmake --build ."
var buildAllCommand = "cd build; make -j 2;";
var buildCommand = "cd build; make <%= appname %> -j 2;";
var buildTestCommand = "cd build; make <%= testAppname %> -j 2;";
var runCommand = "cd build; make run;"

gulp.task('clean', function () {
    exec(cleanCommand, function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});


gulp.task('cmake', function (cb) {
    exec(cmakeCommand, function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(stderr);
    });

});

gulp.task('build_all', function (cb) {
    exec(buildAllCommand, function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(stderr);
    });
});

gulp.task('build', function (cb) {
    exec(buildCommand, function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(stderr);
    });
});

gulp.task('build_test', function (cb) {
    exec(buildTestCommand, function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(stderr);
    });
});

gulp.task('test', ['build_test'], function () {
    exec(testCommand, function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});


gulp.task('run', ['build'], function () {
    exec(runCommand, function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('wt', function () {
    gulp.watch('src/**/*.cpp', ['test']);
    gulp.watch('src/**/*.h', ['test']);
    gulp.watch('include/**/*.h', ['test']);
    gulp.watch('test/**/*.cpp', ['test']);
    gulp.watch('test/**/*.h', ['test']);
    gulp.watch('**/CMakeLists.txt', ['cmake','test']);
});

gulp.task('wr', function () {
    gulp.watch('src/**/*.cpp', ['run']);
    gulp.watch('src/**/*.h', ['run']);
    gulp.watch('include/**/*.h', ['run']);
    gulp.watch('**/CMakeLists.txt', ['cmake','run']);
});

gulp.task('default', ['build', 'test'], function () { });
gulp.task('c', ['cmake'], function () { });
gulp.task('t', ['test'], function () { });
gulp.task('b', ['build'], function () { });
gulp.task('ba', ['build_all'], function () { });
gulp.task('bt', ['build_test'], function () { });
gulp.task('r', ['run'], function () { });
