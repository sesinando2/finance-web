import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountComponent} from './account.component';
import {AccountBreadcrumbComponent} from "../account-breadcrumb/account-breadcrumb.component";
import {RouterTestingModule} from "@angular/router/testing";
import {AccountLinksComponent} from "../account-links/account-links.component";
import {AccountListComponent} from "../account-list/account-list.component";
import {RoutingService} from "../../../../service/routing/routing.service";
import {AccountBreadcrumbService} from "../../service/account-breadcrumb/account-breadcrumb.service";
import {AccountService} from "../../service/account/account.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientTestingModule
      ],

      declarations: [
        AccountListComponent,
        AccountLinksComponent,
        AccountBreadcrumbComponent,

        AccountComponent
      ],

      providers: [
        RoutingService,
        AccountBreadcrumbService,
        AccountService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
