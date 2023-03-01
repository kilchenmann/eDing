import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { HeadlineComponent } from 'src/app/core/components/headline/headline.component';

import { PlaygroundComponent } from './playground.component';

describe('PlaygroundComponent', () => {
    let component: PlaygroundComponent;
    let fixture: ComponentFixture<PlaygroundComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatFormFieldModule,
                MatIconModule,
                MatInputModule,
                MatSelectModule,
                MatSnackBarModule,
                MatTabsModule,
                MatTreeModule,
                MatTooltipModule,
                ReactiveFormsModule
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
