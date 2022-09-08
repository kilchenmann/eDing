#!/bin/bash

set -e

dir=$(pwd)
sep='---------------------------------'

die() {
    echo >&2 "$@"
    exit 1
}

usage() {
    echo "usage: <command> -i [file] -o [file]"
    echo ${sep}
    echo "-i = csv file to create dimag source elements"
    echo "-o = iprf file for dimag source elements"
    echo ${sep}
}

# default variables
in=''
out=''

while getopts ':i:o:' OPTION; do
    case ${OPTION} in
    i) in=$OPTARG ;;
    o) out=$OPTARG ;;
    *) echo 'Unknown Parameter' ;;
    esac
done

# check the arguments: if they exists and if they are correct
if [ -z "$in" ]; then
    # must be given
    usage
    die "ERROR: The input file (-i) is missing"
else
    # check if the file exists
    if ! [ -f "$in" ]; then
        die "ERROR: The input file (-i) does not exists."
    else 
        # check if the format is correct
        if ! [[ $in == *.csv || $in == *.CSV ]]; then
            usage
            die "ERROR: The input file format is wrong. Should be .csv"
        fi
    fi
fi

if [ -z "$out" ]; then
    # must be given
    usage
    die "ERROR: The output file (-o) is missing"
else
    # check if the format is correct 
    if ! [[ $out == *.iprf ]]; then
        usage
        die "ERROR: The output file format is wrong. Should be .iprf"
    fi
fi

# line count to know last id
lc=$(cat $in | wc -l)
# echo $lc

# current date
now=$(date +'%Y-%m-%dT%T.%3N%:z')
# echo $now

# temporary xml file
FILE="temp-dimag-iprf.xml"

# write iprf file
echo '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' > $FILE
echo '<input lastsavedate="'$now'" nextid="'$lc'" version="1">' >> $FILE

# first id
id=1

# progress bar
PROGRESS='##########################################'
SIPMETA="M:\Documents\DIMAG\Testdaten\SIP_20220328_KOST_eCH1.2F_1a-3d-IO\header\metadata.xml"

exec < $in
read header
# echo $header

while IFS=";" read -r parentPath parentNode name addition label path level CRLF
do
    # progress indicator
    percent=$((100/$(($lc/$id))))
    status=$((42*$percent/100))
    echo -ne "\r $percent% | ${PROGRESS:0:$status}"

    # remove line break from last cell
    level=$(echo ${level//,/$'\n'})

    # ignore parents which are kind of container
    
    if [ "$level" == "parent_only" ]; then
        # do nothing, but adjust the id
        ((id=id-1))

    else

        # path value
        val="${path}/${name}"
        # in case of children
        if [ ! -z $addition ]; then
            val+="/$addition"
        fi

        # generate uuid
        uuid=$(printf "%04x%04x-%04x-%04x-%04x-%04x%04x%04x\n" $RANDOM $RANDOM $RANDOM $(($RANDOM & 0x0fff | 0x4000)) $(($RANDOM & 0x3fff | 0x8000)) $RANDOM $RANDOM $RANDOM)
        
        type="element"

        if [ "$level" == "per_file" ] || [ "$level" == "per_aip" ]; then
            type="metadata"
            val=$name
        fi
        
        # xml element per project
        echo -e "\t<inputelement>" >> $FILE
        echo -e "\t\t<id>$id</id>" >> $FILE
        echo -e "\t\t<uuid>$uuid</uuid>" >> $FILE
        echo -e "\t\t<type>$type</type>" >> $FILE
        echo -e "\t\t<name>$label</name>" >> $FILE
        echo -e "\t\t<value>$val</value>" >> $FILE
        echo -e "\t\t<list/>" >> $FILE
        echo -e "\t\t<description></description>" >> $FILE
        echo -e "\t\t<visible>true</visible>" >> $FILE
        echo -e "\t\t<fullpath>$SIPMETA</fullpath>" >> $FILE
        echo -e "\t\t<executionlevel>$level</executionlevel>" >> $FILE
        echo -e "\t\t<encoding>UTF-8</encoding>" >> $FILE

        # additional in case of xml element per aip or per file:
        # <filterbegin>metadata</filterbegin>
        # <filtercontains></filtercontains>
        # <filterend>.xml</filterend>

        # OR additional in case of metadata per project, per aip or per file:
        if [ "$level" == "per_file" ]; then
            echo -e "\t\t<assocValues>" >> $FILE
            echo -e "\t\t\t<elements/>" >> $FILE
            echo -e "\t\t</assocValues>" >> $FILE
        fi

        # OR additional in case of metadata per aip:
        if [ "$level" == "per_aip" ]; then
            echo -e "\t\t<assocValues>" >> $FILE
            echo -e "\t\t\t<elements>" >> $FILE
            echo -e "\t\t\t\t<entry>" >> $FILE
            echo -e "\t\t\t\t\t<key>pathslice</key>" >> $FILE
            echo -e "\t\t\t\t\t<value>1</value>" >> $FILE
            echo -e "\t\t\t\t</entry>" >> $FILE
            echo -e "\t\t\t</elements>" >> $FILE
            echo -e "\t\t</assocValues>" >> $FILE
        fi

        echo -e "\t</inputelement>" >> $FILE
    
    fi

    ((id=id+1))
done

echo '</input>' >> $FILE

mv $FILE $out
