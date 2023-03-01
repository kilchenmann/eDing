import { Html } from '../../../xml-error';

export interface TextString {
    '_text': string;
}

export interface TextNumber {
    '_text': number;
}

export interface TextBoolean {
    '_text': boolean;
}

export interface ValueString {
    '_value': string;
}

export interface ValueNumber {
    '_value': number;
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

export interface Inhaltsverzeichnis {
    'ordner': Ordner[];
}

export interface Datum {
    'ca'?: TextBoolean[];
    'datum': TextString[];
}

export interface Provenienz {
    'aktenbildnerName': TextString[];
    'systemName': TextString[];
    'registratur': TextString[];
}

export interface Zeitraum {
    'von': Datum[];
    'bis': Datum[];
}

export interface Merkmal {
    '_attrname': ValueString;
    '_text': number | string;
}

export interface ZusatzDaten {
    'merkmal': Merkmal[];
}

export interface Dokument {
    '_attrid': ValueString;
    'titel': TextString[];
    'autor': TextString[];
    'erscheinungsform': TextString[];
    'dokumenttyp': TextString[];
    'registrierdatum': Datum[];
    'klassifizierungskategorie': TextString[];
    'oeffentlichkeitsstatus': TextString[];
    'dateiRef': TextString[];
    'datenschutz': TextBoolean[];
}

export interface Aktivitaet {
    '_attrorder': ValueNumber;
    'vorschreibung': TextString[];
    'abschlussdatum': TextString[];
}

export interface Vorgang {
    'titel': TextString[];
    'aktivitaet': Aktivitaet[];
}

export interface Dossier {
    '_attrid': ValueString;
    'titel': TextString[];
    'erscheinungsform': TextString[];
    'federfuehrendeOrganisationseinheit': TextString[];
    'entstehungszeitraum': Zeitraum[];
    'zusatzDaten': ZusatzDaten[];
    'klassifizierungskategorie': TextString[];
    'datenschutz': TextBoolean[];
    'oeffentlichkeitsstatus': TextString[];
    'aktenzeichen': TextString[];
    'eroeffnungsdatum': Datum[];
    'abschlussdatum': Datum[];
    'dokument': Dokument[];
    'vorgang': Vorgang[];
    'dateiRef': TextString[];
}

export interface Ordnungssystemposition {
    '_attrid': ValueString;
    'datenschutz': TextBoolean[];
    'nummer': TextNumber[];
    'titel': TextString[];
    'ordnungssystemposition'?: Ordnungssystemposition[];
    'dossier'?: Dossier[];
}

export interface Ordnungssystem {
    'generation': TextString[];
    'name': TextString[];
    'ordnungssystemposition': Ordnungssystemposition[];
}

export interface Ablieferung {
    '_attrtype': ValueString;
    'ablieferungstyp': TextString[];
    'ablieferndeStelle': TextString[];
    'entstehungszeitraum': TextString[];
    'ablieferungsnummer': TextString[];
    'schutzfristenkategorie': TextString[];
    'schutzfrist': TextNumber[];
    'provenienz': Provenienz[];
    'ordnungssystem': Ordnungssystem[];
}

export interface Paket {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '_attrxmlns:xsi': ValueString;
    '_attrxmlns': ValueString;
    '_attrschemaLocation': ValueString;
    '_attrtype': ValueString;
    '_attrschemaVersion': ValueNumber;
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
