# Yet Another Cpp Template Generator

>[Yeoman](http://yeoman.io) Generator that scaffolds out a cpp app using [gulp](http://gulpjs.com/) and [cmake](https://cmake.org/) for the build process

## Changelog

- 24/10/2016: Yact can include yaml-cpp, boost, gsl libraries to new project

## Features

* Automatically build and test with `gulp watch`
* Automatically generate and link test app with [googletest](https://github.com/google/googletest) and [googlemock](https://github.com/google/googlemock) framework.

## Getting Started

- Install dependencies: `npm install --global yo gulp-cli`
- Install the generator: `npm install --global generator-yact`
- Install dependent libraries for C++: 
    * `sudo apt-get install build-essential` 
    * `sudo apt-get install cmake` 
    * `sudo apt-get install openmpi-bin` 
    * `sudo apt-get install libopenmpi-dev` 
    * `sudo apt-get install libgsl-dev`
    * `sudo apt-get install libboost-all-dev` 
    
- Run `yo yact` to scaffold your cpp app
- Run `gulp watch` to preview and watch for changes
- Run `gulp cmake` to make `build` directory
- Run `gulp build` to build app
- Run `gulp test` to run basic test

## Docs

*** (TBD)

## Options

*** (TBD)

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)