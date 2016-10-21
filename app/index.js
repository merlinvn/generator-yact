'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var yo = require('yeoman-generator');
var MyGenerator = (function (_super) {
    __extends(MyGenerator, _super);
    /**
     *
     */
    function MyGenerator(args, options) {
        _super.call(this, args, options);
    }
    MyGenerator.prototype.initializing = function () {
        this.log("initializing");
    };
    MyGenerator.prototype.prompting = function () {
        this.log("prompting");
    };
    MyGenerator.prototype.configuring = function () {
        this.log("configuring");
    };
    MyGenerator.prototype.default = function () {
        this.log("default");
    };
    MyGenerator.prototype.writing = function () {
        var self = this;
        var gulpfile = function () {
            self.fs.copy(self.templatePath("gulpfile.js"), self.destinationPath("gulpfile.js"));
        };
        var packageJson = function () {
            self.fs.copyTpl(self.templatePath("_package.json"), self.destinationPath("package.json"), {
                appname: "testapp"
            });
        };
        var git = function () {
            self.fs.copy(self.templatePath(".gitignore"), self.destinationPath(".gitignore"));
        };
        var cmakefile = function () {
            self.fs.copyTpl(self.templatePath("_CMakeLists.txt"), self.destinationPath("CMakeLists.txt"), {
                appname: "testapp"
            });
        };
        var ext_libs = function () {
            self.fs.copy(self.templatePath("ext/gtest/CMakeLists.txt"), self.destinationPath("ext/gtest/CMakeLists.txt"));
        };
        var src = function () {
            self.fs.copyTpl(self.templatePath("src/_CMakeLists.txt"), self.destinationPath("src/CMakeLists.txt"), {
                appname: "testapp"
            });
            self.fs.copy(self.templatePath("src/main.cpp"), self.destinationPath("src/main.cpp"));
        };
        var test = function () {
            self.fs.copy(self.templatePath("test/CMakeLists.txt"), self.destinationPath("test/CMakeLists.txt"));
            self.fs.copy(self.templatePath("test/sample_test.cpp"), self.destinationPath("test/sample_test.cpp"));
        };
        gulpfile();
        packageJson();
        git();
        cmakefile();
        ext_libs();
        src();
        test();
    };
    MyGenerator.prototype.conflicts = function () {
        this.log("conflicts");
    };
    MyGenerator.prototype.install = function () {
        this.log("install");
    };
    return MyGenerator;
}(yo.Base));
module.exports = MyGenerator;
