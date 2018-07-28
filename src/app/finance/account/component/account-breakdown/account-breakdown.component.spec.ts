import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {AccountBreakdownComponent} from './account-breakdown.component';
import {RouterTestingModule} from "@angular/router/testing";
import {AccountLinksComponent} from "../account-links/account-links.component";
import {FrequencySelectorComponent} from "../../../budget/component/frequency-selector/frequency-selector.component";
import {AccountBreadcrumbService} from "../../service/account-breadcrumb/account-breadcrumb.service";
import {RoutingService} from "../../../../service/routing/routing.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Account} from "../../../model/account.model";
import {BreakdownModule} from "../../../breakdown/breakdown.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('AccountBreakdownComponent', () => {
  let component: AccountBreakdownComponent;
  let fixture: ComponentFixture<AccountBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BreakdownModule,

        BrowserAnimationsModule,

        RouterTestingModule,
        HttpClientTestingModule
      ],

      declarations: [
        AccountLinksComponent,
        FrequencySelectorComponent,

        AccountBreakdownComponent
      ],

      providers: [
        RoutingService,
        AccountBreadcrumbService
      ]
    })
    .compileComponents();

    let injector = getTestBed();
    let route = injector.get(ActivatedRoute);

    route.data = Observable.of({
      account: new Account(),
      breakdownList: []
    });

    route.params = Observable.of({
      frequency: 'monthly'
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
