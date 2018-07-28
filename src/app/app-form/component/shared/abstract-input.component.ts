import {ChangeDetectorRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {AsyncValidatorFn, FormControl, FormGroup, ValidatorFn} from "@angular/forms";

export abstract class AbstractInputComponent implements OnInit, OnChanges, OnDestroy {

  @Input() form: FormGroup = new FormGroup({});
  @Input() label: String;
  @Input() name: string;
  @Input() helpText: String;
  @Input() placeholder: String;

  @Input() formState?: any;
  @Input() validators?: ValidatorFn | ValidatorFn[] | null;
  @Input() asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;
  @Input() errorMap = {};

  @Input() readonly: boolean = false;

  formControl: FormControl;
  protected originalValue?: any;

  constructor(protected cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.formControl = new FormControl(null, this.validators, this.asyncValidator);
    this.form.addControl(this.name, this.formControl);
    this.formControl.setValue(this.formState);
    this.originalValue = this.formState;
  }

  ngOnDestroy() {
    this.form.removeControl(this.name);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.formControl && changes.formState) {
      this.formControl.setValue(changes.formState.currentValue);
      this.originalValue = this.formState;
    }
  }

  protected get hasInitialValue() {
    return this.originalValue != null && this.originalValue != undefined;
  }

  protected get hasSameValue() {
    return this.originalValue == this.formControl.value;
  }

  protected get hasChanged(): boolean {
    return (this.formControl.dirty || this.formControl.touched) && !(this.hasInitialValue && this.hasSameValue);
  }

  get isValid(): boolean {
    return this.hasChanged && this.formControl.valid;
  }

  get isInvalid(): boolean {
    return (this.hasInitialValue && this.formControl.invalid) || (this.hasChanged && this.formControl.invalid);
  }

  protected get errors(): string[] {
    return this.formControl.errors ? Object.keys(this.formControl.errors) : [];
  }

  protected get firstError(): string {
    return this.errors.length > 0 ? this.errors[0] : null;
  }

  protected getErrorText(error: string): string {
    let errorMessage = this.errorMap[error];
    return errorMessage ? errorMessage  : error;
  }

  get firstErrorText() {
    return (this.isInvalid && this.firstError) ? this.getErrorText(this.firstError) : null;
  }
}
