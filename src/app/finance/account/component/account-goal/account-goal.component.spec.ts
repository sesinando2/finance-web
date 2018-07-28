import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {HttpClientTestingModule} from "@angular/common/http/testing";

import {BudgetModule} from "../../../budget/budget.module";

import {AccountGoalComponent} from './account-goal.component';

describe('AccountGoalComponent', () => {
  let component: AccountGoalComponent;
  let fixture: ComponentFixture<AccountGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),

        BudgetModule,

        HttpClientTestingModule
      ],
      declarations: [ AccountGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
