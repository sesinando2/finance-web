import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormGroup, ValidationErrors} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

import {Frequency} from "../../../model/frequency.enum";
import {Account} from "../../../model/account.model";
import {Goal} from "../../../model/goal.model";

import {AbstractFormComponent} from "../../../../app-form/component/shared/abstract-form.component";
import {RoutingService} from "../../../../service/routing/routing.service";
import {GoalService} from "../../service/goal/goal.service";

import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {map, concatMap, filter, debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'app-goal-modal',
  templateUrl: './goal-modal.component.html',
  styleUrls: ['./goal-modal.component.scss']
})
export class GoalModalComponent extends AbstractFormComponent implements OnInit, OnDestroy {

  @Input() account: Account;
  @Input() title: String;
  @Input() goal: Goal = new Goal();

  form = new FormGroup({});
  now: Date = new Date();
  protected subscription: Subscription = new Subscription();

  readonly frequencyOptions = Object.keys(Frequency).map((frequency) => {
    return { label: Frequency[frequency], value: frequency };
  });

  readonly nameErrorMap = {
    required: 'Please specify the name of this goal.',
    unique: 'This name has already been used. Please select a different name.'
  };

  readonly frequencyErrorMap = {
    required: 'Please specify how often this goal will be allocated.'
  };

  readonly targetDateErrorMap = {
    required: 'Please specify when you want to achieve the goal.',
    'ngbDate.requiredBefore': 'Please enter a date in the future.',
    'ngbDate.invalid': 'Please enter a valid date (yyyy-mm-dd).'
  };

  readonly targetAmountErrorMap = {
    required: 'Please specify how much you want to achieve.',
    shouldBeGreaterThanZero: 'Specified amount should be greater than zero.'
  };

  constructor(private cd: ChangeDetectorRef,
              private activeModal: NgbActiveModal,
              private goalService: GoalService,
              private routingService: RoutingService) { super(); }

  ngOnInit() {
    this.initialiseFrequency();
    this.subscription.add(this.calculateAmount());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  uniqueGoalNameValidator(control: AbstractControl): Observable<ValidationErrors> {
    return this.goalService.exist(this.account.id, new Goal(this.goal.id, control.value))
      .pipe(map((goalExists) => goalExists ? <ValidationErrors>{unique: true} : null));
  }

  private initialiseFrequency(): void {
    if (this.goal.frequency == null || this.goal.frequency == undefined) {
      this.goal.frequency = this.routingService.currentFrequency.toUpperCase();
    }
  }

  private calculateAmount(): Subscription {
    return this.form.valueChanges.pipe(
      filter(this.hasValidValue.bind(this)),
      distinctUntilChanged((a: any, b: any) =>
        a.frequency == b.frequency && a.targetDate == b.targetDate && a.targetAmount == b.targetAmount),
      debounceTime(1500),
      map((value) => {
        let goal = Object.assign(new Goal(), this.goal);
        return Object.assign(goal, value);
      }),
      concatMap(this.goalService.calculate.bind(this.goalService)),
    ).subscribe((goal: Goal) => {
      this.goal.amount = goal.amount;
      this.cd.detectChanges();
    });
  }

  cancel() {
    this.activeModal.dismiss('Cancelled');
  }

  delete() {
    if (this.allowDelete) {
      this.goalService.delete(this.goal.id).subscribe(this.activeModal.dismiss);
    }
  }

  save() {
    if (this.allowSave) {
      Object.assign(this.goal, this.form.value);
      this.activeModal.close(this.goal);
    }
  }

  get allowSave(): boolean {
    return this.form.valid && this.goal.hasDifferent(this.form.value);
  }

  get allowCancel(): boolean {
    return !this.form.pending;
  }

  get allowDelete(): boolean {
    return !this.isNewGoal && !this.form.pending;
  }

  get isNewGoal(): boolean {
    return !Boolean(this.goal.id);
  }

  get showDeleteButton(): boolean {
    return !this.isNewGoal;
  }

  private hasValidValue(value: any) {
    let requiredValues = ['frequency', 'targetDate', 'targetAmount'];
    return !this.goal.completed && requiredValues.every((name) => value[name] && this.form.get(name).valid);
  }
}
