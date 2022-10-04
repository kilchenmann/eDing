import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadlineComponent } from 'src/app/shared/headline/headline.component';

import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
    let component: ErrorComponent;
    let fixture: ComponentFixture<ErrorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
              ErrorComponent,
              HeadlineComponent
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
