import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Json2xmlComponent } from './json2xml.component';

describe('Json2xmlComponent', () => {
  let component: Json2xmlComponent;
  let fixture: ComponentFixture<Json2xmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Json2xmlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Json2xmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});