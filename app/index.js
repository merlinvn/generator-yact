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
        var _this = this;
        var self = this;
        var gulpFiles = function () {
            self.log(_this.templatePath());
            self.copy("gulpfile.js", "gulpfile.js");
        };
        gulpFiles();
    };
    //  {
    //      ():void {
    //         this.log("Template path: " + this.templatePath());
    //     }
    // }
    MyGenerator.prototype.conflicts = function () {
        this.log("conflicts");
    };
    MyGenerator.prototype.install = function () {
        this.log("install");
    };
    MyGenerator.prototype.sayHello = function () {
        this.log("Hello World");
    };
    return MyGenerator;
}(yo.Base));
module.exports = MyGenerator;
