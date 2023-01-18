import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Json2xmlComponent } from './json2xml.component';

describe('Json2xmlComponent', () => {
    let component: Json2xmlComponent;
    let fixture: ComponentFixture<Json2xmlComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [Json2xmlComponent],
            imports: [
                BrowserAnimationsModule,
                MatButtonModule,
                MatIconModule,
                MatInputModule,
                ReactiveFormsModule
            ]
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
