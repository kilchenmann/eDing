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

while IFS=";" read -r parentPath parentNode name addition label path xmlType level CRLF
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
        
        # check path root: paket or dossier
        xmlPrefix="metadata"
        xmlSuffix=""
        # $(echo "$path" | cut -d "/" -f2)

        # type="element"

        if [ "$xmlType" == "metadata" ]; then
            val=$name
        fi
        
        # xml element per project
        echo -e "\t<inputelement>" >> $FILE
        echo -e "\t\t<id>$id</id>" >> $FILE
        echo -e "\t\t<uuid>$uuid</uuid>" >> $FILE
        echo -e "\t\t<type>$xmlType</type>" >> $FILE
        echo -e "\t\t<name>$label</name>" >> $FILE
        echo -e "\t\t<value>$val</value>" >> $FILE
        echo -e "\t\t<list/>" >> $FILE
        echo -e "\t\t<description></description>" >> $FILE
        echo -e "\t\t<visible>true</visible>" >> $FILE
        echo -e "\t\t<fullpath></fullpath>" >> $FILE
        echo -e "\t\t<executionlevel>$level</executionlevel>" >> $FILE
        echo -e "\t\t<encoding>UTF-8</encoding>" >> $FILE
        echo -e "\t\t<filterbegin>$xmlPrefix</filterbegin>" >> $FILE
        echo -e "\t\t<filtercontains>$xmlSuffix</filtercontains>" >> $FILE
        echo -e "\t\t<filterend>.xml</filterend>" >> $FILE

        # in case of xml type reference, the inputelement needs additional elements
        if [ "$xmlType" == "reference" ]; then
            echo -e "\t\t<assocValues>" >> $FILE
            echo -e "\t\t\t<elements>" >> $FILE
            echo -e "\t\t\t\t<entry>" >> $FILE
            echo -e "\t\t\t\t\t<key>xmlreferenceout</key>" >> $FILE
            echo -e "\t\t\t\t\t<value>../$name</value>" >> $FILE
            echo -e "\t\t\t\t</entry>" >> $FILE        
            echo -e "\t\t\t\t<entry>" >> $FILE
            echo -e "\t\t\t\t\t<key>xmlreferencesource</key>" >> $FILE
            echo -e "\t\t\t\t\t<value>/paket/ablieferung/ordnungssystem/ordnungssystemposition/dossier/dokument/dateiRef</value>" >> $FILE
            echo -e "\t\t\t\t</entry>" >> $FILE        
            echo -e "\t\t\t\t<entry>" >> $FILE
            echo -e "\t\t\t\t\t<key>xmlreferencecustompath</key>" >> $FILE
            echo -e "\t\t\t\t\t<value>false</value>" >> $FILE
            echo -e "\t\t\t\t</entry>" >> $FILE
            echo -e "\t\t\t</elements>" >> $FILE
            echo -e "\t\t</assocValues>" >> $FILE
        fi
        
        if [ "$xmlType" == "metadata" ]; then

            if [ "$level" == "per_file" ]; then
                echo -e "\t\t<assocValues>" >> $FILE
                echo -e "\t\t\t<elements/>" >> $FILE
                echo -e "\t\t</assocValues>" >> $FILE
            fi
            
            if [ "$level" == "per_aip" ]; then
                echo -e "\t\t<assocValues>" >> $FILE
                echo -e "\t\t\t<elements>" >> $FILE
                echo -e "\t\t\t\t<entry>" >> $FILE
                echo -e "\t\t\t\t\t<key>$name</key>" >> $FILE
                echo -e "\t\t\t\t\t<value>1</value>" >> $FILE
                echo -e "\t\t\t\t</entry>" >> $FILE
                echo -e "\t\t\t</elements>" >> $FILE
                echo -e "\t\t</assocValues>" >> $FILE
            fi
            
        fi

        echo -e "\t</inputelement>" >> $FILE
    
    fi

    ((id=id+1))
done


echo '</input>' >> $FILE

mv $FILE $out
