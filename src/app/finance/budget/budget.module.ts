import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BudgetService} from './service/budget/budget.service';
import {BudgetRoutingModule} from "./budget-routing.module";
import {BudgetChartComponent} from './component/budget-chart/budget-chart.component';
import {AppFormModule} from "../../app-form/app-form.module";
import {BudgetModalComponent} from './component/budget-modal/budget-modal.component';
import {BudgetModalService} from './service/budget-modal/budget-modal.service';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";
import {BudgetListComponent} from './component/budget-list/budget-list.component';
import {FrequencySelectorComponent} from './component/frequency-selector/frequency-selector.component';
import {GoalListComponent} from './component/goal-list/goal-list.component';
import {GoalModalComponent} from './component/goal-modal/goal-modal.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NgxChartsModule,
    ReactiveFormsModule,
    BudgetRoutingModule,
    AppFormModule
  ],

  exports: [
    BudgetChartComponent,
    BudgetModalComponent,
    BudgetListComponent,
    FrequencySelectorComponent,
    GoalListComponent,
    GoalModalComponent
  ],

  declarations: [
    BudgetChartComponent,
    BudgetModalComponent,
    BudgetListComponent,
    FrequencySelectorComponent,
    GoalListComponent,
    GoalModalComponent
  ],

  entryComponents: [
    BudgetModalComponent,
    GoalModalComponent
  ]
})
export class BudgetModule { }
