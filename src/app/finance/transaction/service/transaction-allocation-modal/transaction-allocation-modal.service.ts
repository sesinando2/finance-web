import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TransactionAllocationModalComponent} from '../../component/transaction-allocation-modal/transaction-allocation-modal.component';
import {Allocation} from '../../../model/allocation.model';
import {Transaction} from '../../../model/transaction.model';
import {TransactionAllocationDetailsComponent} from "../../component/transaction-allocation-details/transaction-allocation-details.component";

@Injectable()
export class TransactionAllocationModalService {

  constructor(private modalService: NgbModal) { }

  open(transaction: Transaction, allocation: Allocation = null): Promise<Allocation> {
    const modal = this.modalService.open(TransactionAllocationModalComponent);
    modal.componentInstance.isNew = allocation == null;
    modal.componentInstance.allocation = allocation == null ? new Allocation() : allocation;
    modal.componentInstance.transaction = transaction;
    return modal.result;
  }

  details(transaction: Transaction): void {
    const modal = this.modalService.open(TransactionAllocationDetailsComponent, {size: 'lg'});
    modal.componentInstance.transaction = transaction;
  }
}
