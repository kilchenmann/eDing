import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { Xml2jsonComponent } from './xml2json.component';

describe('Xml2jsonComponent', () => {
  let component: Xml2jsonComponent;
  let fixture: ComponentFixture<Xml2jsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        Xml2jsonComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Xml2jsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
