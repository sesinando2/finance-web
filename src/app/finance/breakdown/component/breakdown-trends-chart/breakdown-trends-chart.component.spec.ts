import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {BreakdownTrendsChartComponent} from './breakdown-trends-chart.component';

describe('BreakdownTrendsChartComponent', () => {
  let component: BreakdownTrendsChartComponent;
  let fixture: ComponentFixture<BreakdownTrendsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        NgxChartsModule
      ],

      declarations: [
        BreakdownTrendsChartComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakdownTrendsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
