import { StringifyValuePipe } from './stringify-value.pipe';
import { OrganizeService } from '../services/organize.service';

describe('StringifyValuePipe', () => {
    let pipe: StringifyValuePipe;
    let organizeService: OrganizeService;

    beforeEach(() => {
        organizeService = new OrganizeService();
        pipe = new StringifyValuePipe(organizeService);
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });
});
