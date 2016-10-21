'use strict';
import yo = require('yeoman-generator');

class MyGenerator extends yo.Base {
    /**
     *
     */
    constructor(args: string | string[], options: any) {
        super(args, options);

    }

    initializing() {
        this.log("initializing");
    }

    prompting() {
        this.log("prompting");
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
                    appname: "testapp"
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
                    appname: "testapp"
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
                    appname: "testapp"
                }
            );
            self.fs.copy(
                self.templatePath("src/main.cpp"),
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