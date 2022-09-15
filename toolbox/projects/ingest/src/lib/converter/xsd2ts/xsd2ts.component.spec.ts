import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Xsd2tsComponent } from './xsd2ts.component';

describe('Xsd2tsComponent', () => {
  let component: Xsd2tsComponent;
  let fixture: ComponentFixture<Xsd2tsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Xsd2tsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Xsd2tsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
