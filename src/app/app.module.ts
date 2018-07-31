import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from "./auth/auth.module";
import {FinanceModule} from "./finance/finance.module";
import {BudgetModule} from "./finance/budget/budget.module";

import {AppComponent} from './app.component';

import {RoutingService} from "./service/routing/routing.service";
import {HomeComponent} from './component/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule.forRoot(),

    AppRoutingModule,
    AuthModule,
    FinanceModule,
    BudgetModule
  ],

  providers: [
    RoutingService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
