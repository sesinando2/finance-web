import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TransactionAllocationChartComponent} from './transaction-allocation-chart.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxChartsModule} from "@swimlane/ngx-charts";

describe('TransactionAllocationChartComponent', () => {
  let component: TransactionAllocationChartComponent;
  let fixture: ComponentFixture<TransactionAllocationChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        NgxChartsModule
      ],

      declarations: [
        TransactionAllocationChartComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionAllocationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
