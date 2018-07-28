import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TransactionAllocationModalComponent} from './transaction-allocation-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AppFormModule} from "../../../../app-form/app-form.module";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Allocation} from "../../../model/allocation.model";
import {Transaction} from "../../../model/transaction.model";

describe('TransactionAllocationModalComponent', () => {
  let component: TransactionAllocationModalComponent;
  let fixture: ComponentFixture<TransactionAllocationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,

        AppFormModule
      ],

      declarations: [
        TransactionAllocationModalComponent
      ],

      providers: [
        NgbActiveModal
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionAllocationModalComponent);
    component = fixture.componentInstance;
    component.isNew = true;
    component.allocation = new Allocation();
    component.transaction = new Transaction();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
