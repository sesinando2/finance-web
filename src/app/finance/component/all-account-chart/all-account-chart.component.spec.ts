import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {RouterTestingModule} from "@angular/router/testing";
import {RoutingService} from "../../../service/routing/routing.service";
import {AllAccountChartComponent} from "./all-account-chart.component";

describe('AllAccountBreakdownChartComponent', () => {
  let component: AllAccountChartComponent;
  let fixture: ComponentFixture<AllAccountChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,

        NgxChartsModule,
        RouterTestingModule
      ],

      declarations: [
        AllAccountChartComponent
      ],

      providers: [
        RoutingService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAccountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
