import { Html } from '../../../xml-error';

export interface TextString {
    '_text': string | 'true' | 'false';
}

export interface AttrschemaVersion {
    '_value': number;
}

export interface ValueString {
    '_value': string;
}

export interface HashFunktion {
    '_text': 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512';
}

export interface PaketTyp {
    '_text': 'SIP' | 'AIP' | 'DIP';
}

export interface Datei {
    '_attrid': ValueString;
    'name': TextString[];
    'originalName': TextString[];
    'pruefalgorithmus': HashFunktion[];
    'pruefsumme': TextString[];
    'path': ValueString;
}

export interface Ordner {
    'name': TextString[];
    'originalName': TextString[];
    'ordner': Ordner[];
    'datei'?: Datei[];
}

export interface Inhaltsverzeichnis extends TextString {
    'ordner': Ordner[];
}

export interface Datum extends TextString {
    'ca'?: TextString[];
    'datum': TextString[];
}

export interface Provenienz extends TextString {
    'aktenbildnerName': TextString[];
    'systemName': TextString[];
    'systemBeschreibung': TextString[];
    'registratur': TextString[];
    'bemerkung': TextString[];
}

export interface Zeitraum extends TextString {
    'von': Datum[];
    'bis': Datum[];
}

export interface Merkmal extends TextString {
    '_attrname': ValueString;
}

export interface ZusatzDaten extends TextString {
    'merkmal': Merkmal[];
}

export interface Dokument extends TextString {
    '_attrid': ValueString;
    'titel': TextString[];
    'autor': TextString[];
    'erscheinungsform': TextString[];
    'dokumenttyp': TextString[];
    'registrierdatum': Datum[];
    'klassifizierungskategorie': TextString[];
    'oeffentlichkeitsstatus': TextString[];
    'dateiRef': TextString[];
    'datenschutz': TextString[];
}

export interface Aktivitaet {
    '_attrorder': ValueString;
    'vorschreibung': TextString[];
    'abschlussdatum': TextString[];
}

export interface Vorgang {
    'titel': TextString[];
    'aktivitaet': Aktivitaet[];
}

export interface Dossier extends TextString {
    '_attrid': ValueString;
    'titel': TextString[];
    'erscheinungsform': TextString[];
    'federfuehrendeOrganisationseinheit': TextString[];
    'entstehungszeitraum': Zeitraum[];
    'zusatzDaten': ZusatzDaten[];
    'klassifizierungskategorie': TextString[];
    'datenschutz': TextString[];
    'oeffentlichkeitsstatus': TextString[];
    'aktenzeichen': TextString[];
    'eroeffnungsdatum': Datum[];
    'abschlussdatum': Datum[];
    'dokument': Dokument[];
    'vorgang': Vorgang[];
    'dateiRef': TextString[];
    'dossier': Dossier[];
}

export interface Ordnungssystemposition extends TextString {
    '_attrid': ValueString;
    'datenschutz': TextString[];
    'nummer': TextString[];
    'titel': TextString[];
    'ordnungssystemposition'?: Ordnungssystemposition[];
    'dossier'?: Dossier[];
}

export interface Ordnungssystem extends TextString {
    'generation': TextString[];
    'name': TextString[];
    'ordnungssystemposition': Ordnungssystemposition[];
}

export interface Ablieferung extends TextString {
    '_attrtype': ValueString;
    'ablieferungstyp': TextString[];
    'ablieferndeStelle': TextString[];
    'entstehungszeitraum': TextString[];
    'ablieferungsnummer': TextString[];
    'schutzfristenkategorie': TextString[];
    'schutzfrist': TextString[];
    'provenienz': Provenienz[];
    'ordnungssystem': Ordnungssystem[];
}

export interface Paket extends TextString {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '_attrxmlns:xsi': ValueString;
    '_attrxmlns': ValueString;
    '_attrschemaLocation': ValueString;
    '_attrtype': ValueString;
    '_attrschemaVersion': AttrschemaVersion;
    'paketTyp': PaketTyp[];
    'inhaltsverzeichnis': Inhaltsverzeichnis[];
    'ablieferung': Ablieferung[];
    'nameSIP'?: TextString;
    'version'?: TextString;
}

export interface SIP {
    'paket': Paket[];
    'html'?: Html[];    // just a little error handler hack
}
