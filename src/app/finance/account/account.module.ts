import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {AccountRoutingModule} from "./account-routing.module";
import {AppFormModule} from "../../app-form/app-form.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BudgetModule} from "../budget/budget.module";
import {TransactionModule} from "../transaction/transaction.module";

import {AccountService} from "./service/account/account.service";
import {AccountBreadcrumbService} from './service/account-breadcrumb/account-breadcrumb.service';

import {AccountResolve} from "./resolve/account.resolve";
import {AccountListResolve} from "./resolve/account-list.resolve";
import {AccountBudgetListResolve} from "./resolve/account-budget-list.resolve";

import {AccountComponent} from './component/account/account.component';
import {AccountDetailsComponent} from './component/account-details/account-details.component';
import {AccountFormComponent} from './component/account-form/account-form.component';
import {AccountListComponent} from './component/account-list/account-list.component';
import {AccountNewComponent} from './component/account-new/account-new.component';
import {AccountLinksComponent} from './component/account-links/account-links.component';
import {AccountBreadcrumbComponent} from './component/account-breadcrumb/account-breadcrumb.component';
import {AccountBudgetComponent} from './component/account-budget/account-budget.component';
import {AccountTransactionListResolve} from "./resolve/account-transaction-list.resolve";
import {AccountTransactionDetailsComponent} from './component/account-transaction-details/account-transaction-details.component';
import {AccountTransactionNewComponent} from './component/account-transaction-new/account-transaction-new.component';
import {AccountBreakdownComponent} from './component/account-breakdown/account-breakdown.component';
import {BreakdownModule} from "../breakdown/breakdown.module";
import {AccountBreakdownResolve} from "./resolve/account-breakdown.resolve";
import { AccountGoalComponent } from './component/account-goal/account-goal.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    AppFormModule,
    BudgetModule,
    TransactionModule,
    BreakdownModule
  ],

  declarations: [
    AccountComponent,
    AccountDetailsComponent,
    AccountFormComponent,
    AccountListComponent,
    AccountNewComponent,
    AccountLinksComponent,
    AccountBreadcrumbComponent,
    AccountBudgetComponent,
    AccountTransactionDetailsComponent,
    AccountTransactionNewComponent,
    AccountBreakdownComponent,
    AccountGoalComponent
  ],

  providers: [
    AccountResolve,
    AccountListResolve,
    AccountBudgetListResolve,
    AccountTransactionListResolve,
    AccountBreakdownResolve,
    AccountService,
    AccountBreadcrumbService
  ]
})
export class AccountModule { }
