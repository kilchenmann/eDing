const path = require('path');

module.exports = {
  "packagerConfig": {
    "icon": path.resolve(__dirname, "src", "app", "assets", "icons", "icon"),
    "dir": "./dist",
    "ignore": [
      "^/[.]angular$",
      "^/[.]git$",
      "^/[.]github$",
      "^/[.]yarn$",
      "^/node_modules$",
      "^/out$",
      "^/patches$",
      "^/src$",
      "^/testdata$",
      "^/testcafe-tests$",
      "^/[.]browserslistrc$",
      "^/[.]editorconfig$",
      "^/[.]eslintrc[.]js$",
      "^/[.]gitignore$",
      "^/[.]testcafe-electron-rc[.]json$",
      "^/[.]yarnrc.yml$",
      "^/angular[.]json$",
      "^/karma[.]conf[.]js$",
      "^/temp[.]zip$",
      "^/README[.]md$",
      "^/sip[.]zip$",
      "^/tsconfig[.]app[.]json$",
      "^/tsconfig[.]eslint[.]json$",
      "^/tsconfig[.]json$",
      "^/tsconfig[.]spec[.]json$",
      "^/yarn[.]lock$",
    ]
  },
  "publishers": [
    {
      "name": "@electron-forge/publisher-github",
      "config": {
        "repository": {
          "owner": "kilchenmann",
          "name": "eding"
        }
      }
    }
  ],
  "makers": [
    {
      "name": "@electron-forge/maker-deb",
      "config": {
        "options": {
          "maintainer": "AV DIMAG",
          "homepage": "https://avdimag.ch",
          "icon": path.resolve(__dirname, "src", "app", "assets", "icons", "icon.png")
        }
      }
    },
    {
      "name": "@electron-forge/maker-squirrel",
      "config": {
        "authors": "AV DIMAG",
        "description": "Standalone Applikation für die Vorbereitung eines DIMAG Ingests von eCH-0160 SIPs",
        "name": "ech-0160-dimag-ingest",
        "setupIcon": path.resolve(__dirname, "src", "app", "assets", "icons", "icon.ico"),
      }
    },
    {
      "name": "@electron-forge/maker-zip",
      "platforms": [
        "darwin",
        "win32",
        "win64",
        "linux"
      ],
      "config": {
        "name": "ech-0160-dimag-ingest"
      }
    }
  ]
}
