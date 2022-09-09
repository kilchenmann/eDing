# Ingest: Proof of Concept

Dies ist das Repository für den Proof of Concept betreffend eCH-0160-Vorbereitung im DIMAG Ingest. 

## Struktur

Primär handelt es sich bei diesem Repository um ein temporäres Sammelsurium von Skripten, Konzept-Notizen und allfälligen Testdaten. Sobald wir ein Konzept erarbeitet haben und uns über die Funktionalität einer entsprechenden App oder eines IPM-Moduls einig sind, wird ein neues Repository eröffnet. Damit sich jeder in diesem Sammelsurium zurecht findet, folgt eine Auflistung inkl. Beschreibung der beinhaltenden Ordner:

### Mapping

Im Ingest Tool gibt es den *Quellelement Editor* für die Vorbereitung der Datenfelder im Mapping-Prozess. Eine manuelle Eingabe der vielen Elemente aus der eCH-0160-XML-Struktur kann relativ mühsam werden. Deshalb gibt es hier ein Bash-Skript, das die eCH-0160-Strukur als CSV (*ech-0160.csv*) in das DIMAG-Ingest-Tool-Quellelement-Profil (*ech-0160.iprf*) umwandelt. 

Das Script benötigt die CSV-Datei als Input `-i` und den Pfad der IPRF-Datei für den Output `-o`. Der Befehl sieht an unserem Beispiel wie folgt aus:

```shell
./prepare-ech0160-for-dimag.sh -i ech-0160.csv -o ech-0160.iprf
```

Die Datei *ech-0160.iprf* kann später im Ingest Tool geladen und für das Mapping direkt genutzt werden.


### Testdaten

In diesem Ordner werden die Test-SIPs abgelegt, die zum Ausprobieren der Skripte und des Ingest dienen sollen. Bspw. jenes der KOST: *KOST_SIP_20070923_eCH0160_1_1_GEVER*

### Toolbox

Toolbox beinhaltet Werkzeuge, um mit eCH-0160 umgehen zu können und SIPs für den DIMAG Ingest vorzubereiten. Toolbox ist eine Angular Appliaktion, in der wir die einzelnen Werkzeuge als Module entwickeln. In Angular als Library bezeichnet, werden sie in `projects/` abgelegt. Die Idee ist, dass wir diese Werkzeuge später einzeln als NPM Module extrahieren resp. publizieren können, und evt. im DIMAG IPM zu integrieren. Dies erlaubt uns eine gewisse flexibilität und modularität.