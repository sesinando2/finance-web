import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

import {AppFormModule} from "../../../../app-form/app-form.module";
import {BudgetModule} from "../../../budget/budget.module";
import {TransactionModule} from "../../../transaction/transaction.module";
import {BreakdownModule} from "../../../breakdown/breakdown.module";

import {AccountComponent} from "../account/account.component";
import {AccountBudgetComponent} from './account-budget.component';
import {AccountGoalComponent} from "../account-goal/account-goal.component";
import {AccountLinksComponent} from "../account-links/account-links.component";
import {AccountNewComponent} from "../account-new/account-new.component";
import {AccountDetailsComponent} from "../account-details/account-details.component";
import {AccountBreakdownComponent} from "../account-breakdown/account-breakdown.component";
import {AccountTransactionDetailsComponent} from "../account-transaction-details/account-transaction-details.component";
import {AccountTransactionNewComponent} from "../account-transaction-new/account-transaction-new.component";
import {AccountBreadcrumbComponent} from "../account-breadcrumb/account-breadcrumb.component";
import {AccountListComponent} from "../account-list/account-list.component";
import {AccountFormComponent} from "../account-form/account-form.component";

import {RoutingService} from "../../../../service/routing/routing.service";
import {TransactionService} from "../../../transaction/service/transaction/transaction.service";
import {AccountBreadcrumbService} from "../../service/account-breadcrumb/account-breadcrumb.service";

import {Account} from "../../../model/account.model";

import "rxjs/add/observable/of"
import {Observable} from "rxjs/Observable";

describe('AccountBudgetComponent', () => {
  let component: AccountBudgetComponent;
  let fixture: ComponentFixture<AccountBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NgbModule.forRoot(),
        ReactiveFormsModule,
        BrowserAnimationsModule,

        AppFormModule,
        BudgetModule,
        BreakdownModule,
        TransactionModule,

        RouterTestingModule,
        HttpClientTestingModule
      ],

      declarations: [
        AccountComponent,
        AccountListComponent,
        AccountFormComponent,
        AccountLinksComponent,
        AccountNewComponent,
        AccountDetailsComponent,
        AccountBreakdownComponent,
        AccountBreadcrumbComponent,
        AccountGoalComponent,
        AccountTransactionDetailsComponent,
        AccountTransactionNewComponent,

        AccountBudgetComponent
      ],

      providers: [
        RoutingService,
        AccountBreadcrumbService,
        TransactionService
      ]
    })
    .compileComponents();

    let injector = getTestBed();
    let activatedRoute = injector.get(ActivatedRoute);

    activatedRoute.data = Observable.of({
      account: new Account(),
      goalList: [],
      budgetList: []
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
