#!/bin/bash

# SIP testdaten
SIPS=(
  "SIP_20070923_KOST_eCH0160_1_1_GEVER"
  "SIP_20220906_Bibliothek-Archiv-Aargau_POC-Test"
)

PWD=$(pwd)

PARENT_DIR="$(dirname "$PWD")"

SOURCE_PATH=$PARENT_DIR"/testdaten"
DEST_PATH=$PWD"/src/assets/testdata"

echo "Kopiere Testdaten: metadata.xml von ../testdaten nach ./src/assets/testdata"

for sip in "${SIPS[@]}"
do
  # copy if doesn't exist yet
  if [ ! -f $DEST_PATH"/"$sip".xml" ]; then
    echo $sip" wird kopiert"
    cp $SOURCE_PATH"/"$sip"/header/metadata.xml" $DEST_PATH"/"$sip".xml"
  else
    echo $sip" existiert bereits"
  fi
done

