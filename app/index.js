"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var yo = require("yeoman-generator");
var _ = require("lodash");
var chalk = require("chalk");
var yosay = require("yosay");
var path = require("path");
var MyGenerator = (function (_super) {
    __extends(MyGenerator, _super);
    function MyGenerator(args, options) {
        _super.call(this, args, options);
        // this.argument("appname", { type: String, required: true, desc: "" });
        // this.appname = _.snakeCase(this.appname);
        // this.log("appname (arg): " + this.appname);
    }
    MyGenerator.prototype.initializing = function () {
        this.log("initializing");
    };
    MyGenerator.prototype.prompting = function () {
        var self = this;
        self.log(yosay("Welcome to " + chalk.yellow("YACT (Yet Another C++ Template)") + " generator"));
        var done = this.async();
        return this.prompt([
            {
                type: "input",
                name: "appname",
                message: "C++ App Name",
                default: process.cwd().split(path.sep).pop()
            },
            {
                type: "input",
                name: "testAppname",
                message: "C++ Test App Name",
                default: process.cwd().split(path.sep).pop() + "_test"
            },
            {
                type: "list",
                name: "applicationType",
                message: "Select application type:",
                choices: [
                    {
                        name: "Singlethreaded application",
                        value: "SA"
                    },
                    {
                        name: "Multithreaded application with MPI",
                        value: "MPI"
                    }
                ]
            },
            {
                type: "list",
                name: "unitTestType",
                message: "Select unit test framework type:",
                choices: [
                    {
                        name: "Google Test",
                        value: "gtest"
                    },
                    {
                        name: "CATCH (C++ Automated Test Cases in Headers)",
                        value: "catch"
                    }
                ]
            },
            {
                type: "checkbox",
                name: "includeLibs",
                message: "Which C++ libraries would you like to include?",
                choices: [
                    {
                        name: "boost",
                        value: "boost",
                        checked: false
                    },
                    {
                        name: "gsl",
                        value: "gsl",
                        checked: false
                    },
                    {
                        name: "yaml-cpp",
                        value: "yaml-cpp",
                        checked: false
                    }
                ]
            }
        ]).then(function (answer) {
            self.appname = answer.appname;
            self.testAppname = answer.testAppname;
            self.applicationType = answer.applicationType;
            self.unitTestType = answer.unitTestType;
            self.includeBoost = _.includes(answer.includeLibs, "boost");
            self.includeGsl = _.includes(answer.includeLibs, "gsl");
            self.includeYamlCpp = _.includes(answer.includeLibs, "yaml-cpp");
            self.log(self.applicationType);
            self.log(String(self.includeBoost));
            self.log(String(self.includeGsl));
            self.log(String(self.includeYamlCpp));
            done();
        }.bind(this));
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
            self.fs.copyTpl(self.templatePath("_gulpfile.js"), self.destinationPath("gulpfile.js"), {
                appname: _.snakeCase(self.appname),
                testAppname: self.testAppname
            });
        };
        var packageJson = function () {
            self.fs.copyTpl(self.templatePath("_package.json"), self.destinationPath("package.json"), {
                appname: self.appname
            });
        };
        var git = function () {
            self.fs.copy(self.templatePath(".gitignore"), self.destinationPath(".gitignore"));
        };
        var cmakefile = function () {
            self.fs.copyTpl(self.templatePath("_CMakeLists.txt"), self.destinationPath("CMakeLists.txt"), {
                applicationType: self.applicationType,
                unitTestType: self.unitTestType,
                appname: _.snakeCase(self.appname),
                testAppname: self.testAppname,
                includeGsl: self.includeGsl,
                includeBoost: self.includeBoost,
                includeYamlCpp: self.includeYamlCpp
            });
        };
        var ext_libs = function () {
            if (self.unitTestType === "gtest") {
                self.fs.copy(self.templatePath("ext/gtest/CMakeLists.txt"), self.destinationPath("ext/gtest/CMakeLists.txt"));
            }
            else if (self.unitTestType === "catch") {
                self.fs.copy(self.templatePath("ext/catch/CMakeLists.txt"), self.destinationPath("ext/catch/CMakeLists.txt"));
            }
            if (self.includeYamlCpp) {
                self.fs.copy(self.templatePath("ext/yaml-cpp/CMakeLists.txt"), self.destinationPath("ext/yaml-cpp/CMakeLists.txt"));
            }
        };
        var src = function () {
            self.fs.copyTpl(self.templatePath("src/_CMakeLists.txt"), self.destinationPath("src/CMakeLists.txt"), {
                applicationType: self.applicationType,
                appname: _.snakeCase(self.appname),
                includeGsl: self.includeGsl,
                includeBoost: self.includeBoost,
                includeYamlCpp: self.includeYamlCpp
            });
            if (self.applicationType === "SA") {
                self.fs.copy(self.templatePath("src/main.cpp"), self.destinationPath("src/main.cpp"));
            }
            else if (self.applicationType === "MPI") {
                self.fs.copy(self.templatePath("src/main_mpi.cpp"), self.destinationPath("src/main.cpp"));
            }
        };
        var test = function () {
            self.fs.copyTpl(self.templatePath("test/_CMakeLists.txt"), self.destinationPath("test/CMakeLists.txt"), {
                unitTestType: self.unitTestType,
                includeGsl: self.includeGsl,
                includeBoost: self.includeBoost,
                includeYamlCpp: self.includeYamlCpp
            });
            if (self.unitTestType === "catch") {
                self.fs.copy(self.templatePath("test/main_catch.cpp"), self.destinationPath("test/main_catch.cpp"));
            }
            self.fs.copyTpl(self.templatePath("test/_sample_test.cpp"), self.destinationPath("test/sample_test.cpp"), {
                unitTestType: self.unitTestType
            });
            if (self.includeGsl) {
                self.fs.copyTpl(self.templatePath("test/_sample_gsl_test.cpp"), self.destinationPath("test/sample_gsl_test.cpp"), {
                    unitTestType: self.unitTestType
                });
            }
            if (self.includeYamlCpp) {
                self.fs.copyTpl(self.templatePath("test/_sample_yaml_cpp_test.cpp"), self.destinationPath("test/sample_yaml_cpp_test.cpp"), {
                    unitTestType: self.unitTestType
                });
            }
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
//# sourceMappingURL=index.js.map