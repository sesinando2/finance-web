import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountListComponent} from './account-list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {AccountService} from "../../service/account/account.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AccountBreadcrumbService} from "../../service/account-breadcrumb/account-breadcrumb.service";
import {RoutingService} from "../../../../service/routing/routing.service";

describe('AccountListComponent', () => {
  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],

      declarations: [
        AccountListComponent
      ],

      providers: [
        AccountService,
        AccountBreadcrumbService,
        RoutingService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
