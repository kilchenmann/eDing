#!/bin/bash

# Hier wird das deployment der electron app vorbereitet.

# Build the angular app in prod mode; this will create the dist folder with the ech-0160-dimag-ingest app inside
yarn build

# copy some files to the dist folder to help building the electron app later
cp -r patches dist/
cp .gitignore dist/
cp CHANGELOG.md dist/
cp forge.config.js dist/
cp main.js dist/
cp package.json dist/
cp yarn.lock dist/

# create a hidden github folder with the workflows
mkdir dist/.github
mkdir dist/.github/workflows
cp .github/workflows/publish.yml dist/.github/workflows/
