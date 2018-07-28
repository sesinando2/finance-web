import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TransactionFormComponent} from './transaction-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AppFormModule} from "../../../../app-form/app-form.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {Transaction} from "../../../model/transaction.model";

describe('TransactionFormComponent', () => {
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),
        ReactiveFormsModule,

        AppFormModule
      ],

      declarations: [
        TransactionFormComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionFormComponent);
    component = fixture.componentInstance;
    component.transaction = new Transaction();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
