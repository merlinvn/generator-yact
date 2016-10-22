"use strict";
import yo = require("yeoman-generator");
import _ = require("lodash");
import chalk = require("chalk");
import yosay = require("yosay");
import path = require("path");

class MyGenerator extends yo.Base {
    /**
     *
     */
    applicationType: string;
    includeBoost: boolean;
    includeGsl: boolean;
    includeYamlCpp: boolean;
    testAppname: string;

    constructor(args: string | string[], options: any) {
        super(args, options);

        // this.argument("appname", { type: String, required: true, desc: "" });
        // this.appname = _.snakeCase(this.appname);
        // this.log("appname (arg): " + this.appname);
    }

    initializing() {
        this.log("initializing");
    }

    prompting() {
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
            
            self.includeBoost = _.includes(answer.includeLibs, "boost");
            self.includeGsl = _.includes(answer.includeLibs, "gsl");
            self.includeYamlCpp = _.includes(answer.includeLibs, "yaml-cpp");

            self.log(self.applicationType);
            self.log(String(self.includeBoost));
            self.log(String(self.includeGsl));
            self.log(String(self.includeYamlCpp));

            done();
        }.bind(this));
    }
    configuring() {
        this.log("configuring");
    }
    default() {
        this.log("default");
    }

    writing() {
        var self = this;
        var gulpfile = () => {
            self.fs.copy(
                self.templatePath("gulpfile.js"),
                self.destinationPath("gulpfile.js")
            );
        };

        var packageJson = () => {
            self.fs.copyTpl(
                self.templatePath("_package.json"),
                self.destinationPath("package.json"),
                {
                    appname: self.appname
                }
            );
        };

        var git = () => {
            self.fs.copy(
                self.templatePath(".gitignore"),
                self.destinationPath(".gitignore")
            );
        };
        var cmakefile = () => {
            self.fs.copyTpl(
                self.templatePath("_CMakeLists.txt"),
                self.destinationPath("CMakeLists.txt"),
                {
                    applicationType: self.applicationType,
                    appname: self.appname,
                    testAppname: self.testAppname
                }
            );
        };

        var ext_libs = () => {
            self.fs.copy(
                self.templatePath("ext/gtest/CMakeLists.txt"),
                self.destinationPath("ext/gtest/CMakeLists.txt")
            );
        };

        var src = () => {
            self.fs.copyTpl(
                self.templatePath("src/_CMakeLists.txt"),
                self.destinationPath("src/CMakeLists.txt"),
                {
                    applicationType: self.applicationType,
                    appname: _.snakeCase(self.appname)
                }
            );

            if (self.applicationType === "SA") {
                self.fs.copy(
                    self.templatePath("src/main.cpp"),
                    self.destinationPath("src/main.cpp")
                );
            } else if (self.applicationType === "MPI") {
                self.fs.copy(
                    self.templatePath("src/main_mpi.cpp"),
                    self.destinationPath("src/main.cpp")
                );
            }

        }

        var test = () => {
            self.fs.copy(
                self.templatePath("test/CMakeLists.txt"),
                self.destinationPath("test/CMakeLists.txt")
            );
            self.fs.copy(
                self.templatePath("test/sample_test.cpp"),
                self.destinationPath("test/sample_test.cpp")
            );
        }

        gulpfile();
        packageJson();
        git();
        cmakefile();
        ext_libs();
        src();
        test();
    }


    conflicts() {
        this.log("conflicts");
    }
    install() {
        this.log("install");
    }
}

export = MyGenerator; 