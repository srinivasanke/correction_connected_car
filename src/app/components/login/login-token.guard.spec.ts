import { TestBed } from '@angular/core/testing';

import { LoginTokenGuard } from './login-token.guard';

describe('LoginTokenGuard', () => {
  let guard: LoginTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
