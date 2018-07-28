import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TransactionTableComponent} from './transaction-table.component';
import {AccountService} from "../../../account/service/account/account.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TransactionService} from "../../service/transaction/transaction.service";
import {AllocationService} from "../../service/allocation/allocation.service";
import {TransactionAllocationModalService} from "../../service/transaction-allocation-modal/transaction-allocation-modal.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

describe('TransactionTableComponent', () => {
  let component: TransactionTableComponent;
  let fixture: ComponentFixture<TransactionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),
        HttpClientTestingModule
      ],

      declarations: [
        TransactionTableComponent
      ],

      providers: [
        AccountService,
        AllocationService,
        TransactionService,
        TransactionAllocationModalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
