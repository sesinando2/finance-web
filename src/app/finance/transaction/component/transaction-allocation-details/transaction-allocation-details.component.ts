import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from "../../../model/transaction.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-transaction-allocation-details',
  templateUrl: './transaction-allocation-details.component.html',
  styleUrls: ['./transaction-allocation-details.component.scss']
})
export class TransactionAllocationDetailsComponent implements OnInit {

  @Input() transaction: Transaction;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  cancel(): void {
    this.activeModal.close();
  }
}
