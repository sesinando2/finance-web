import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountFormComponent} from './account-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AppFormModule} from "../../../../app-form/app-form.module";
import {AccountService} from "../../service/account/account.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AccountFormComponent', () => {
  let component: AccountFormComponent;
  let fixture: ComponentFixture<AccountFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,

        AppFormModule,

        HttpClientTestingModule
      ],

      declarations: [
        AccountFormComponent
      ],

      providers: [
        AccountService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
