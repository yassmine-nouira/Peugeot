import { TestBed } from '@angular/core/testing';

import { ToekenInterceptorInterceptor } from './toeken-interceptor.interceptor';

describe('ToekenInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ToekenInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ToekenInterceptorInterceptor = TestBed.inject(ToekenInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
