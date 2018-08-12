import {inject, TestBed} from '@angular/core/testing';

import {LogoutGuard} from './logout.guard';

import {AuthService} from "../../service/auth/auth.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('LogoutGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
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
