#!/bin/bash

PWD=$(pwd)

PARENT_DIR="$(dirname "$PWD")"

SOURCE_PATH=$PARENT_DIR"/testdaten"
DEST_PATH=$PWD"/projects/ingest/src/lib/shared/testdata"

echo "Kopiere Testdaten e.g. metadata.xml von ../testdaten"

cp $SOURCE_PATH"/SIP_20070923_KOST_eCH0160_1_1_GEVER/header/metadata.xml"  $DEST_PATH"/SIP_20070923_KOST_eCH0160_1_1_GEVER.xml"
cp $SOURCE_PATH"/SIP_20220906_Bibliothek-Archiv-Aargau_POC-Test/header/metadata.xml" $DEST_PATH"/SIP_20220906_Bibliothek-Archiv-Aargau_POC-Test.xml"

