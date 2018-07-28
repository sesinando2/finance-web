import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransactionService} from './service/transaction/transaction.service';
import {AllocationService} from './service/allocation/allocation.service';
import {TransactionTableComponent} from './component/transaction-table/transaction-table.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TransactionFormComponent} from './component/transaction-form/transaction-form.component';
import {AppFormModule} from "../../app-form/app-form.module";
import {TransactionAllocationChartComponent} from './component/transaction-allocation-chart/transaction-allocation-chart.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {TransactionAllocationModalComponent} from './component/transaction-allocation-modal/transaction-allocation-modal.component';
import {TransactionAllocationModalService} from './service/transaction-allocation-modal/transaction-allocation-modal.service';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { TransactionAllocationDetailsComponent } from './component/transaction-allocation-details/transaction-allocation-details.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    NgxChartsModule,
    AppFormModule
  ],

  exports: [
    TransactionTableComponent,
    TransactionFormComponent,
    TransactionAllocationChartComponent,
    TransactionAllocationModalComponent
  ],

  declarations: [
    TransactionTableComponent,
    TransactionFormComponent,
    TransactionAllocationChartComponent,
    TransactionAllocationModalComponent,
    TransactionAllocationDetailsComponent
  ],

  providers: [
    TransactionService,
    AllocationService,
    TransactionAllocationModalService
  ],

  entryComponents: [
    TransactionAllocationModalComponent,
    TransactionAllocationDetailsComponent
  ]
})
export class TransactionModule { }
