import * as Primitive from '../../xml-primitives';

// Source files:
// http://localhost:8080/ablieferung.xsd
// http://localhost:8080/archivischeNotiz.xsd
// http://localhost:8080/archivischerVorgang.xsd
// http://localhost:8080/arelda.xsd
// http://localhost:8080/base.xsd
// http://localhost:8080/datei.xsd
// http://localhost:8080/dokument.xsd
// http://localhost:8080/dossier.xsd
// http://localhost:8080/ordner.xsd
// http://localhost:8080/ordnungssystem.xsd
// http://localhost:8080/ordnungssystemposition.xsd
// http://localhost:8080/paket.xsd
// http://localhost:8080/provenienz.xsd
// http://localhost:8080/zusatzDaten.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
/** Organisationseinheit, welche die abzuliefernden Unterlagen aufbereitet (der Name wird ausgeschrieben, keine Abkürzung), und Name der Person, die für die Ablieferung zuständig ist. */
export type ablieferndeStelle = string;
type _ablieferndeStelle = _text2;

interface _ablieferung extends BaseType {
	ablieferndeStelle: string;
	ablieferungsteile?: string;
	ablieferungstyp: ablieferungstyp;
	bemerkung?: string;
	/** Der Entstehungszeitraum der Ablieferung wird aus dem ältesten Entstehungsdatum und dem jüngsten Datum der Dokumente oder Dateien ermittelt, die der Ablieferung zugeordneten  sind. Der Zeitraum kann auch geschätzt sein. */
	entstehungszeitraum?: historischerZeitraum;
	unstrukturierterAnhang?: unstrukturierterAnhang[];
	zusatzDaten?: zusatzDaten;
}
export interface ablieferung extends _ablieferung { constructor: { new(): ablieferung }; }
export var ablieferung: { new(): ablieferung };

interface _ablieferungAIP extends _ablieferung {
	ablieferungsnummer: string;
	angebotsnummer?: string;
	referenzBewertungsentscheid?: string;
	referenzSchutzfristenFormular?: string;
	schutzfrist?: string;
	schutzfristenkategorie?: string;
}
export interface ablieferungAIP extends _ablieferungAIP { constructor: { new(): ablieferungAIP }; }
export var ablieferungAIP: { new(): ablieferungAIP };

interface _ablieferungDIP extends _ablieferung {
	ablieferungsnummer: string;
	archivischeNotiz?: archivischeNotiz[];
}
export interface ablieferungDIP extends _ablieferungDIP { constructor: { new(): ablieferungDIP }; }
export var ablieferungDIP: { new(): ablieferungDIP };

interface _ablieferungFilesAIP extends _ablieferungAIP {
	ordnungssystem: ordnungssystemFilesAIP;
	provenienz: provenienzFilesAIP;
}
export interface ablieferungFilesAIP extends _ablieferungFilesAIP { constructor: { new(): ablieferungFilesAIP }; }
export var ablieferungFilesAIP: { new(): ablieferungFilesAIP };

interface _ablieferungFilesDIP extends _ablieferungDIP {
	ordnungssystem: ordnungssystemFilesDIP;
	provenienz: provenienzFilesDIP;
}
export interface ablieferungFilesDIP extends _ablieferungFilesDIP { constructor: { new(): ablieferungFilesDIP }; }
export var ablieferungFilesDIP: { new(): ablieferungFilesDIP };

interface _ablieferungFilesSIP extends _ablieferungSIP {
	ordnungssystem: ordnungssystemFilesSIP;
	provenienz: provenienzFilesSIP;
}
export interface ablieferungFilesSIP extends _ablieferungFilesSIP { constructor: { new(): ablieferungFilesSIP }; }
export var ablieferungFilesSIP: { new(): ablieferungFilesSIP };

interface _ablieferungGeverAIP extends _ablieferungAIP {
	ordnungssystem: ordnungssystemGeverAIP;
	provenienz: provenienzGeverAIP;
}
export interface ablieferungGeverAIP extends _ablieferungGeverAIP { constructor: { new(): ablieferungGeverAIP }; }
export var ablieferungGeverAIP: { new(): ablieferungGeverAIP };

interface _ablieferungGeverDIP extends _ablieferungDIP {
	ordnungssystem: ordnungssystemGeverDIP;
	provenienz: provenienzGeverDIP;
}
export interface ablieferungGeverDIP extends _ablieferungGeverDIP { constructor: { new(): ablieferungGeverDIP }; }
export var ablieferungGeverDIP: { new(): ablieferungGeverDIP };

interface _ablieferungGeverSIP extends _ablieferungSIP {
	ordnungssystem: ordnungssystemGeverSIP;
	provenienz: provenienzGeverSIP;
}
export interface ablieferungGeverSIP extends _ablieferungGeverSIP { constructor: { new(): ablieferungGeverSIP }; }
export var ablieferungGeverSIP: { new(): ablieferungGeverSIP };

interface _ablieferungSIP extends _ablieferung {
	ablieferungsnummer?: string;
	angebotsnummer?: string;
	archivischeNotiz?: archivischeNotiz[];
	referenzBewertungsentscheid?: string;
	referenzSchutzfristenFormular?: string;
	schutzfrist?: string;
	schutzfristenkategorie?: string;
}
export interface ablieferungSIP extends _ablieferungSIP { constructor: { new(): ablieferungSIP }; }
export var ablieferungSIP: { new(): ablieferungSIP };

/** Die Ablieferungsnummer dient zur Identifizierung der Ablieferung im Archiv. Sie besteht in der Regel aus dem Ablieferungsjahr und einer Laufnummer innerhalb dieses Jahres. Die Ablieferungsnummer kann auch Buchstaben enthalten. */
export type ablieferungsnummer = string;
type _ablieferungsnummer = _text1;

/** Angabe über den gesamten Inhalt der Ablieferung (sowohl der digitalen als auch der nicht digitalen Teile). */
export type ablieferungsteile = string;
type _ablieferungsteile = _text3;

/** Angabe darüber, aus welcher Umgebung die Ablieferung stammt. */
export type ablieferungstyp = ("GEVER" | "FILES");
interface _ablieferungstyp extends Primitive._string { content: ablieferungstyp; }

/** Tag, an dem die Aktivität abgeschlossen worden ist. */
export type abschlussdatumAktivitaet = string;
type _abschlussdatumAktivitaet = Primitive._string;

/** Kurze Beschreibung des Ergebnisses der Aktivität. */
export type abschlussvermerkAktivitaet = string;
type _abschlussvermerkAktivitaet = _text4;

/** Bezeichnung der Stelle, der Organisationseinheit oder der Person(en), welche die Unterlagen oder die Datensammlung erstellt oder geführt hat. Falls der Aktenbildner unbekannt ist, muss die Angabe "Aktenbildner unbekannt" eingetragen werden. */
export type aktenbildnerName = string;
type _aktenbildnerName = _text2;

/** Identifikation und Ordnungsmerkmal des Dossiers. Das Aktenzeichen erlaubt es, das Dossier innerhalb eines bestimmten Ablagesystems einer eindeutigen Position (Rubrik) des OS zuzuordnen. */
export type aktenzeichen = string;
type _aktenzeichen = _text2;

/** Akteur, welcher die Aktivität durchführt. Im Organigramm bzw. den Organisationsvorschriften der Verwaltungseinheit aufgeführte Rollen bzw. Personen. */
export type akteurAktivitaet = string;
type _akteurAktivitaet = _text2;

interface _aktivitaet extends BaseType {
	order?: number;
	abschlussdatum?: string;
	abschlussvermerk?: string;
	akteur?: string;
	bemerkung?: string[];
	verweis?: string[];
	vorschreibung: string;
}
export interface aktivitaet extends _aktivitaet { constructor: { new(): aktivitaet }; }
export var aktivitaet: { new(): aktivitaet };

/** Die vom Archiv vergebene Nummer des Angebots, auf welches sich die Ablieferung stützt. */
export type angebotsnummer = string;
type _angebotsnummer = _text1;

/** Kategorisierung des Dokuments in Bezug auf seinen Anwendungsbereich in der Verwaltungseinheit. */
export type anwendung = string;
type _anwendung = _text2;

/** Arbeitsanweisung, bzw.Auftragsbeschreibung: Vorgaben und Hinweise für die Durchführung und Erledigung. */
export type arbeitsanweisungVorgang = string;
type _arbeitsanweisungVorgang = _text4;

/** Angaben darüber, auf welche Weise die Daten aus dem System archiviert werden, allfällige Löschvorschriften, Angaben darüber, welche Funktionalitäten des Originalsystems nicht archiviert werden konnten, und vereinbartes Intervall der Ablieferungen sind hier zu nennen. */
export type archivierungsmodusLoeschvorschriften = string;
type _archivierungsmodusLoeschvorschriften = _text4;

interface _archivischeNotiz extends BaseType {
	id: string;
	notizBeschreibung: string;
	notizDatum: string;
	notizErfasser?: string;
}
export interface archivischeNotiz extends _archivischeNotiz { constructor: { new(): archivischeNotiz }; }
export var archivischeNotiz: { new(): archivischeNotiz };

interface _archivischerVorgang extends BaseType {
	bearbeiter: string;
	beschreibung: string;
	/** Zeitpunkt, zu welchem der archivische Vorgang durchgeführt wurde. */
	datum: zeitraum;
	vorgangstyp: string;
}
export interface archivischerVorgang extends _archivischerVorgang { constructor: { new(): archivischerVorgang }; }
export var archivischerVorgang: { new(): archivischerVorgang };

/** Verfasser eines Dokuments. */
export type autor = string;
type _autor = _text4;

/** Name der Person, die den archivischen Vorgang durchgeführt hat. */
export type bearbeiter = string;
type _bearbeiter = _text2;

/** Zusätzliche Informationen, welche die Ablieferung und ihre Entstehung betreffen. Wenn die Unterlagen in der Ablieferung aus einer periodisierten Registratur stammen, kann hier die Registraturperiode angegeben werden. */
export type bemerkungAblieferung = string;
type _bemerkungAblieferung = _text4;

/** Informationen, die für die Aktivität von Bedeutung sind. */
export type bemerkungAktivitaet = string;
type _bemerkungAktivitaet = _text4;

/** Verschiedene Informationen, die in Zusammenhang mit dem Dokument, seiner Entstehung und allfälligen Veränderungen festgehalten werden müssen. */
export type bemerkungDokument = string;
type _bemerkungDokument = _text4;

/** Zusätzliche Informationen, welche das Dossier oder die Datensammlung betreffen. Hier können nähere Angaben zur Sprache und zu speziellen technischen Anforderungen eingetragen werden, welche den Zugang der Daten einschränken könnten. */
export type bemerkungDossier = string;
type _bemerkungDossier = _text4;

/** Zusätzliche Informationen, welche das Ordnungssystem betreffen. */
export type bemerkungOrdnungssysstem = string;
type _bemerkungOrdnungssysstem = _text4;

/** Zusätzliche Informationen, die den Aktenbildner und die Herkunft der Unterlagen oder der Datensammlung betreffen. */
export type bemerkungProvenienz = string;
type _bemerkungProvenienz = _text4;

/** Nachweis und Resultat der durchgeführten Tätigkeit. */
export type beschreibung = string;
type _beschreibung = _text4;

export type ca = boolean;
type _ca = Primitive._boolean;

interface _comparable extends BaseType {}
export interface comparable extends _comparable { constructor: { new(): comparable }; }
export var comparable: { new(): comparable };

interface _datei extends BaseType {
	id: string;
	/** Name und Wert von technischen Eigenschaften der Dateien wie z.B. Felddelemiter. */
	eigenschaft?: eigenschaftDatei[];
	name: string;
	originalName?: string;
	pruefalgorithmus: pruefalgorithmus;
	pruefsumme: string;
}
export interface datei extends _datei { constructor: { new(): datei }; }
export var datei: { new(): datei };

interface _dateiAIP extends _datei {}
export interface dateiAIP extends _dateiAIP { constructor: { new(): dateiAIP }; }
export var dateiAIP: { new(): dateiAIP };

interface _dateiDIP extends _datei {
	archivischeNotiz?: archivischeNotiz[];
}
export interface dateiDIP extends _dateiDIP { constructor: { new(): dateiDIP }; }
export var dateiDIP: { new(): dateiDIP };

export type dateiRef = string;
type _dateiRef = Primitive._string;

interface _dateiSIP extends _datei {
	archivischeNotiz?: archivischeNotiz[];
}
export interface dateiSIP extends _dateiSIP { constructor: { new(): dateiSIP }; }
export var dateiSIP: { new(): dateiSIP };

/** Markierung, die angibt, ob das Dokument besonders schützenswerte Personendaten oder Persönlichkeitsprofile gemäss Datenschutzrecht Art 3. */
export type datenschutzDokument = boolean;
type _datenschutzDokument = Primitive._boolean;

/** Markierung, die angibt, ob sich in den Dokumenten des Dossiers besonders schützenswerten Personendaten oder Persönlichkeitsprofilen gemäss Datenschutzrecht. */
export type datenschutzDossier = boolean;
type _datenschutzDossier = Primitive._boolean;

/** Markierung, die angibt, ob sich in den Unterlagen der Ordnungssystemposition solche mit besonders schützenswerten Personendaten oder Persönlichkeitsprofilen gemäss Datenschutzgesetz. */
export type datenschutzOrdnungssystemposition = boolean;
type _datenschutzOrdnungssystemposition = Primitive._boolean;

/** Zeitpunkte: the following values are possible by date type 1 regular expression
  * historische Anwendung
  * 31.01.2004
  * ca.31.01.2004
  * 2004
  * ca.2004
  * keine Angabe */
export type datumTypA = string;
type _datumTypA = Primitive._string;

/** Zeitpunkte: the following values are possible by date type 3 regular expression
  * technische Anwendung
  * Date Data Type (xs:date)
  * The date is specified in the following form "YYYY-MM-DD" where:
  * * YYYY indicates the year
  * * MM indicates the month
  * * DD indicates the day
  * Note: All components are required!
  *
  * DateTime Data Type (xs:dateTime)
  * The dateTime data type is used to specify a date and a time.
  * The dateTime is specified in the following form "YYYY-MM-DDThh:mm:ss" where:
  * * YYYY indicates the year
  * * MM indicates the month
  * * DD indicates the day
  * * T indicates the start of the required time section
  * * hh indicates the hour
  * * mm indicates the minute
  * * ss indicates the second
  * Note: All components are required! */
export type datumTypB = string;
type _datumTypB = Primitive._string;

interface _dokument extends BaseType {
	id: string;
	autor?: string[];
	bemerkung?: string;
	dateiRef?: string[];
	datenschutz?: boolean;
	dokumenttyp?: string;
	/** Zeitliche Angabe über die Entstehung des Dokuments. Als Entstehung des Dokuments kann das Datum seiner Erstellung angegeben werden, oder den Zeitraum, in dem das Dokument entstanden ist (aus dem ältesten Entstehungsdatum und dem jüngsten Datum des Dokuments ermittelt). Der Zeitraum kann auch geschätzt sein. */
	entstehungszeitraum?: historischerZeitraum;
	erscheinungsform: erscheinungsformDokument;
	klassifizierungskategorie?: string;
	oeffentlichkeitsstatus?: string;
	oeffentlichkeitsstatusBegruendung?: string;
	/** Zeitpunkt an welchem das Dokument im System einem Dossier zugeordnet worden ist. */
	registrierdatum?: historischerZeitpunkt;
	sonstigeBestimmungen?: string;
	titel: string;
	zusatzDaten?: zusatzDaten;
}
export interface dokument extends _dokument { constructor: { new(): dokument }; }
export var dokument: { new(): dokument };

interface _dokumentFiles extends _dokument {}
export interface dokumentFiles extends _dokumentFiles { constructor: { new(): dokumentFiles }; }
export var dokumentFiles: { new(): dokumentFiles };

interface _dokumentFilesAIP extends _dokumentFiles {}
export interface dokumentFilesAIP extends _dokumentFilesAIP { constructor: { new(): dokumentFilesAIP }; }
export var dokumentFilesAIP: { new(): dokumentFilesAIP };

interface _dokumentFilesDIP extends _dokumentFiles {
	archivischeNotiz?: archivischeNotiz[];
}
export interface dokumentFilesDIP extends _dokumentFilesDIP { constructor: { new(): dokumentFilesDIP }; }
export var dokumentFilesDIP: { new(): dokumentFilesDIP };

interface _dokumentFilesSIP extends _dokumentFiles {
	archivischeNotiz?: archivischeNotiz[];
}
export interface dokumentFilesSIP extends _dokumentFilesSIP { constructor: { new(): dokumentFilesSIP }; }
export var dokumentFilesSIP: { new(): dokumentFilesSIP };

interface _dokumentGever extends _dokument {
	anwendung?: string;
}
export interface dokumentGever extends _dokumentGever { constructor: { new(): dokumentGever }; }
export var dokumentGever: { new(): dokumentGever };

interface _dokumentGeverAIP extends _dokumentGever {}
export interface dokumentGeverAIP extends _dokumentGeverAIP { constructor: { new(): dokumentGeverAIP }; }
export var dokumentGeverAIP: { new(): dokumentGeverAIP };

interface _dokumentGeverDIP extends _dokumentGever {
	archivischeNotiz?: archivischeNotiz[];
}
export interface dokumentGeverDIP extends _dokumentGeverDIP { constructor: { new(): dokumentGeverDIP }; }
export var dokumentGeverDIP: { new(): dokumentGeverDIP };

interface _dokumentGeverSIP extends _dokumentGever {
	archivischeNotiz?: archivischeNotiz[];
}
export interface dokumentGeverSIP extends _dokumentGeverSIP { constructor: { new(): dokumentGeverSIP }; }
export var dokumentGeverSIP: { new(): dokumentGeverSIP };

/** Aussehen des Dokuments, das zu erhalten ist. */
export type dokumenttyp = string;
type _dokumenttyp = _text3;

interface _dossier extends BaseType {
	id: string;
	bemerkung?: string;
	datenschutz?: boolean;
	/** Der Entstehungszeitraum des Dossiers wird aus dem ältesten Entstehungsdatum und dem jüngsten (Änderungs)datum aller dem Dossier zugeordneten Dokumente oder Dateien ermittelt. Der Zeitraum kann auch geschätzt sein. */
	entstehungszeitraum: historischerZeitraum;
	entstehungszeitraumAnmerkung?: string;
	erscheinungsform?: erscheinungsformDossier;
	federfuehrendeOrganisationseinheit?: string;
	formInhalt?: string;
	inhalt?: string;
	klassifizierungskategorie?: string;
	oeffentlichkeitsstatus?: string;
	oeffentlichkeitsstatusBegruendung?: string;
	sonstigeBestimmungen?: string;
	titel: string;
	zusatzDaten?: zusatzDaten;
	zusatzmerkmal?: string;
}
export interface dossier extends _dossier { constructor: { new(): dossier }; }
export var dossier: { new(): dossier };

interface _dossierFiles extends _dossier {
	aktenzeichen?: string;
}
export interface dossierFiles extends _dossierFiles { constructor: { new(): dossierFiles }; }
export var dossierFiles: { new(): dossierFiles };

interface _dossierFilesAIP extends _dossierFiles {
	dateiRef?: string[];
	dokument?: dokumentFilesAIP[];
	dossier?: dossierFilesAIP[];
	schutzfrist?: string;
	schutzfristenBegruendung?: string;
	schutzfristenkategorie?: string;
	umfang?: string;
}
export interface dossierFilesAIP extends _dossierFilesAIP { constructor: { new(): dossierFilesAIP }; }
export var dossierFilesAIP: { new(): dossierFilesAIP };

interface _dossierFilesDIP extends _dossierFiles {
	archivischeNotiz?: archivischeNotiz[];
	dateiRef?: string[];
	dokument?: dokumentFilesDIP[];
	dossier?: dossierFilesDIP[];
}
export interface dossierFilesDIP extends _dossierFilesDIP { constructor: { new(): dossierFilesDIP }; }
export var dossierFilesDIP: { new(): dossierFilesDIP };

interface _dossierFilesSIP extends _dossierFiles {
	archivischeNotiz?: archivischeNotiz[];
	dateiRef?: string[];
	dokument?: dokumentFilesSIP[];
	dossier?: dossierFilesSIP[];
	schutzfrist?: string;
	schutzfristenBegruendung?: string;
	schutzfristenkategorie?: string;
	umfang?: string;
}
export interface dossierFilesSIP extends _dossierFilesSIP { constructor: { new(): dossierFilesSIP }; }
export var dossierFilesSIP: { new(): dossierFilesSIP };

interface _dossierGever extends _dossier {
	/** Zeitpunkt, an dem das Dossier abgeschlossen worden ist. */
	abschlussdatum?: historischerZeitpunkt;
	aktenzeichen: string;
	/** Zeitpunkt, an dem das Dossier eröffnet worden ist. */
	eroeffnungsdatum?: historischerZeitpunkt;
	/** Vorgangsobjekte repräsentieren einzelne, abgrenzbare Geschäftsfälle.
	  * Der Vorgang wird durchgeführt über eine Folge von einzelnen Aktivitäten.
	  * Einer einzelnen Aktivität sind in der Regel ein federführender Akteur zugewiesen. */
	vorgang?: vorgangAktivitaet[];
}
export interface dossierGever extends _dossierGever { constructor: { new(): dossierGever }; }
export var dossierGever: { new(): dossierGever };

interface _dossierGeverAIP extends _dossierGever {
	dokument?: dokumentGeverAIP[];
	dossier?: dossierGeverAIP[];
	schutzfrist?: string;
	schutzfristenBegruendung?: string;
	schutzfristenkategorie?: string;
}
export interface dossierGeverAIP extends _dossierGeverAIP { constructor: { new(): dossierGeverAIP }; }
export var dossierGeverAIP: { new(): dossierGeverAIP };

interface _dossierGeverDIP extends _dossierGever {
	archivischeNotiz?: archivischeNotiz[];
	dokument?: dokumentGeverDIP[];
	dossier?: dossierGeverDIP[];
}
export interface dossierGeverDIP extends _dossierGeverDIP { constructor: { new(): dossierGeverDIP }; }
export var dossierGeverDIP: { new(): dossierGeverDIP };

interface _dossierGeverSIP extends _dossierGever {
	archivischeNotiz?: archivischeNotiz[];
	dokument?: dokumentGeverSIP[];
	dossier?: dossierGeverSIP[];
	schutzfrist?: string;
	schutzfristenBegruendung?: string;
	schutzfristenkategorie?: string;
}
export interface dossierGeverSIP extends _dossierGeverSIP { constructor: { new(): dossierGeverSIP }; }
export var dossierGeverSIP: { new(): dossierGeverSIP };

/** Generisches Attribut, welches im Zusammenhang mit Wert verwendet wird. Wird bspw. eine CSV-Datei abgeliefert, dann können mittels Attributpaar "eigenschaft" und "wert" Feld- und Zeilendelemiter, Texterkennungszeichen oder Spaltennamen angegeben werden. */
export type eigenschaft = string;
type _eigenschaft = _text4;

interface _eigenschaftDatei extends _eigenschaft {
	name: string;
}
export interface eigenschaftDatei extends _eigenschaftDatei { constructor: { new(): eigenschaftDatei }; }
export var eigenschaftDatei: { new(): eigenschaftDatei };

/** Zusätzliche Informationen, welche für die Ermittlung des Entstehungszeitraums relevant sind. Hier können Angaben über allfällige Löschungen und Mutationen an der Datensammlung eingetragen werden (für FILES relevant). Falls der Entstehungszeitraum geschätzt wurde, ist hier das Kriterium für die Schätzung zu nennen. */
export type entstehungszeitraumAnmerkung = string;
type _entstehungszeitraumAnmerkung = _text4;

/** Angabe, ob es sich beim Dokument zum Zeitpunkt der Ablieferung um ein digitales Dokument, oder um ein nicht-digitales Dokument handelt (Papier, audiovisuell). Ein Dokument kann nur einer der beiden Erscheinungsformen (entweder digital oder nicht-digital) zugewiesen werden. Dokumente, die vor der Ablieferung ins Archiv aus einem digitalen und einem nicht-digitalen Teil bestanden, müssen als zwei getrennte Dokumente abgeliefert werden. */
export type erscheinungsformDokument = ("digital" | "nicht digital");
interface _erscheinungsformDokument extends Primitive._string { content: erscheinungsformDokument; }

/** Angaben darüber, ob das Dossier digitale, nicht-digitale (Papier, audiovisuell) oder sowohl digitale als auch nicht-digitale Dokumente enthält. */
export type erscheinungsformDossier = ("keine Angabe" | "digital" | "nicht digital" | "gemischt");
interface _erscheinungsformDossier extends Primitive._string { content: erscheinungsformDossier; }

/** Bestimmung der für die Erledigung des Geschäftes zuständigen federführenden Organisationseinheit. */
export type federfuehrendeOrganisationseinheitDossier = string;
type _federfuehrendeOrganisationseinheitDossier = _text2;

/** Bestimmung der für die Erledigung des Geschäftes zuständigen federführenden Organisationseinheit. */
export type federfuehrendeOrganisationseinheitOrdnungssystemposition = string;
type _federfuehrendeOrganisationseinheitOrdnungssystemposition = _text2;

/** Angabe des Mediums (Fotos, Tondokumente, schriftliche Unterlagen usw.) */
export type formInhalt = string;
type _formInhalt = _text4;

/** Zeigt auf das "Vater-AIP" zurück, also dasjenige AIP, aus welchem das vorliegende hervorgegangen ist. */
export type fruehereLokaleAIPId = string;
type _fruehereLokaleAIPId = _text1;

/** Versionsbezeichnung des Ordnungssystems. Dient zur Verknüpfung und Unterscheidung von zeitlich aufeinander folgenden OS desselben Typs mit demselben Geltungsbereich. */
export type generation = string;
type _generation = _text1;

/** Allgemeiner Überblick über die Geschichte des Aktenbildners und Angaben über Vorgänger und Nachfolgerorganisationen. */
export type geschichteAktenbildner = string;
type _geschichteAktenbildner = _text4;

/** Über die Gesamtheit der AIP eindeutige ID. Wird im AIS verzeichnet. */
export type globaleAIPId = string;
type _globaleAIPId = _text1;

interface _historischerZeitpunkt extends BaseType {
	ca?: boolean;
	datum: string;
}
export interface historischerZeitpunkt extends _historischerZeitpunkt { constructor: { new(): historischerZeitpunkt }; }
export var historischerZeitpunkt: { new(): historischerZeitpunkt };

interface _historischerZeitraum extends BaseType {
	bis: historischerZeitpunkt;
	von: historischerZeitpunkt;
}
export interface historischerZeitraum extends _historischerZeitraum { constructor: { new(): historischerZeitraum }; }
export var historischerZeitraum: { new(): historischerZeitraum };

/** Paketweit eindeutige ID. */
export type idArchivischeNotiz = string;
type _idArchivischeNotiz = Primitive._string;

/** Paketweit eindeutige ID für die Datei (technischer Primärschlüssel). Diese ID wird aus dem Dokument heraus referenziert. */
export type idDatei = string;
type _idDatei = Primitive._string;

/** Paketweit eindeutige ID (Primärschlüssel). */
export type idDokument = string;
type _idDokument = Primitive._string;

/** Paketweit eindeutige ID. Sie wird im AIS im Modul Verzeichnungseinheiten auf Dossierstufe verzeichnet. */
export type idDossier = string;
type _idDossier = Primitive._string;

/** Paketweit eindeutige ID für den Ordner (technischer Primärschlüssel). Diese ID wird aus dem Dokument heraus referenziert. */
export type idOrdner = string;
type _idOrdner = Primitive._string;

/** Paketweit eindeutige ID (Primärschlüssel). */
export type idOrdnungssystemposition = string;
type _idOrdnungssystemposition = Primitive._string;

/** Inhaltlicher Schwerpunkt der Datensammlung sofern dies nicht aus dem Feld "Titel" hervorgeht. */
export type inhalt = string;
type _inhalt = _text4;

interface _inhaltsverzeichnis extends BaseType {}
export interface inhaltsverzeichnis extends _inhaltsverzeichnis { constructor: { new(): inhaltsverzeichnis }; }
export var inhaltsverzeichnis: { new(): inhaltsverzeichnis };

interface _inhaltsverzeichnisAIP extends _inhaltsverzeichnis {
	datei?: dateiAIP[];
	ordner?: ordnerAIP[];
}
export interface inhaltsverzeichnisAIP extends _inhaltsverzeichnisAIP { constructor: { new(): inhaltsverzeichnisAIP }; }
export var inhaltsverzeichnisAIP: { new(): inhaltsverzeichnisAIP };

interface _inhaltsverzeichnisDIP extends _inhaltsverzeichnis {
	datei?: dateiDIP[];
	ordner?: ordnerDIP[];
}
export interface inhaltsverzeichnisDIP extends _inhaltsverzeichnisDIP { constructor: { new(): inhaltsverzeichnisDIP }; }
export var inhaltsverzeichnisDIP: { new(): inhaltsverzeichnisDIP };

interface _inhaltsverzeichnisSIP extends _inhaltsverzeichnis {
	datei?: dateiSIP[];
	ordner?: ordnerSIP[];
}
export interface inhaltsverzeichnisSIP extends _inhaltsverzeichnisSIP { constructor: { new(): inhaltsverzeichnisSIP }; }
export var inhaltsverzeichnisSIP: { new(): inhaltsverzeichnisSIP };

export type keineAngabe = "keine Angabe";
interface _keineAngabe extends Primitive._string { content: keineAngabe; }

/** Grad, in dem das Dokument vor unberechtigter Einsicht geschützt werden muss. Referenz: Verordnung vom 10.12.1990 über die Klassifizierung und Behandlung von Informationen im zivilen Verwaltungsbereich ([SR 172.015]) und Verordnung vom 1.5.1990 über den Schutz militärischer Informationen ([SR 510.411]). */
export type klassifizierungskategorieDokument = string;
type _klassifizierungskategorieDokument = _text2;

/** Grad, in dem das Dossier und die enthaltenen Dokumente und Dateien vor unberechtigter Einsicht geschützt werden müssen. Referenz: Verordnung vom 10.12.1990 über die Klassifizierung und Behandlung von Informationen im zivilen Verwaltungsbereich ([SR 172.015]) und Verordnung vom 1.5.1990 über den Schutz militärischer Informationen ([SR 510.411]). */
export type klassifizierungskategorieDossier = string;
type _klassifizierungskategorieDossier = _text2;

/** Grad, in dem alle der Ordnungssystemposition untergeordneten Objekte Dossier und Dokumente vor unberechtigter Einsicht geschützt werden müssen. Referenz: Verordnung vom 10.12.1990 über die Klassifizierung und Behandlung von Informationen im zivilen Verwaltungsbereich ([SR 172.015]) und Verordnung vom 1.5.1990 über den Schutz militärischer Informationen ([SR 510.411]). */
export type klassifizierungskategorieOrdnungssystemposition = string;
type _klassifizierungskategorieOrdnungssystemposition = _text2;

/** Über die Gesamtheit der AIP eindeutige ID im Zusammenhang mit Paketmigrationen. Entsteht zum ersten Mal, wenn ein AIP migriert wird. Wird nicht im AIS verzeichnet. */
export type lokaleAIPId = string;
type _lokaleAIPId = _text1;

/** Weitere Organisationseinheiten, ausserhalb des Aktenbildners, welche das Ordnungssystem mitbenutzen oder mitbenutzt haben. */
export type mitbenutzung = string;
type _mitbenutzung = _text4;

/** Name der Datei, wie dieser im SIP/AIP/DIP erscheint (z.B. "p000001_Machbarkeitsanaly.pdf"). */
export type nameDatei = string;
type _nameDatei = _text2;

/** Das Inhaltsverzeichnis listet alle Dateien und Ordner des Pakets hierarchisch auf. Für die Ordner wird der Ordnername eingesetzt. */
export type nameOrdner = string;
type _nameOrdner = Primitive._string;

/** Eindeutige Bezeichnung des Ordnungssystems, welche den Geltungsbereich des Ordnungssystems wiedergibt. Enthält in der Regel als Element die Bezeichnung der Verwaltungseinheit oder des Aufgabenbereichs, in welchem das Ordnungssystem angewandt wird. */
export type nameOrdnungssystem = string;
type _nameOrdnungssystem = _text2;

/** Name des SIP zum Zeitpunkt der Ablieferung. */
export type nameSIP = string;
type _nameSIP = _text1;

/** Notiz i.e.S, d.h. Beschreibung. Zwingendes Feld. */
export type notizBeschreibung = string;
type _notizBeschreibung = _text4;

/** Datum, an welchem die Notiz erfasst wurde. Datums-Tagengenauigkeit reicht (keine Std. und Sek.). Zwingendes Feld. */
export type notizDatum = string;
type _notizDatum = _datumTypB;

/** Benutzer, welcher die Notiz erfasst hat. Optionales Feld. */
export type notizErfasser = string;
type _notizErfasser = _text1;

/** Eindeutige Identifikation und Ordnungsmerkmal der Ordnungssystemposition. */
export type nummer = string;
type _nummer = _text1;

/** Argumente gegen die öffentliche Zugänglichkeit gemäss [BGÖ]. Gemäss Entwurf [BGÖ] muss begründet werden, warum Unterlagen nicht öffentlich zugänglich gemacht werden können. */
export type oeffentlichkeitsstatusBegruendungDokument = string;
type _oeffentlichkeitsstatusBegruendungDokument = _text4;

/** Argumente gegen die öffentliche Zugänglichkeit gemäss [BGÖ]. Gemäss Entwurf [BGÖ] muss begründet werden, warum Unterlagen nicht öffentlich zugänglich gemacht werden können. */
export type oeffentlichkeitsstatusBegruendungDossier = string;
type _oeffentlichkeitsstatusBegruendungDossier = _text4;

/** Argumente gegen die öffentliche Zugänglichkeit gemäss [BGÖ]. Gemäss Entwurf [BGÖ] muss begründet werden, warum Unterlagen nicht öffentlich zugänglich gemacht werden können. */
export type oeffentlichkeitsstatusBegruendungOrdnungssystemposition = string;
type _oeffentlichkeitsstatusBegruendungOrdnungssystemposition = _text4;

/** Angabe, ob das Dokument gemäss [BGÖ] öffentlich zugänglich ist oder nicht. */
export type oeffentlichkeitsstatusDokument = string;
type _oeffentlichkeitsstatusDokument = _text2;

/** Angabe, ob das Dossier gemäss [BGÖ] schützenswerte Dokumente oder Dateien enthält oder nicht. */
export type oeffentlichkeitsstatusDossier = string;
type _oeffentlichkeitsstatusDossier = _text2;

/** Angabe, ob der Ordnungssystemposition untergeordnete Dossiers gemäss [BGÖ] schützenswerte Dokumente enthalten oder nicht. */
export type oeffentlichkeitsstatusOrdnungssystemposition = string;
type _oeffentlichkeitsstatusOrdnungssystemposition = _text2;

/** Ordnungszahl welche die Reihenfolge der Aktivitäten innerhalb eines Vorgangs festlegt, muss innerhalb des selben Vorgangs eindeutig sein. */
export type orderAktivitaet = number;
type _orderAktivitaet = Primitive._number;

/** Ordnungszahl welche die Reihenfolge von Vorgängen innerhalb eines Dossiers festlegt, muss innerhalb des selben Dossier eindeutig sein. */
export type orderVorgang = number;
type _orderVorgang = Primitive._number;

interface _ordner extends BaseType {
	name: string;
	originalName?: string;
}
export interface ordner extends _ordner { constructor: { new(): ordner }; }
export var ordner: { new(): ordner };

interface _ordnerAIP extends _ordner {
	datei?: dateiAIP[];
	ordner?: ordnerAIP[];
}
export interface ordnerAIP extends _ordnerAIP { constructor: { new(): ordnerAIP }; }
export var ordnerAIP: { new(): ordnerAIP };

interface _ordnerDIP extends _ordner {
	datei?: dateiDIP[];
	ordner?: ordnerDIP[];
}
export interface ordnerDIP extends _ordnerDIP { constructor: { new(): ordnerDIP }; }
export var ordnerDIP: { new(): ordnerDIP };

interface _ordnerSIP extends _ordner {
	datei?: dateiSIP[];
	ordner?: ordnerSIP[];
}
export interface ordnerSIP extends _ordnerSIP { constructor: { new(): ordnerSIP }; }
export var ordnerSIP: { new(): ordnerSIP };

interface _ordnungssystem extends BaseType {
	/** Zeitraum, seit/während dem das Ordnungssystem bei der aktenbildenden Stelle eingesetzt wird/wurde. */
	anwendungszeitraum?: historischerZeitraum;
	bemerkung?: string;
	generation?: string;
	mitbenutzung?: string;
	zusatzDaten?: zusatzDaten;
}
export interface ordnungssystem extends _ordnungssystem { constructor: { new(): ordnungssystem }; }
export var ordnungssystem: { new(): ordnungssystem };

interface _ordnungssystemFiles extends _ordnungssystem {
	name?: string;
}
export interface ordnungssystemFiles extends _ordnungssystemFiles { constructor: { new(): ordnungssystemFiles }; }
export var ordnungssystemFiles: { new(): ordnungssystemFiles };

interface _ordnungssystemFilesAIP extends _ordnungssystemFiles {
	ordnungssystemposition: ordnungssystempositionFilesAIP[];
}
export interface ordnungssystemFilesAIP extends _ordnungssystemFilesAIP { constructor: { new(): ordnungssystemFilesAIP }; }
export var ordnungssystemFilesAIP: { new(): ordnungssystemFilesAIP };

interface _ordnungssystemFilesDIP extends _ordnungssystemFiles {
	archivischeNotiz?: archivischeNotiz[];
	ordnungssystemposition: ordnungssystempositionFilesDIP[];
}
export interface ordnungssystemFilesDIP extends _ordnungssystemFilesDIP { constructor: { new(): ordnungssystemFilesDIP }; }
export var ordnungssystemFilesDIP: { new(): ordnungssystemFilesDIP };

interface _ordnungssystemFilesSIP extends _ordnungssystemFiles {
	archivischeNotiz?: archivischeNotiz[];
	ordnungssystemposition: ordnungssystempositionFilesSIP[];
}
export interface ordnungssystemFilesSIP extends _ordnungssystemFilesSIP { constructor: { new(): ordnungssystemFilesSIP }; }
export var ordnungssystemFilesSIP: { new(): ordnungssystemFilesSIP };

interface _ordnungssystemGever extends _ordnungssystem {
	name: string;
}
export interface ordnungssystemGever extends _ordnungssystemGever { constructor: { new(): ordnungssystemGever }; }
export var ordnungssystemGever: { new(): ordnungssystemGever };

interface _ordnungssystemGeverAIP extends _ordnungssystemGever {
	ordnungssystemposition: ordnungssystempositionGeverAIP[];
}
export interface ordnungssystemGeverAIP extends _ordnungssystemGeverAIP { constructor: { new(): ordnungssystemGeverAIP }; }
export var ordnungssystemGeverAIP: { new(): ordnungssystemGeverAIP };

interface _ordnungssystemGeverDIP extends _ordnungssystemGever {
	archivischeNotiz?: archivischeNotiz[];
	ordnungssystemposition: ordnungssystempositionGeverDIP[];
}
export interface ordnungssystemGeverDIP extends _ordnungssystemGeverDIP { constructor: { new(): ordnungssystemGeverDIP }; }
export var ordnungssystemGeverDIP: { new(): ordnungssystemGeverDIP };

interface _ordnungssystemGeverSIP extends _ordnungssystemGever {
	archivischeNotiz?: archivischeNotiz[];
	ordnungssystemposition: ordnungssystempositionGeverSIP[];
}
export interface ordnungssystemGeverSIP extends _ordnungssystemGeverSIP { constructor: { new(): ordnungssystemGeverSIP }; }
export var ordnungssystemGeverSIP: { new(): ordnungssystemGeverSIP };

interface _ordnungssystemposition extends BaseType {
	datenschutz?: boolean;
	federfuehrendeOrganisationseinheit?: string;
	klassifizierungskategorie?: string;
	oeffentlichkeitsstatus?: string;
	oeffentlichkeitsstatusBegruendung?: string;
	sonstigeBestimmungen?: string;
	zusatzDaten?: zusatzDaten;
}
export interface ordnungssystemposition extends _ordnungssystemposition { constructor: { new(): ordnungssystemposition }; }
export var ordnungssystemposition: { new(): ordnungssystemposition };

interface _ordnungssystempositionFiles extends _ordnungssystemposition {
	id?: string;
	nummer?: string;
	titel?: string;
}
export interface ordnungssystempositionFiles extends _ordnungssystempositionFiles { constructor: { new(): ordnungssystempositionFiles }; }
export var ordnungssystempositionFiles: { new(): ordnungssystempositionFiles };

interface _ordnungssystempositionFilesAIP extends _ordnungssystempositionFiles {
	dossier?: dossierFilesAIP[];
	ordnungssystemposition?: ordnungssystempositionFilesAIP[];
	schutzfrist?: string;
	schutzfristenBegruendung?: string;
	schutzfristenkategorie?: string;
}
export interface ordnungssystempositionFilesAIP extends _ordnungssystempositionFilesAIP { constructor: { new(): ordnungssystempositionFilesAIP }; }
export var ordnungssystempositionFilesAIP: { new(): ordnungssystempositionFilesAIP };

interface _ordnungssystempositionFilesDIP extends _ordnungssystempositionFiles {
	archivischeNotiz?: archivischeNotiz[];
	dossier?: dossierFilesDIP[];
	ordnungssystemposition?: ordnungssystempositionFilesDIP[];
}
export interface ordnungssystempositionFilesDIP extends _ordnungssystempositionFilesDIP { constructor: { new(): ordnungssystempositionFilesDIP }; }
export var ordnungssystempositionFilesDIP: { new(): ordnungssystempositionFilesDIP };

interface _ordnungssystempositionFilesSIP extends _ordnungssystempositionFiles {
	archivischeNotiz?: archivischeNotiz[];
	dossier?: dossierFilesSIP[];
	ordnungssystemposition?: ordnungssystempositionFilesSIP[];
	schutzfrist?: string;
	schutzfristenBegruendung?: string;
	schutzfristenkategorie?: string;
}
export interface ordnungssystempositionFilesSIP extends _ordnungssystempositionFilesSIP { constructor: { new(): ordnungssystempositionFilesSIP }; }
export var ordnungssystempositionFilesSIP: { new(): ordnungssystempositionFilesSIP };

interface _ordnungssystempositionGever extends _ordnungssystemposition {
	id: string;
	nummer: string;
	titel: string;
}
export interface ordnungssystempositionGever extends _ordnungssystempositionGever { constructor: { new(): ordnungssystempositionGever }; }
export var ordnungssystempositionGever: { new(): ordnungssystempositionGever };

interface _ordnungssystempositionGeverAIP extends _ordnungssystempositionGever {
	dossier?: dossierGeverAIP[];
	ordnungssystemposition?: ordnungssystempositionGeverAIP[];
	schutzfrist?: string;
	schutzfristenBegruendung?: string;
	schutzfristenkategorie?: string;
}
export interface ordnungssystempositionGeverAIP extends _ordnungssystempositionGeverAIP { constructor: { new(): ordnungssystempositionGeverAIP }; }
export var ordnungssystempositionGeverAIP: { new(): ordnungssystempositionGeverAIP };

interface _ordnungssystempositionGeverDIP extends _ordnungssystempositionGever {
	archivischeNotiz?: archivischeNotiz[];
	dossier?: dossierGeverDIP[];
	ordnungssystemposition?: ordnungssystempositionGeverDIP[];
}
export interface ordnungssystempositionGeverDIP extends _ordnungssystempositionGeverDIP { constructor: { new(): ordnungssystempositionGeverDIP }; }
export var ordnungssystempositionGeverDIP: { new(): ordnungssystempositionGeverDIP };

interface _ordnungssystempositionGeverSIP extends _ordnungssystempositionGever {
	archivischeNotiz?: archivischeNotiz[];
	dossier?: dossierGeverSIP[];
	ordnungssystemposition?: ordnungssystempositionGeverSIP[];
	schutzfrist?: string;
	schutzfristenBegruendung?: string;
	schutzfristenkategorie?: string;
}
export interface ordnungssystempositionGeverSIP extends _ordnungssystempositionGeverSIP { constructor: { new(): ordnungssystempositionGeverSIP }; }
export var ordnungssystempositionGeverSIP: { new(): ordnungssystempositionGeverSIP };

/** Name des Ordners oder der Datei, wie diese in der Originalstruktur (im GEVER-System, in der Dateiablage) beim Aktenbildner geheissen hat (z.B. "Arbeitspaket" oder "Bericht.doc"). */
export type originalName = string;
type _originalName = _text4;

interface _paket extends BaseType {
	schemaVersion: string;
	paketTyp: paketTyp;
	zusatzDaten?: zusatzDaten;
}
export interface paket extends _paket { constructor: { new(): paket }; }
export var paket: { new(): paket };

interface _paketAIP extends _paket {
	ablieferung: ablieferungAIP;
	archivischerVorgang?: archivischerVorgang[];
	fruehereLokaleAIPId?: string;
	globaleAIPId: string;
	inhaltsverzeichnis: inhaltsverzeichnisAIP;
	lokaleAIPId: string;
	nameSIP?: string;
	referenzUebernahmedossier?: string;
	version: number;
}
export interface paketAIP extends _paketAIP { constructor: { new(): paketAIP }; }
export var paketAIP: { new(): paketAIP };

interface _paketDIP extends _paket {
	ablieferung: ablieferungDIP;
	archivischeNotiz?: archivischeNotiz[];
	fruehereLokaleAIPId?: string;
	globaleAIPId: string;
	inhaltsverzeichnis: inhaltsverzeichnisDIP;
	lokaleAIPId: string;
	nameSIP?: string;
}
export interface paketDIP extends _paketDIP { constructor: { new(): paketDIP }; }
export var paketDIP: { new(): paketDIP };

interface _paketSIP extends _paket {
	ablieferung: ablieferungSIP;
	archivischeNotiz?: archivischeNotiz[];
	archivischerVorgang?: archivischerVorgang[];
	inhaltsverzeichnis: inhaltsverzeichnisSIP;
	referenzUebernahmedossier?: string;
}
export interface paketSIP extends _paketSIP { constructor: { new(): paketSIP }; }
export var paketSIP: { new(): paketSIP };

/** Klassierung des Pakets. */
export type paketTyp = ("SIP" | "AIP" | "DIP");
interface _paketTyp extends Primitive._string { content: paketTyp; }

/** Name der Datei im Filesystem. */
export type physischerName = string;
type _physischerName = _text1;

interface _provenienz extends BaseType {
	aktenbildnerName: string;
	bemerkung?: string;
	/** Zeitraum der Existenz des Aktenbildners. */
	existenzzeitraum?: historischerZeitraum;
	geschichteAktenbildner?: string;
	systemBeschreibung?: string;
	systemName?: string;
}
export interface provenienz extends _provenienz { constructor: { new(): provenienz }; }
export var provenienz: { new(): provenienz };

interface _provenienzFiles extends _provenienz {
	archivierungsmodusLoeschvorschriften?: string;
	registratur?: string;
	verwandteSysteme?: string;
}
export interface provenienzFiles extends _provenienzFiles { constructor: { new(): provenienzFiles }; }
export var provenienzFiles: { new(): provenienzFiles };

interface _provenienzFilesAIP extends _provenienzFiles {}
export interface provenienzFilesAIP extends _provenienzFilesAIP { constructor: { new(): provenienzFilesAIP }; }
export var provenienzFilesAIP: { new(): provenienzFilesAIP };

interface _provenienzFilesDIP extends _provenienzFiles {
	archivischeNotiz?: archivischeNotiz[];
}
export interface provenienzFilesDIP extends _provenienzFilesDIP { constructor: { new(): provenienzFilesDIP }; }
export var provenienzFilesDIP: { new(): provenienzFilesDIP };

interface _provenienzFilesSIP extends _provenienzFiles {
	archivischeNotiz?: archivischeNotiz[];
}
export interface provenienzFilesSIP extends _provenienzFilesSIP { constructor: { new(): provenienzFilesSIP }; }
export var provenienzFilesSIP: { new(): provenienzFilesSIP };

interface _provenienzGever extends _provenienz {
	registratur: string;
}
export interface provenienzGever extends _provenienzGever { constructor: { new(): provenienzGever }; }
export var provenienzGever: { new(): provenienzGever };

interface _provenienzGeverAIP extends _provenienzGever {}
export interface provenienzGeverAIP extends _provenienzGeverAIP { constructor: { new(): provenienzGeverAIP }; }
export var provenienzGeverAIP: { new(): provenienzGeverAIP };

interface _provenienzGeverDIP extends _provenienzGever {
	archivischeNotiz?: archivischeNotiz[];
}
export interface provenienzGeverDIP extends _provenienzGeverDIP { constructor: { new(): provenienzGeverDIP }; }
export var provenienzGeverDIP: { new(): provenienzGeverDIP };

interface _provenienzGeverSIP extends _provenienzGever {
	archivischeNotiz?: archivischeNotiz[];
}
export interface provenienzGeverSIP extends _provenienzGeverSIP { constructor: { new(): provenienzGeverSIP }; }
export var provenienzGeverSIP: { new(): provenienzGeverSIP };

/** Bezeichnung des verwendeten Prüfalgorithmus. */
export type pruefalgorithmus = ("MD5" | "SHA-1" | "SHA-256" | "SHA-512");
interface _pruefalgorithmus extends Primitive._string { content: pruefalgorithmus; }

/** Prüfsummenwert (abhängig vom verwendeten Prüfalgorithmus). */
export type pruefsumme = string;
type _pruefsumme = _text3;

/** Aktenzeichen Bewertungsentscheid(e) Archiv, welches die Ablieferung betreffen. */
export type referenzBewertungsentscheid = string;
type _referenzBewertungsentscheid = _text1;

/** Aktenzeichen des Formulars „Meldung von Unterlagen mit besonderer Schutzfrist und öffentlich zugänglichen Unterlagen“, in dem die für die Ablieferung vereinbarten Schutzfristen festgehalten sind. */
export type referenzSchutzfristenFormular = string;
type _referenzSchutzfristenFormular = _text1;

/** Aktenzeichen des Übernahmedossiers in der GEVER Anwendung des Archiv. */
export type referenzUebernahmedossier = string;
type _referenzUebernahmedossier = _text1;

/** Name der Ablage, für welche das primäre Ordnungssystem verwendet wird und die einem Mandanten im System entspricht. Eine aktenbildende Stelle kann im Prinzip mehr als eine Registratur führen. Pro Registratur gibt es allerdings nur ein primäres Ordnungssystem. */
export type registratur = string;
type _registratur = _text2;

/** Angabe, mit welcher XSD-Version das Paket erstellt wurde. */
export type schemaVersion = string;
type _schemaVersion = _text1;

/** Dauer der Schutzfrist in Jahren, die das Amt im Formular „Meldung von Unterlagen mit besonderer Schutzfrist und öffentlich zugänglichen Unterlagen“ gemeldet hat und vom Archiv auf ihre formale Korrektheit und Vollständigkeit kontrolliert worden ist. */
export type schutzfristAblieferung = string;
type _schutzfristAblieferung = _text1;

/** Dauer der Schutzfrist in Jahren, die das Amt im Formular „Meldung von Unterlagen mit besonderer Schutzfrist und öffentlich zugänglichen Unterlagen“ gemeldet hat und vom Archiv auf ihre formale Korrektheit und Vollständigkeit kontrolliert worden ist. */
export type schutzfristDossier = string;
type _schutzfristDossier = _text1;

/** Erläuterung der Begründung für eine verlängerte Schutzfrist für Unterlagen, die nach Personennamen erschlossen sind und schützenswerte Personendaten gemäss DSG enthalten (z.B. Art. 11 BGA), und für bestimmte Kategorien oder für einzelne Dossiers, die überwiegend schutzwürdige öffentliche oder private Interessen tangieren (z.B. Art. 12 Abs. 1 BGA und Art. 12 Abs. 2 BGA). */
export type schutzfristenBegruendungDossier = string;
type _schutzfristenBegruendungDossier = _text4;

/** Erläuterung der Begründung für eine verlängerte Schutzfrist für Unterlagen, die nach Personennamen erschlossen sind und schützenswerte Personendaten gemäss DSG enthalten (z.B. Art. 11 BGA), und für bestimmte Kategorien oder für einzelne Dossiers, die überwiegend schutzwürdige öffentliche oder private Interessen tangieren (z.B. Art. 12 Abs. 1 BGA und Art. 12 Abs. 2 BGA). */
export type schutzfristenBegruendungOrdnungssystemposition = string;
type _schutzfristenBegruendungOrdnungssystemposition = _text4;

/** Artikel des Gesetztes, der die Schutzfrist festhält, die das Amt im Formular „Meldung von Unterlagen mit besonderer Schutzfrist und öffentlich zugänglichen Unterlagen“ gemeldet hat und vom Archiv auf ihre formale Korrektheit und Vollständigkeit kontrolliert worden ist. */
export type schutzfristenkategorieAblieferung = string;
type _schutzfristenkategorieAblieferung = _text1;

/** Artikel des Gesetzes, der die Schutzfrist festhält, die das Amt im Formular „Meldung von Unterlagen mit besonderer Schutzfrist und öffentlich zugänglichen Unterlagen“ gemeldet hat und vom Archiv auf ihre formale Korrektheit und Vollständigkeit kontrolliert worden ist. */
export type schutzfristenkategorieDossier = string;
type _schutzfristenkategorieDossier = _text1;

/** Artikel des Gesetztes, der die Schutzfrist festhält, die das Amt im Formular „Meldung von Unterlagen mit besonderer Schutzfrist und öffentlich zugänglichen Unterlagen“ gemeldet hat und vom Archiv auf ihre formale Korrektheit und Vollständigkeit kontrolliert worden ist. */
export type schutzfristenkategorieOrdnungssystemposition = string;
type _schutzfristenkategorieOrdnungssystemposition = _text1;

/** Dauer der Schutzfrist in Jahren, die das Amt im Formular „Meldung von Unterlagen mit besonderer Schutzfrist und öffentlich zugänglichen Unterlagen“ gemeldet hat und vom Archiv auf ihre formale Korrektheit und Vollständigkeit kontrolliert worden ist. */
export type schutzfristOrdnungssystemposition = string;
type _schutzfristOrdnungssystemposition = _text1;

/** Angaben über sonstige rechtliche Auflagen, denen das Dokument unterstellt ist. */
export type sonstigeBestimmungenDokument = string;
type _sonstigeBestimmungenDokument = _text4;

/** Angaben über sonstige rechtliche Auflagen, denen das Dossier unterstellt ist. */
export type sonstigeBestimmungenDossier = string;
type _sonstigeBestimmungenDossier = _text4;

/** Angaben über sonstige rechtliche Auflagen, denen die Ordnungssystemposition unterstellt ist. */
export type sonstigeBestimmungenOrdnungssystemposition = string;
type _sonstigeBestimmungenOrdnungssystemposition = _text4;

/** Knappe Beschreibung des Informationssystems, aus dem die abgelieferten Daten (FILES) stammen. Die Beschreibung gibt Auskunft über den Zweck (inkl. Angabe der gesetzlichen Grundlagen), die Architektur, die Entwicklung und über relevante Ergänzungen und Änderungen des Systems. Zudem können hier Angaben zur Datenerhebung und zu den Organisationseinheiten gemacht werden, die neben dem Aktenbildner das System verwenden. */
export type systemBeschreibung = string;
type _systemBeschreibung = _text4;

/** Name des Informationssystems, aus dem die abgelieferten Daten (FILES), Dossiers und Dokumente (GEVER) stammen. */
export type systemName = string;
type _systemName = _text3;

export type text1 = string;
type _text1 = Primitive._string;

export type text2 = string;
type _text2 = Primitive._string;

export type text3 = string;
type _text3 = Primitive._string;

export type text4 = string;
type _text4 = Primitive._string;

/** Kurze Beschreibung des im Dokument behandelten Gegenstandes. */
export type titelDokument = string;
type _titelDokument = _text4;

/** Bezeichnung des Dossiers.
  * GEVER: Kurzbeschreibung des Geschäftsfalls (bei Seriendossierbildung) oder des Sachbetreffs (bei Sachdossierbildung) zu welchem Dokumente im Dossier abgelegt werden.
  * FILES: Kurzbeschreibung des Inhalts der Datensammlung und der Dokumentation (falls vorhanden) */
export type titelDossier = string;
type _titelDossier = _text4;

/** Bezeichnung des Aufgabenbereichs, dem die Ordnungssystemposition zugewiesen ist. */
export type titelOrdnungssystemposition = string;
type _titelOrdnungssystemposition = _text2;

/** Benennung von Tätigkeit und Gegenstand des Geschäftsvorfalles. */
export type titelVorgang = string;
type _titelVorgang = _text2;

/** Anzahl der Dateien des Dossiers und Umfang in MBytes zum Zeitpunkt der Ablieferung. Bei Datenbanken: Anzahl Datensätze der vorliegenden Datensammlung zum Zeitpunkt der Ablieferung. Als Datensatz gilt das Ensemble von Zeilen einer oder mehrerer miteinander verknüpften Tabellen (zentrale logische Einheit). Die Anzahl Datensätze ist zusammen mit der Bezeichnung der zentralen logischen Einheit zu nennen. Diese hängt vom Hauptfokus der Datensammlung ab. Bei Unklarheit muss mit einem Zusatztext erklärt werden, wie viele Datensätze welchen Typs vorliegen. */
export type umfang = string;
type _umfang = _text4;

interface _unstrukturierterAnhang extends BaseType {
	/** Zusätzliche unstrukturierte Informationen, welche der Ablieferung fakultativ mitgegeben werden können. */
	dateiBeschreibung: string;
	dateiRef?: string;
}
export interface unstrukturierterAnhang extends _unstrukturierterAnhang { constructor: { new(): unstrukturierterAnhang }; }
export var unstrukturierterAnhang: { new(): unstrukturierterAnhang };

/** Die Versionierung des Pakets. Aus der Version ist schnell ersichtlich, wie oft ein AIP bereits migriert wurde. */
export type version = number;
type _version = Primitive._number;

/** Systeme, die mit dem beschriebenen System Daten ausgetauscht haben und damit Subsysteme, Parallelsysteme oder übergeordnete Systeme sind. Hier werden die Bezeichnungen der Systeme und die Art der Verwandtschaft eingetragen. */
export type verwandteSysteme = string;
type _verwandteSysteme = _text4;

/** Referenz auf andere Ordnungssystempositionen, Dossiers, Vorgänge oder Aktivitäten, die in enger Beziehung zu der Aktivität stehen ohne direkt mit ihr verknüpft zu sein. */
export type verweisAktivitaet = string;
type _verweisAktivitaet = _text2;

/** Referenz auf andere Ordnungssystempositionen, Dossiers oder Vorgänge, die in enger Beziehung mit dem Vorgang stehen ohne direkt mit ihm verknüpft zu sein. */
export type verweisVorgang = string;
type _verweisVorgang = _text2;

/** Angaben über Tätigkeiten, die an Dokumenten des Dossiers durchgeführt wurden. Es können z.B. Angaben zu Tätigkeiten sein, die im Rahmen eines Auftragssubdossiers durchgeführt wurden. */
export type vorgang = string;
type _vorgang = _text4;

interface _vorgangAktivitaet extends BaseType {
	order?: number;
	aktivitaet?: aktivitaet[];
	arbeitsanweisung?: string;
	titel?: string;
	verweis?: string[];
}
export interface vorgangAktivitaet extends _vorgangAktivitaet { constructor: { new(): vorgangAktivitaet }; }
export var vorgangAktivitaet: { new(): vorgangAktivitaet };

/** Klassifizierung des Vorgangs. */
export type vorgangstyp = string;
type _vorgangstyp = _text1;

/** Beschreibung der Tätigkeit, die ausgeführt werden soll. */
export type vorschreibungAktivitaet = string;
type _vorschreibungAktivitaet = _text2;

export type zeitpunkt = string;
type _zeitpunkt = Primitive._string;

interface _zeitraum extends BaseType {
	bis: string;
	von: string;
}
export interface zeitraum extends _zeitraum { constructor: { new(): zeitraum }; }
export var zeitraum: { new(): zeitraum };

/** Merkmal - Werte Gruppen erlaubt das festhalten weiterer Metadaten in tabellarisch strukturierter Form */
interface _zusatzDaten extends BaseType {
	merkmal: zusatzDatenMerkmalType[];
}
export interface zusatzDaten extends _zusatzDaten { constructor: { new(): zusatzDaten }; }
export var zusatzDaten: { new(): zusatzDaten };

interface _zusatzDatenMerkmalType extends _text4 {
	/** Name des Merkmal - Werte Paares */
	name: string;
}
interface zusatzDatenMerkmalType extends _zusatzDatenMerkmalType { constructor: { new(): zusatzDatenMerkmalType }; }

/** Angaben über zusätzliche Merkmale, welche das Dossier identifizieren. Hier kann z.B. die Bandnummer eines Dossiers vermerkt werden, als Unterscheidungs- und Reihungsmerkmal von Fortsetzungsdossiers mit demselben Dossier-Titel und mit demselben Aktenzeichen erfasst. */
export type zusatzmerkmal = string;
type _zusatzmerkmal = _text2;

export interface document extends BaseType {
	paket: paket;
}
export var document: document;
