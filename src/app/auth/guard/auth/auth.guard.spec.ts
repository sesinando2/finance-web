import {inject, TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";
import createSpy = jasmine.createSpy;

describe('AuthGuard', () => {

  let router = {
    navigate: createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],

      providers: [
        AuthGuard,
        AuthService,
        { provide: Window, useValue: window },
        { provide: Router, useValue: router }
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
