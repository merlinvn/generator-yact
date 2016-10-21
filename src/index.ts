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
        var gulpFiles = () => {
            self.log(this.templatePath());
            self.copy("gulpfile.js", "gulpfile.js");
        };

        gulpFiles();

    }


    //  {
    //      ():void {
    //         this.log("Template path: " + this.templatePath());
    //     }

    // }
    conflicts() {
        this.log("conflicts");
    }
    install() {
        this.log("install");
    }


    sayHello() {
        this.log("Hello World");
    }
}

export = MyGenerator; 