import { CustumNumberPipe } from './custum-number.pipe';

describe('CustumNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new CustumNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
