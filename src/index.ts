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
        this.log(yosay("Welcome to " + chalk.yellow("YACT (Yet Another C++ Template)") + " generator"));

        var done = this.async();
        return this.prompt({
            type: 'input',
            name: 'appname',
            message: 'C++ App Name',
            default: process.cwd().split(path.sep).pop()
        }).then(function (answer) {
            self.appname = answer.appname;  
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
                    appname: self.appname
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
                    appname: _.snakeCase(self.appname)
                }
            );
            self.fs.copy(
                self.templatePath("src/main_mpi.cpp"),
                self.destinationPath("src/main.cpp")
            );
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