import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountLinksComponent} from './account-links.component';
import {RouterTestingModule} from "@angular/router/testing";
import {Account} from "../../../model/account.model";
import {RoutingService} from "../../../../service/routing/routing.service";

describe('AccountLinksComponent', () => {
  let component: AccountLinksComponent;
  let fixture: ComponentFixture<AccountLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],

      declarations: [
        AccountLinksComponent
      ],

      providers: [
        RoutingService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountLinksComponent);
    component = fixture.componentInstance;
    component.account = new Account();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
