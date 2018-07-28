import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {AccountTransactionDetailsComponent} from './account-transaction-details.component';
import {AccountLinksComponent} from "../account-links/account-links.component";
import {RouterTestingModule} from "@angular/router/testing";
import {TransactionModule} from "../../../transaction/transaction.module";
import {AccountService} from "../../service/account/account.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Account} from "../../../model/account.model";
import "rxjs/add/observable/of"
import {RoutingService} from "../../../../service/routing/routing.service";

describe('AccountTransactionDetailsComponent', () => {
  let component: AccountTransactionDetailsComponent;
  let fixture: ComponentFixture<AccountTransactionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TransactionModule,

        RouterTestingModule,
        HttpClientTestingModule
      ],

      declarations: [
        AccountLinksComponent,
        AccountTransactionDetailsComponent
      ],

      providers: [
        AccountService,
        RoutingService
      ]
    })
    .compileComponents();

    let injector = getTestBed();
    let activatedRoute = injector.get(ActivatedRoute);
    spyOnProperty(activatedRoute, 'parent', 'get').and.returnValue(activatedRoute);
    activatedRoute.data = Observable.of({
      account: new Account(),
      transactionList: []
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTransactionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
