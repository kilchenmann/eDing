import { datei } from "./v4";

export interface Attributes {
  "xmlns:xsi": string;
  "xmlns": string;
  "xsi:schemaLocation": string;
  "xsi:type": string;
  "schemaVersion": string;
}

export interface Datei {
  id: string;
	/** Name und Wert von technischen Eigenschaften der Dateien wie z.B. Felddelemiter. */
	eigenschaft?: any[];
	name: string;
	originalName?: string;
	pruefalgorithmus: ("MD5" | "SHA-1" | "SHA-256" | "SHA-512");
	pruefsumme: string;
}

export interface Ordner {
  "#text": string[];
  "name": string;
  "originalName": string;
  "ordner": Ordner[] | Ordner;
  "datei": Datei[];
}

export interface Inhaltsverzeichnis {
  "#text": string[];
  "ordner": Ordner[];
}

export interface Attributes2 {
  "xsi:type": string;
}

export interface Von {
  "#text": string[];
  "datum": string;
}

export interface Bis {
  "#text": string[];
  "datum": string;
}

export interface Entstehungszeitraum {
  "#text": string[];
  "von": Von;
  "bis": Bis;
}

export interface Provenienz {
  "#text": string[];
  "aktenbildnerName": string;
  "systemName": string;
  "registratur": string;
}

export interface Attributes3 {
  "id": string;
}

export interface Attributes4 {
  "id": string;
}

export interface Attributes5 {
  "id": string;
}

export interface Ordnungssystemposition3 {
  "@attributes": Attributes5;
  "#text": string[];
  "datenschutz": string;
  "nummer": string;
  "titel": string;
  "dossier": any;
}

export interface Ordnungssystemposition2 {
  "@attributes": Attributes4;
  "#text": string[];
  "datenschutz": string;
  "nummer": string;
  "titel": string;
  "ordnungssystemposition": Ordnungssystemposition3;
}

export interface Ordnungssystemposition {
  "@attributes": Attributes3;
  "#text": string[];
  "datenschutz": string;
  "nummer": string;
  "titel": string;
  "ordnungssystemposition": Ordnungssystemposition2;
}

export interface Ordnungssystem {
  "#text": string[];
  "generation": string;
  "name": string;
  "ordnungssystemposition": Ordnungssystemposition[];
}

export interface Ablieferung {
  "@attributes": Attributes2;
  "#text": string[];
  "ablieferungstyp": string;
  "ablieferndeStelle": string;
  "entstehungszeitraum": Entstehungszeitraum;
  "ablieferungsnummer": string;
  "schutzfristenkategorie": string;
  "schutzfrist": string;
  "provenienz": Provenienz;
  "ordnungssystem": Ordnungssystem;
}

export interface Paket {
  "@attributes": Attributes;
  "#text": string[];
  "paketTyp": string;
  "inhaltsverzeichnis": Inhaltsverzeichnis;
  "ablieferung": Ablieferung;
}

export interface Comment {
}

export interface Arelda {
  "paket"?: Paket;
  "#comment"?: Comment;
}



