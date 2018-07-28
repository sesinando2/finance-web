import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormGroup, ValidationErrors} from "@angular/forms";

import {Account} from "../../../model/account.model";
import {AbstractFormComponent} from "../../../../app-form/component/shared/abstract-form.component";
import {AccountService} from "../../service/account/account.service";
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent extends AbstractFormComponent implements OnInit, OnChanges {

  @Input() account = new Account();
  @Output() onFormChange = new EventEmitter<FormGroup>();
  @Output() onValueChange = new EventEmitter<any>();
  @Output() onStatusChange = new EventEmitter<any>();

  form = new FormGroup({});
  errorMap = {
    required: 'Please specify an account name.',
    unique: 'This account name has already been used. Please choose a different account name.'
  };

  constructor(private accountService: AccountService) {
    super();
    this.uniqueNameValidator = this.uniqueNameValidator.bind(this);
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((changes) => {
      this.onValueChange.emit(changes);
      this.onFormChange.emit(this.form);
    });

    this.form.statusChanges.subscribe((changes) => {
      this.onStatusChange.emit(changes);
      this.onFormChange.emit(this.form);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.account) {
      this.form.reset(this.account);
    }
  }

  uniqueNameValidator(control: AbstractControl): Observable<ValidationErrors> {
    return this.accountService.exist(new Account(this.account.id, control.value))
      .pipe(map((accountExist) => accountExist ? <ValidationErrors>{unique: true} : null));
  }
}
