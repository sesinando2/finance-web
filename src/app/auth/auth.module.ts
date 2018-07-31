import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthService} from './service/auth/auth.service';
import {AuthGuard} from './guard/auth/auth.guard';
import {LogoutGuard} from "./guard/logout/logout.guard";
import {AuthHttpInterceptor} from "./interceptor/auth/auth.http-interceptor";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [AuthService, AuthGuard, LogoutGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true
  }]
})
export class AuthModule { }
