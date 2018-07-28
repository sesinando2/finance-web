import {Component, Input, OnInit} from '@angular/core';
import {Allocation} from '../../../model/allocation.model';
import {AbstractFormComponent} from '../../../../app-form/component/shared/abstract-form.component';
import {AbstractControl, FormGroup, ValidationErrors} from '@angular/forms';
import {Transaction} from '../../../model/transaction.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-transaction-allocation-modal',
  templateUrl: './transaction-allocation-modal.component.html',
  styleUrls: ['./transaction-allocation-modal.component.scss']
})
export class TransactionAllocationModalComponent extends AbstractFormComponent implements OnInit {

  @Input() isNew = false;
  @Input() allocation: Allocation;
  @Input() transaction: Transaction;

  form: FormGroup = new FormGroup({});

  nameErrorMap = {
    required: 'Please specify a name for this allocation.',
    unique: 'This name has already been used. Please choose a different name.'
  };

  amountErrorMap = {
    required: 'Please specify how much you want to allocate.',
    shouldBeGreaterThanZero: 'Allocated amount should be greater than zero.'
  };

  constructor(private activeModal: NgbActiveModal) {
    super();
    this.uniqueAllocationName = this.uniqueAllocationName.bind(this);
  }

  ngOnInit() {
  }

  uniqueAllocationName(control: AbstractControl): Observable<ValidationErrors> {
    return new Observable((subscriber) => {
      const existingTransaction = this.transaction.allocations
        .find((allocation: Allocation) => {
          return control.value === allocation.name && allocation !== this.allocation;
        });

      if (!existingTransaction) {
        subscriber.next(null);
      } else {
        subscriber.next(<ValidationErrors>{ unique: true });
      }

      subscriber.complete();
    });
  }

  save(): void {
    this.activeModal.close(Object.assign(this.allocation, this.form.value));
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  delete(): void {
    const index = this.transaction.allocations.indexOf(this.allocation);
    this.transaction.allocations.splice(index, 1);
    this.activeModal.dismiss();
  }

  get allowCancel() {
    return !this.form.pending;
  }

  get showDeleteButton() {
    return !this.isNew;
  }

  get allowDelete() {
    return this.showDeleteButton && !this.form.pending;
  }

  get allowSave() {
    return this.form.valid && this.allocation.hasDifferent(this.form.value);
  }
}
