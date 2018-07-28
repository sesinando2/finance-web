import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from "@angular/forms";
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

import {AppFormModule} from "../../../../app-form/app-form.module";

import {BudgetModalComponent} from './budget-modal.component';

import {BudgetService} from "../../service/budget/budget.service";
import {RoutingService} from "../../../../service/routing/routing.service";

describe('BudgetModalComponent', () => {
  let component: BudgetModalComponent;
  let fixture: ComponentFixture<BudgetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),
        ReactiveFormsModule,

        AppFormModule,

        HttpClientTestingModule,
        RouterTestingModule
      ],

      declarations: [
        BudgetModalComponent
      ],

      providers: [
        NgbActiveModal,
        BudgetService,
        RoutingService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
