import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryTabComponent } from './summary-tab.component';
import { MaterialModule } from '../../../../material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Ordner } from '../../models/xmlns/bar.admin.ch/arelda/sip-arelda-v4';

describe('SummaryTabComponent', () => {
    let component: SummaryTabComponent;
    let fixture: ComponentFixture<SummaryTabComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                SummaryTabComponent
            ],
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                FormsModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SummaryTabComponent);
        component = fixture.componentInstance;
        component.sip = { paket: [] };
        component.dataSource = new MatTreeNestedDataSource<Ordner>();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
