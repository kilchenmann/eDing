module.exports = {
  "packagerConfig": {
    "dir": "./dist",
    "ignore": [
      "^/[.]angular$",
      "^/[.]git$",
      "^/[.]gith$",
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
          "owner": "av-dimag",
          "name": "ech-0160-dimag-ingest"
        }
      }
    }
  ],
  "makers": [
    // {
    //   "name": "@electron-forge/maker-dmg",
    //   "config": {}
    // },
    {
      "name": "@electron-forge/maker-deb",
      "config": {
        "options": {
          "maintainer": "AV DIMAG",
          "homepage": "https://avdimag.ch"
        }
      }
    },
    // {
    //   "name": "@electron-forge/maker-squirrel",
    //   "config": {
    //     "authors": "AV DIMAG",
    //     "description": "Standalone Applikation für die Vorbereitung eines DIMAG Ingests von eCH-0160 SIPs",
    //     "name": "ech-0160-dimag-ingest"
    //   }
    // },
    {
      "name": "@electron-forge/maker-zip",
      "platforms": [
        "darwin",
        "win32"
      ],
      "config": {
        "name": "ech-0160-dimag-ingest"
      }
    }
  ]
}
