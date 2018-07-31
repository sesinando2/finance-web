import {inject, TestBed} from '@angular/core/testing';

import {LogoutGuard} from './logout.guard';

import {AuthService} from "../../service/auth/auth.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('LogoutGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],

      providers: [
        LogoutGuard,
        AuthService
      ]
    });
  });

  it('should ...', inject([LogoutGuard], (guard: LogoutGuard) => {
    expect(guard).toBeTruthy();
  }));
});
