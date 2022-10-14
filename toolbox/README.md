# Toolbox App and Angular Library

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.2 and [YARN](https://yarnpkg.com) (instead npm!).

## First Steps

### Prerequisites

To develop or run the application locally, you have to install the following tools first:

* [node](https://nodejs.org/en/) v16.17.0
* [yarn](https://yarnpkg.com) v3.2.3
* [@angular/cli](https://cli.angular.io) v14.2.2

### Installation

Clone this repository:

```shell
git clone https://gitlab.com/av-dimag/ingest-poc.git
```

Install the dependencies with:

```shell
yarn install
```

### Development server

As we develop library packages, which will be published to npm, you have to build the library before running the application. There are two ways to run the build process in dev mode:

Build the library once:

```shell
yarn build-lib-dev
```

OR build the library with "watch". This helps to rerun the build process after each change in the library code:

```shell
yarn build-lib-dev-watch
```

Run the demo application:

```shell
ng s
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

If you want to run it in an own application window (with electron), you can do so by running `yarn app`.

## Code scaffolding

Run `ng generate component [path][component-name]` to generate a new component in the app itself. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Run `ng generate component [path][component-name] --project @av-dimag/ingest` to generate a new component (or directive, pipe, service etc.) in the library.

Run `ng generate library @av-dimag/[libray-name]` to generate a new library in the scope of "@av-dimag".

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

> `Not yet implemented`

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

> `Not yet implemented`

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
