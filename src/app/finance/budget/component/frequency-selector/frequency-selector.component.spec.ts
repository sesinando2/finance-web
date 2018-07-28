import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FrequencySelectorComponent} from './frequency-selector.component';
import {RouterTestingModule} from "@angular/router/testing";
import {Account} from "../../../model/account.model";
import {AccountBreadcrumbService} from "../../../account/service/account-breadcrumb/account-breadcrumb.service";
import {RoutingService} from "../../../../service/routing/routing.service";

describe('FrequencySelectorComponent', () => {
  let component: FrequencySelectorComponent;
  let fixture: ComponentFixture<FrequencySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],

      declarations: [
        FrequencySelectorComponent
      ],

      providers: [
        RoutingService,
        AccountBreadcrumbService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequencySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
