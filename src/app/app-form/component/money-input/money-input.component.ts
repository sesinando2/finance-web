import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {AbstractInputComponent} from "../shared/abstract-input.component";

@Component({
  selector: 'app-money-input',
  templateUrl: './money-input.component.html',
  styleUrls: ['./money-input.component.scss']
})
export class MoneyInputComponent extends AbstractInputComponent {

  @Input() creditDebitToggle: Boolean = false;

  constructor(protected cd: ChangeDetectorRef) {
    super(cd);
  }

  get isDebit() {
    return this.formControl.value < 0;
  }

  toggleCreditDebit() {
    this.formControl.setValue(this.formControl.value * (-1));
  }
}
