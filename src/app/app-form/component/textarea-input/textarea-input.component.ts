import {ChangeDetectorRef, Component} from '@angular/core';
import {AbstractInputComponent} from "../shared/abstract-input.component";

@Component({
  selector: 'app-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.scss']
})
export class TextareaInputComponent extends AbstractInputComponent {

  constructor(protected cd: ChangeDetectorRef) {
    super(cd);
  }
}
