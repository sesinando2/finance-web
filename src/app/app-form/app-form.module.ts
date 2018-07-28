import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {TextInputComponent} from './component/text-input/text-input.component';
import {TextareaInputComponent} from './component/textarea-input/textarea-input.component';
import {BaseInputComponent} from './component/base-input/base-input.component';
import {MoneyInputComponent} from './component/money-input/money-input.component';
import {SelectInputComponent} from './component/select-input/select-input.component';
import {DateInputComponent} from './component/date-input/date-input.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule
  ],

  exports: [
    BaseInputComponent,
    TextInputComponent,
    TextareaInputComponent,
    MoneyInputComponent,
    SelectInputComponent,
    DateInputComponent
  ],

  declarations: [
    BaseInputComponent,
    TextInputComponent,
    TextareaInputComponent,
    MoneyInputComponent,
    SelectInputComponent,
    DateInputComponent
  ]
})
export class AppFormModule { }
