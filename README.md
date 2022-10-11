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

In diesem Ordner werden die Test-SIPs und AIPs abgelegt. Diese dienen zum Ausprobieren der Skripte und des Ingests. Bspw. jenes der KOST: *SIP_20070923_KOST_eCH0160_1_1_GEVER* oder ein komplexeres Paket des Kantons Aargau: *SIP_20220906_Bibliothek-Archiv-Aargau_POC-Test*

Das *AIP_20070923_KOST_eCH0160_1_1_GEVER* beinhaltet drei AIPs, die aus dem oben genannten SIP (vorerst manuell) erstellt wurde. Es ist ein einfaches, in der Struktur flaches Beispiel. Jeder Ordner entspricht einem AIP mit den einzelnen Dokumenten und dem zusätzlichen *metadata.xml*. Das XML sollte dem eCH-0160 Standard entsprechen und wird später vom Script in der Toolbox erstellt. Darin befinden sich die Informationen aus der vorherigen SIP-Ebene (Ablieferung und allgemeines zum Paket) und zu den einzelnen Dokumenten oder Dossiers (sofern vorhanden).

### Toolbox

Die Toolbox als App und Angular Library hat ein eigenes [technisches README](toolbox/README.md).

Toolbox beinhaltet Werkzeuge, um mit eCH-0160 umgehen zu können und SIPs für den DIMAG Ingest vorzubereiten. Toolbox ist eine Angular Appliaktion, in der wir die einzelnen Werkzeuge als Module entwickeln. In Angular als Library bezeichnet, werden sie in `projects/` abgelegt. Die Idee ist, dass wir diese Werkzeuge später einzeln als NPM Module extrahieren resp. publizieren können, und evt. im DIMAG IPM zu integrieren. Dies erlaubt uns eine gewisse flexibilität und modularität.

Die Idee der Tools und des POC:

Das *metadata.xml* beinhaltet eine Bemerkung, die bspw. im PackageHandler pro AIP hinzugefügt wurde:

```xml
<zusatzDaten>
    <merkmal name="AIP">3</merkmal>
</zusatzDaten>
````

> Diskussion: Die Bemerkung sollte auf der obersten Ebene des AIP stehen und nur einmal vorkommen. In den Beispieldaten *SIP_20220906_Bibliothek-Archiv-Aargau_POC-Test* kommt die Bezeichnung bspw. "AIP = 1" jedoch mehrmals vor.

Das AIP kann aus mehreren Ordnern und/oder Dateien bestehen. Primär gibt es die Ordnerebene, die im *metadata.xml* im Element `Dossier` beschrieben wird. Ein Dossier kann jeweils mehrere Dossiers beinhalten. Der erste Pfad lautet `/paket/ablieferung/ordnungssystem/ordnungssystemposition/dossier`. Ich gehe davon aus, dass wir den Dossier-Element-Block in den Ordner des jeweiligen AIPs schreiben.

Ein paar Informationen zu den einzelenen Dateien innerhalb eines Dossiers befinden sich im Elemente-Block `Inhaltsverzeichnis` unter `Ordner`. Auch hier kann ein Ordner wiederum mehrere Ordner beinhalten. Das Auffinden der einzelnen Datei-Information ist aufgrund der Verschachtelung etwas komplexer, sollte aber über die `ID` im `dossier/dateiRef` zu finden sein.
