import {AbstractControl, ValidationErrors, Validators} from "@angular/forms";

export abstract class AbstractFormComponent {

  readonly required = Validators.required;

  shouldBeGreaterThanZeroValidator(control: AbstractControl): ValidationErrors {
    if (parseFloat(control.value) > 0) return null;

    return <ValidationErrors>{ shouldBeGreaterThanZero: true };
  }
}
