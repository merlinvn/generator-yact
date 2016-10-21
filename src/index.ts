'use strict';
import yo = require('yeoman-generator');

class MyGenerator extends yo.Base {
   /**
    *
    */
   constructor() {
       super();
       
   }

    sayHello() {
        this.log("Hello World");
    }
}

 export = MyGenerator; 