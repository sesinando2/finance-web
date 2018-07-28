import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BreakdownChartComponent} from './breakdown-chart.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('BreakdownChartComponent', () => {
  let component: BreakdownChartComponent;
  let fixture: ComponentFixture<BreakdownChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,

        NgxChartsModule
      ],

      declarations: [
        BreakdownChartComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakdownChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
