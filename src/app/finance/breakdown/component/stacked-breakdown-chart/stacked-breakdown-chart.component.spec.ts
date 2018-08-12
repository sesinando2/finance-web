import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {StackedBreakdownChartComponent} from './stacked-breakdown-chart.component';

describe('StackedBreakdownChartComponent', () => {
  let component: StackedBreakdownChartComponent;
  let fixture: ComponentFixture<StackedBreakdownChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        NgxChartsModule
      ],
      declarations: [
        StackedBreakdownChartComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedBreakdownChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
