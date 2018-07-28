import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {AccountNewComponent} from './account-new.component';
import {AccountFormComponent} from "../account-form/account-form.component";
import {AppFormModule} from "../../../../app-form/app-form.module";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {AccountService} from "../../service/account/account.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Account} from "../../../model/account.model";
import "rxjs/add/observable/of"

describe('AccountNewComponent', () => {
  let component: AccountNewComponent;
  let fixture: ComponentFixture<AccountNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,

        AppFormModule,

        RouterTestingModule,
        HttpClientTestingModule
      ],

      declarations: [
        AccountFormComponent,

        AccountNewComponent
      ],

      providers: [
        AccountService
      ]
    })
    .compileComponents();

    let injector = getTestBed();
    let activatedRoute = injector.get(ActivatedRoute);

    activatedRoute.data = Observable.of({
      account: new Account()
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
