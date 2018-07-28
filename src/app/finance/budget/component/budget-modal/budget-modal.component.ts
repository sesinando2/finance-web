import {Component, Input, OnInit} from '@angular/core';
import {Budget} from "../../../model/budget.model";
import {AbstractControl, FormGroup, ValidationErrors} from "@angular/forms";
import {AbstractFormComponent} from "../../../../app-form/component/shared/abstract-form.component";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BudgetService} from "../../service/budget/budget.service";
import {Account} from "../../../model/account.model";
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators";
import {RoutingService} from "../../../../service/routing/routing.service";
import {Frequency} from "../../../model/frequency.enum";

@Component({
  selector: 'app-budget-modal',
  templateUrl: './budget-modal.component.html',
  styleUrls: ['./budget-modal.component.scss']
})
export class BudgetModalComponent extends AbstractFormComponent implements OnInit {

  @Input() account: Account;
  @Input() title: String;
  @Input() budget: Budget = new Budget();

  form = new FormGroup({});

  readonly frequencyOptions = Object.keys(Frequency).map((frequency) => {
    return { label: Frequency[frequency], value: frequency };
  });

  readonly nameErrorMap = {
    required: 'Please specify the name of this budget allocation.',
    unique: 'This name has already been used. Please select a different name.'
  };

  readonly amountErrorMap = {
    required: 'Please specify the amount you want to allocate for this budget.',
    shouldBeGreaterThanZero: 'Specified amount should be greater than zero.'
  };

  readonly frequencyErrorMap = {
    required: 'Please specify how often this budget will be allocated.'
  };

  constructor(private activeModal: NgbActiveModal,
              private budgetService: BudgetService,
              private routingService: RoutingService) { super(); }

  ngOnInit() {
    this.initialiseFrequency();

  }

  uniqueBudgetNameValidator(control: AbstractControl): Observable<ValidationErrors> {
    return this.budgetService.exist(this.account.id, new Budget(this.budget.id, control.value))
      .pipe(map((budgetExists) => budgetExists ? <ValidationErrors>{unique: true} : null));
  }

  cancel() {
    this.activeModal.dismiss('Cancelled');
  }

  delete() {
    if (this.allowDelete) {
      this.budgetService.delete(this.budget.id).subscribe(this.activeModal.dismiss);
    }
  }

  save() {
    if (this.allowSave) {
      Object.assign(this.budget, this.form.value);
      this.activeModal.close(this.budget);
    }
  }

  get allowSave(): boolean {
    return this.form.valid && this.budget.hasDifferent(this.form.value);
  }

  get allowCancel(): boolean {
    return !this.form.pending;
  }

  get allowDelete(): boolean {
    return !this.isNewBudget && !this.form.pending;
  }

  get isNewBudget(): boolean {
    return !Boolean(this.budget.id);
  }

  get showDeleteButton(): boolean {
    return !this.isNewBudget;
  }

  private initialiseFrequency(): void {
    if (!this.budget.frequency) {
      this.budget.frequency = this.routingService.currentFrequency.toUpperCase();
    }
  }
}
