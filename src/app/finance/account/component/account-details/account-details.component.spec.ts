import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {AccountDetailsComponent} from './account-details.component';
import {AccountLinksComponent} from "../account-links/account-links.component";
import {RouterTestingModule} from "@angular/router/testing";
import {AccountFormComponent} from "../account-form/account-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AppFormModule} from "../../../../app-form/app-form.module";
import {AccountService} from "../../service/account/account.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Account} from "../../../model/account.model";
import {RoutingService} from "../../../../service/routing/routing.service";

describe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent;
  let fixture: ComponentFixture<AccountDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,

        AppFormModule,

        RouterTestingModule,
        HttpClientTestingModule
      ],

      declarations: [
        AccountFormComponent,
        AccountLinksComponent,

        AccountDetailsComponent
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
      account: new Account()
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
