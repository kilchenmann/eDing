module.exports = {
  "packagerConfig": {
    "dir": "./dist",
    "ignore": [
        "^/[.]angular$",
        "^/[.]git$",
        "^/[.]gith$",
        "^/[.]yarn$",
        "^/node_modules$",
        "^/patches$",
        "^/src$",
        "^/[.]browserslistrc$",
        "^/[.]editorconfig$",
        "^/[.]gitignore$",
        "^/[.]yarnrc.yml$",
        "^/angular[.]json$",
        "^/forge[.]config[.]json$",
        "^/karma[.]conf[.]js$",
        "^/prepare-deployment[.]sh$",
        "^/temp[.]zip$",
        "^/tsconfig[.]app[.]json$",
        "^/tsconfig[.]eslint[.]json$",
        "^/tsconfig[.]json$",
        "^/tsconfig[.]spec[.]json$",
        "^/[.]editorconfig$",
        "^/yarn[.]lock$",
    ]
},
  "publishers": [
    {
      "name": "@electron-forge/publisher-github",
      "config": {
        "repository": {
          "owner": "AV-DIMAG",
          "name": "ech-0160-dimag-ingest"
        }
      }
    }
  ],
  "makers": [
    {
      "name": "@electron-forge/maker-squirrel",
      "config": {
        "name": "ech-0160-dimag-ingest"
      }
    },
    {
      "name": "@electron-forge/maker-zip",
      "platforms": [
        "darwin"
      ],
      "config": {
        "name": "ech-0160-dimag-ingest"
      }
    },
    {
      "name": "@electron-forge/maker-deb",
      "config": {}
    }
  ]
}
