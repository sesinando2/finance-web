import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxChartsModule} from "@swimlane/ngx-charts";

import {AccountModule} from "./account/account.module";
import {BudgetModule} from "./budget/budget.module";
import {BreakdownModule} from "./breakdown/breakdown.module";
import {FinanceRoutingModule} from "./finance-routing.module";

import {BaseComponent} from './component/base/base.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {SidebarComponent} from './component/sidebar/sidebar.component';
import {AllAccountChartComponent} from "./component/all-account-chart/all-account-chart.component";

import {AllAccountBreakdownResolve} from "./resolve/all-account-breakdown.resolve";
import {AllAccountTotalBreakdownResolve} from "./resolve/all-account-total-breakdown.resolve";

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    NgbModule,

    FinanceRoutingModule,

    AccountModule,
    BreakdownModule,
    BudgetModule
  ],

  declarations: [
    BaseComponent,
    DashboardComponent,
    SidebarComponent,
    AllAccountChartComponent
  ],

  providers: [
    AllAccountBreakdownResolve,
    AllAccountTotalBreakdownResolve
  ]
})
export class FinanceModule { }
