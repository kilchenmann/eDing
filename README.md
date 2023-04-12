# eCH-0160 DIMAG Ingest

[![CI/CD](https://github.com/av-dimag/ech-0160-dimag-ingest/actions/workflows/main.yml/badge.svg)](https://github.com/av-dimag/ech-0160-dimag-ingest/actions/workflows/main.yml)
<!-- [![GitHub release (latest by date)](https://img.shields.io/github/v/release/av-dimag/ech-0160-dimag-ingest)](https://github.com/av-dimag/ech-0160-dimag-ingest/releases/latest) -->

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.2 and [YARN](https://yarnpkg.com) (instead npm!). **Please read  [our developer guidelines](https://av-dimag.github.io/guidelines/) for contribution.**

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
yarn install-with-patch
```

### Development server

There are two ways to run the Elektron application locally. In both cases, the application is rebuilt when changes are made to the code. 

One way is the classical one with Angular running in the background on `http://localhost:4200` and using the basic electron build-command to run the Electron application in the foreground. Running the app in a browser is not recommended because of "read file system" which will not work from browser-side.

The other way uses the Angular build command with the --watch parameter and the electron-forge setup which is also used in the publish and deployment process

#### On localhost

Start the development server with `yarn serve` and in a second terminal window start the electron application with `yarn electron:dev`. This will open the app whithin electron automatically.

#### As build

Build the app with `yarn build:watch` and in a second terminal window start the electron application with `yarn electron`. This will open the app whithin electron automatically.



## Code scaffolding

Run `ng generate component [path][component-name]` to generate a new component in the app itself. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

> `Not yet full implemented`

Run `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

[Testcafe](https://testcafe.io/) is used as framework which makes it possible to run the tests directly in the electron application and not in the browser.

Run `yarn e2e` to execute the end-to-end tests.

## Build the app with electron

We are using [electron-forge](https://www.electronforge.io/) to start, build, package and publish the electron app:

* Run `yarn electron` to open the app with electron. This commands needs a build first. To do so run `yarn build`.
* Run `yarn package` to bundle the app code and to build an executable application (`.exe`, `.app`, `.deb` depending on the current OS).
* Run `yarn make`, which uses `electron-forge package` first and creates separate distributable for each configured maker.

You'll find the result of `yarn package` and `yarn make` in the `./out` folder.

The command `yarn publish` is only used in the [Github Actions](.github/workflows/main.yml) to publish the electron app and append the bundles (as zip-file) to the current release.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
