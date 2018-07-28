import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountBreadcrumbComponent} from './account-breadcrumb.component';
import {AccountComponent} from "../account/account.component";
import {AccountNewComponent} from "../account-new/account-new.component";
import {AccountDetailsComponent} from "../account-details/account-details.component";
import {AccountBreakdownComponent} from "../account-breakdown/account-breakdown.component";
import {AccountBudgetComponent} from "../account-budget/account-budget.component";
import {AccountTransactionDetailsComponent} from "../account-transaction-details/account-transaction-details.component";
import {AccountTransactionNewComponent} from "../account-transaction-new/account-transaction-new.component";
import {AccountListComponent} from "../account-list/account-list.component";
import {AccountFormComponent} from "../account-form/account-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AppFormModule} from "../../../../app-form/app-form.module";
import {AccountLinksComponent} from "../account-links/account-links.component";
import {BudgetModule} from "../../../budget/budget.module";
import {TransactionModule} from "../../../transaction/transaction.module";
import {RouterTestingModule} from "@angular/router/testing";
import {AccountBreadcrumbService} from "../../service/account-breadcrumb/account-breadcrumb.service";
import {RoutingService} from "../../../../service/routing/routing.service";
import {BreakdownModule} from "../../../breakdown/breakdown.module";
import {AccountGoalComponent} from "../account-goal/account-goal.component";

describe('AccountBreadcrumbComponent', () => {
  let component: AccountBreadcrumbComponent;
  let fixture: ComponentFixture<AccountBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AppFormModule,
        BudgetModule,
        BreakdownModule,
        TransactionModule,
        RouterTestingModule
      ],

      declarations: [
        AccountComponent,
        AccountListComponent,
        AccountFormComponent,
        AccountLinksComponent,
        AccountNewComponent,
        AccountDetailsComponent,
        AccountBreakdownComponent,
        AccountBudgetComponent,
        AccountGoalComponent,
        AccountTransactionDetailsComponent,
        AccountTransactionNewComponent,

        AccountBreadcrumbComponent
      ],

      providers:[
        AccountBreadcrumbService,
        RoutingService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
