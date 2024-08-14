import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { hasPermissionGuard } from './has-permission.guard';

describe('hasPermissionGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => hasPermissionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
