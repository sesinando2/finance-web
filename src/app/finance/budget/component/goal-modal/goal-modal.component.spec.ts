import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from "@angular/forms";
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

import {AppFormModule} from "../../../../app-form/app-form.module";

import {GoalModalComponent} from './goal-modal.component';
import {RoutingService} from "../../../../service/routing/routing.service";

describe('GoalModalComponent', () => {
  let component: GoalModalComponent;
  let fixture: ComponentFixture<GoalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgbModule.forRoot(),

        AppFormModule,

        HttpClientTestingModule,
        RouterTestingModule
      ],

      declarations: [
        GoalModalComponent
      ],

      providers: [
        NgbActiveModal,
        RoutingService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
