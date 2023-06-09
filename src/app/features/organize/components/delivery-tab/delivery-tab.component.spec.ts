import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeliveryTabComponent } from './delivery-tab.component';
import { AppModule } from '../../../../app.module';

describe('DeliveryTabComponent', () => {
    let component: DeliveryTabComponent;
    let fixture: ComponentFixture<DeliveryTabComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppModule],
            declarations: [ DeliveryTabComponent ]
        }).compileComponents();

        fixture = TestBed.createComponent(DeliveryTabComponent);
        component = fixture.componentInstance;
        component.sip = {
            'paket': [{
                'paketTyp': [
                    { '_text': 'SIP' }
                ],
                '_attrxmlns': { '_value': '' },
                '_attrschemaLocation': { '_value': '' },
                '_attrtype': { '_value': '1' },
                '_attrschemaVersion': { '_value': 1 },
                'inhaltsverzeichnis': [],
                // eslint-disable-next-line @typescript-eslint/naming-convention
                '_attrxmlns:xsi': { '_value': '' },
                'ablieferung': [],
                '_text': ''
            }]
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
