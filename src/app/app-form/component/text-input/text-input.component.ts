import {ChangeDetectorRef, Component} from '@angular/core';
import {AbstractInputComponent} from "../shared/abstract-input.component";

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent extends AbstractInputComponent {

  constructor(protected cd: ChangeDetectorRef) {
    super(cd);
  }
}
