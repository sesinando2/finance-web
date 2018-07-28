import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {AccountBreakdownChartComponent} from "./component/account-breakdown-chart/account-breakdown-chart.component";
import {BreakdownService} from './service/breakdown/breakdown.service';
import {BreakdownChartComponent} from './component/breakdown-chart/breakdown-chart.component';

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule
  ],

  exports: [
    AccountBreakdownChartComponent,
    BreakdownChartComponent
  ],

  declarations: [
    AccountBreakdownChartComponent,
    BreakdownChartComponent
  ],

  providers: [
    BreakdownService
  ]
})
export class BreakdownModule { }
