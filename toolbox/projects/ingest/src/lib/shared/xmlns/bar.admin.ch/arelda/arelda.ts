import { datei } from "./v4";

export interface Attributes {
  "xmlns:xsi": string;
  "xmlns": string;
  "xsi:schemaLocation": string;
  "xsi:type": string;
  "schemaVersion": string;
}

export interface Datei {
  "#text": string[];
  "@attributes": AttributesId;
  "name": string;
  "originalName"?: string;
	"pruefalgorithmus": ("MD5" | "SHA-1" | "SHA-256" | "SHA-512");
	"pruefsumme": string;
	"eigenschaft"?: any[];
}

export interface Ordner {
  "#text": string[];
  "name": string;
  "originalName": string;
  "ordner": Ordner[];
  "datei": Datei[];
}

export interface Inhaltsverzeichnis {
  "#text": string[];
  "ordner": Ordner[];
}

export interface AttributesType {
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

export interface AttributesId {
  "id": string;
}

export interface ZusatzDaten {
  "#text": string[];
  "merkmal": string;
}

export interface Dossier {
  "@attributes": AttributesType;
  "#text": string[];
  "titel": string;
  "erscheinungsform": string;
  "entstehungszeitraum": Entstehungszeitraum;
  "oeffentlichkeitsstatus": string;
  "zusatzDaten": ZusatzDaten;
  "dossier": Dossier[];
  "dateiRef": string[];
}

export interface Ordnungssystemposition3 {
  "@attributes": AttributesId;
  "#text": string[];
  "datenschutz": string;
  "nummer": string;
  "titel": string;
  "dossier": Dossier;
}

export interface Ordnungssystemposition2 {
  "@attributes": AttributesId;
  "#text": string[];
  "datenschutz": string;
  "nummer": string;
  "titel": string;
  "ordnungssystemposition": Ordnungssystemposition3;
}

export interface Ordnungssystemposition {
  "@attributes": AttributesId;
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
  "@attributes": AttributesType;
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



