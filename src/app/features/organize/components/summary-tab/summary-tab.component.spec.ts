import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryTabComponent } from './summary-tab.component';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Ordner } from '../../../../shared/models/xmlns/bar.admin.ch/arelda/sip-arelda-v4';
import { AppModule } from '../../../../app.module';

describe('SummaryTabComponent', () => {
    let component: SummaryTabComponent;
    let fixture: ComponentFixture<SummaryTabComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                SummaryTabComponent
            ],
            imports: [
                AppModule
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
