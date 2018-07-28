import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TextInputComponent} from './text-input.component';
import {BaseInputComponent} from "../base-input/base-input.component";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ BaseInputComponent, TextInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
