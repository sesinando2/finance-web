import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectInputComponent} from './select-input.component';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {BaseInputComponent} from "../base-input/base-input.component";

describe('SelectInputComponent', () => {
  let component: SelectInputComponent;
  let fixture: ComponentFixture<SelectInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ BaseInputComponent, SelectInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectInputComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
