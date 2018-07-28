import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TextareaInputComponent} from './textarea-input.component';
import {BaseInputComponent} from "../base-input/base-input.component";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

describe('TextareaInputComponent', () => {
  let component: TextareaInputComponent;
  let fixture: ComponentFixture<TextareaInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ BaseInputComponent, TextareaInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaInputComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
