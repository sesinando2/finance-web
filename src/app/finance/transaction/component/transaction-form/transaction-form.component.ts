import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractFormComponent} from '../../../../app-form/component/shared/abstract-form.component';
import {FormGroup} from '@angular/forms';
import {Transaction} from '../../../model/transaction.model';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent extends AbstractFormComponent implements OnInit {

  @Input() transaction: Transaction;
  @Output() onFormUpdated: EventEmitter<FormGroup> = new EventEmitter();

  form: FormGroup = new FormGroup({});

  readonly dateErrors = {
    required: 'Please specify the date when this transaction occurred.',
    'ngbDate.invalid': 'Please enter a valid date (yyyy-mm-dd).'
  };

  constructor() { super(); }

  ngOnInit() {
    this.form.valueChanges.subscribe(this.formUpdated.bind(this));
    this.form.statusChanges.subscribe(this.formUpdated.bind(this));
  }

  formUpdated() {
    this.onFormUpdated.emit(this.form);
  }
}
