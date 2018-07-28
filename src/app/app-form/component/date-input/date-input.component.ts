import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, SimpleChanges,
  ViewChild
} from '@angular/core';
import {AbstractInputComponent} from "../shared/abstract-input.component";
import {NgbDateAdapter, NgbDateNativeAdapter, NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";
import {ApiDateAdapter} from "./api-date.adapter";

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: ApiDateAdapter}]
})
export class DateInputComponent extends AbstractInputComponent implements AfterViewInit {

  @ViewChild('datePicker') datePicker: NgbInputDatepicker;
  @ViewChild('datePickerInput') datePickerInput: ElementRef;
  @ViewChild('datePickerButton') datePickerButton: ElementRef;

  @Input() minDate: Date;

  private dateAdapter: NgbDateNativeAdapter;

  constructor(private el: ElementRef, protected cd: ChangeDetectorRef) {
    super(cd);

    this.dateAdapter = new NgbDateNativeAdapter();
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    let calendar = this.el.nativeElement.querySelector('ngb-datepicker');
    let isDatePicker = this.datePickerInput.nativeElement.contains(event.target);
    let isDatePickerButton = this.datePickerButton.nativeElement.contains(event.target);
    let isCalendar = calendar && calendar.contains(event.target);
    let shouldClose = !(isDatePicker || isDatePickerButton || isCalendar);

    if (this.datePicker.isOpen() && shouldClose) {
      this.datePicker.close();
    }
  }

  get minimumDate() {
    if (this.minDate) {
      return this.dateAdapter.fromModel(this.minDate);
    }
  }

  protected get errors(): string[] {
    let errors = this.formControl.errors ? Object.keys(this.formControl.errors) : [];
    return errors.reduce((accumulator: string[], error: string) => {
       if (error == 'ngbDate') {
         this.getDateErrors(this.formControl.errors[error]).forEach((dateError) => accumulator.push(dateError));
       } else {
         accumulator.push(error);
       }

       return accumulator;
     }, []);
  }

  protected getDateErrors(errors): string[] {
    return (errors ? Object.keys(errors) : []).map((error) => `ngbDate.${error}`);
  }
}
