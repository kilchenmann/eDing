import { StringifyValuePipe } from './stringify-value.pipe';

describe('StringifyValuePipe', () => {
  it('create an instance', () => {
    const pipe = new StringifyValuePipe();
    expect(pipe).toBeTruthy();
  });
});
