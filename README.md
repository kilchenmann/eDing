# eCH-0160 DIMAG Ingest

[![CI](https://github.com/av-dimag/ech-0160-dimag-ingest/actions/workflows/build.yml/badge.svg)](https://github.com/av-dimag/ech-0160-dimag-ingest/actions/workflows/build.yml)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/av-dimag/ech-0160-dimag-ingest)](https://github.com/av-dimag/ech-0160-dimag-ingest/releases/latest)

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

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
