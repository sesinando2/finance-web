import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DateInputComponent} from './date-input.component';
import {BaseInputComponent} from "../base-input/base-input.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";


describe('DateInputComponent', () => {
  let component: DateInputComponent;
  let fixture: ComponentFixture<DateInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, NgbModule.forRoot() ],
      declarations: [ DateInputComponent, BaseInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateInputComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
