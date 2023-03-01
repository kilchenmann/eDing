import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageExpansionPanelComponent } from './package-expansion-panel.component';

describe('PackageExpansionPanelComponent', () => {
    let component: PackageExpansionPanelComponent;
    let fixture: ComponentFixture<PackageExpansionPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
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
