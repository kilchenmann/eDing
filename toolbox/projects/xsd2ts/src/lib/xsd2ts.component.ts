import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-xsd2ts',
  template: `
    <p>
      Hier entsteht das Modul, das zu Beginn des Ingest-Vorbereitungs-Prozesses genutzt wird.
      Vorerst nur als Frontend-Ausführung; später soll nur die Funktionalität des Konverters
      im Quellcode genutzt werden. Es geht darum, dass wir die eCH-0160 XML Struktur, die über
      xsd Files definiert ist, in Typescript Klassen oder Interfaces konvertieren können.
    </p>
  `,
  styles: [
  ]
})
export class Xsd2tsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
