import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BreakdownTrendsChartComponent} from './breakdown-trends-chart.component';

describe('BreakdownTrendsChartComponent', () => {
  let component: BreakdownTrendsChartComponent;
  let fixture: ComponentFixture<BreakdownTrendsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakdownTrendsChartComponent ]
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
