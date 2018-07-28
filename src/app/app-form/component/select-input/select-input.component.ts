import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {AbstractInputComponent} from "../shared/abstract-input.component";

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent extends AbstractInputComponent{

  @Input() options: { [key: string]: any }[] = [];

  constructor(protected cd: ChangeDetectorRef) {
    super(cd);
  }
}
