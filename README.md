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
yarn install
yarn postinstall
```

### Development server

Start the development server with `yarn start` and in a second terminal window the electron application with `yarn build:electron-dev`. This will open the app in electron automatically.

## Code scaffolding

Run `ng generate component [path][component-name]` to generate a new component in the app itself. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

> `Not yet full implemented`

Run `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

[Testcafe](https://testcafe.io/) is used as framework which makes it possible to run the tests directly in the electron application and not in the browser.

Run `yarn test-e2e` to execute the end-to-end tests.

## Build the app with electron

We are using [electron-forge](https://www.electronforge.io/) to start, build, package and publish the electron app:

* Run `yarn ef:start` to build and open the app with electron
* Run `yarn ef:package` to bundle the app code and to build an executable application (`.exe`, `.app`, `.deb` depending on the current OS).
* Run `yarn ef:make`, which uses `electron-forge package` first and creates separate distributable for each configured maker.

You'll find the result of `yarn ef:package` and `yarn ef:make` in the `./out` folder.

The command `yarn ef:publish` is only used in the [Github Actions](.github/workflows/main.yml) to publish the electron app and append the bundles (as zip-file) to the current release.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
