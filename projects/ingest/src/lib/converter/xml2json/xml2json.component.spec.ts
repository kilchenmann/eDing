import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Xml2jsonComponent } from './xml2json.component';

describe('Xml2jsonComponent', () => {
    let component: Xml2jsonComponent;
    let fixture: ComponentFixture<Xml2jsonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                Xml2jsonComponent
            ],
            imports: [
                BrowserAnimationsModule,
                HttpClientTestingModule,
                MatButtonModule,
                MatInputModule,
                MatIconModule,
                MatSelectModule,
                MatTreeModule,
                ReactiveFormsModule
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
