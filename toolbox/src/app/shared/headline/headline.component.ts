import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss']
})
export class HeadlineComponent implements OnInit {

  @Input() title = "Haupttitel";
  @Input() subtitle = "Untertitel";

  constructor() { }

  ngOnInit(): void {
  }

}
