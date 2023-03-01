import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadlineComponent } from 'src/app/core/components/headline/headline.component';

import { StartComponent } from './start.component';

describe('StartComponent', () => {
    let component: StartComponent;
    let fixture: ComponentFixture<StartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                StartComponent,
                HeadlineComponent
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(StartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
