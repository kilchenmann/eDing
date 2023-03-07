import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadlineComponent } from 'src/app/core/components/headline/headline.component';

import { AboutComponent } from './about.component';
import { AppModule } from '../../../../app.module';

describe('AboutComponent', () => {
    let component: AboutComponent;
    let fixture: ComponentFixture<AboutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppModule],
            declarations: [
                AboutComponent,
                HeadlineComponent
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AboutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
