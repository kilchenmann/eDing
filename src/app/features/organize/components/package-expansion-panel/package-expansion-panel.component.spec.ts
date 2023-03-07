import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageExpansionPanelComponent } from './package-expansion-panel.component';
import { AppModule } from '../../../../app.module';

describe('PackageExpansionPanelComponent', () => {
    let component: PackageExpansionPanelComponent;
    let fixture: ComponentFixture<PackageExpansionPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppModule],
            declarations: [ PackageExpansionPanelComponent ]
        }).compileComponents();

        fixture = TestBed.createComponent(PackageExpansionPanelComponent);
        component = fixture.componentInstance;
        component.ingestPackages = [];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
