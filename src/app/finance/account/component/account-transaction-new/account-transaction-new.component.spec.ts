import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {AccountTransactionNewComponent} from './account-transaction-new.component';
import {TransactionModule} from "../../../transaction/transaction.module";
import {BudgetModule} from "../../../budget/budget.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AccountService} from "../../service/account/account.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Account} from "../../../model/account.model";
import "rxjs/add/observable/of"
import {AccountBreadcrumbService} from "../../service/account-breadcrumb/account-breadcrumb.service";
import {RoutingService} from "../../../../service/routing/routing.service";

describe('AccountTransactionNewComponent', () => {
  let component: AccountTransactionNewComponent;
  let fixture: ComponentFixture<AccountTransactionNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),

        BudgetModule,
        TransactionModule,

        RouterTestingModule,
        HttpClientTestingModule
      ],

      declarations: [
        AccountTransactionNewComponent
      ],

      providers: [
        RoutingService,
        AccountService,
        AccountBreadcrumbService
      ]
    })
    .compileComponents();

    let injector = getTestBed();
    let activatedRoute = injector.get(ActivatedRoute);
    spyOnProperty(activatedRoute, 'parent', 'get').and.returnValue(activatedRoute);
    activatedRoute.data = Observable.of({
      account: new Account(),
      budgetList: [],
      frequency: 'monthly'
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTransactionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
