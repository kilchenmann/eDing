import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConverterModule } from '@av-dimag/ingest';
import { HeadlineComponent } from 'src/app/shared/headline/headline.component';

import { PlaygroundComponent } from './playground.component';

describe('PlaygroundComponent', () => {
    let component: PlaygroundComponent;
    let fixture: ComponentFixture<PlaygroundComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ConverterModule
            ],
            declarations: [
                PlaygroundComponent,
                HeadlineComponent
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PlaygroundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
