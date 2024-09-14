import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { demoResolver } from './demo.resolver';

describe('demoResolver', () => {
  const executeResolver: ResolveFn<Record<string, any>> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => demoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
