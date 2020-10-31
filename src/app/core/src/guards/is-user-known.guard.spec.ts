import { TestBed } from '@angular/core/testing';

import { IsUserKnownGuard } from './is-user-known.guard';

describe('IsUserKnownGuard', () => {
  let guard: IsUserKnownGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsUserKnownGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
