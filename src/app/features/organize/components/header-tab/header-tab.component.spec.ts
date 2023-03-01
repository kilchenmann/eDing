import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTabComponent } from './header-tab.component';
import { MaterialModule } from '../../../../material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StringifyValuePipe } from '../../pipes/stringify-value.pipe';

describe('HeaderTabComponent', () => {
    let component: HeaderTabComponent;
    let fixture: ComponentFixture<HeaderTabComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderTabComponent, StringifyValuePipe],
            imports: [MaterialModule, BrowserAnimationsModule, HttpClientTestingModule]
        }).compileComponents();
        fixture = TestBed.createComponent(HeaderTabComponent);
        component = fixture.componentInstance;
        component.sip = { paket: [{ paketTyp: [{ _text: 'SIP' }], _attrxmlns: { _value: '' },_attrschemaLocation: { _value: '' },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ablieferung: [],_attrtype: { _value: '1' },_attrschemaVersion: { _value: 1 }, inhaltsverzeichnis: [], '_attrxmlns:xsi':  { _value: '' } }] };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
