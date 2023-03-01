import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadlineComponent } from 'src/app/core/components/headline/headline.component';

import { InfoPageComponent } from './info-page.component';

describe('AboutComponent', () => {
    let component: InfoPageComponent;
    let fixture: ComponentFixture<InfoPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                InfoPageComponent,
                HeadlineComponent
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(InfoPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
