import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {FinanceRoutingModule} from "./finance-routing.module";
import {BreakdownModule} from "./breakdown/breakdown.module";

import {BaseComponent} from './component/base/base.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {SidebarComponent} from './component/sidebar/sidebar.component';
import {AllAccountChartComponent} from "./component/all-account-chart/all-account-chart.component";

import {AllAccountBreakdownResolve} from "./resolve/all-account-breakdown.resolve";
import {BudgetModule} from "./budget/budget.module";
import {AccountModule} from "./account/account.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

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
    AllAccountBreakdownResolve
  ]
})
export class FinanceModule { }
