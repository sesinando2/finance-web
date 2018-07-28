import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TransactionAllocationDetailsComponent} from './transaction-allocation-details.component';
import {TransactionAllocationChartComponent} from "../transaction-allocation-chart/transaction-allocation-chart.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Transaction} from "../../../model/transaction.model";

describe('TransactionAllocationDetailsComponent', () => {
  let component: TransactionAllocationDetailsComponent;
  let fixture: ComponentFixture<TransactionAllocationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        NgxChartsModule
      ],

      declarations: [
        TransactionAllocationChartComponent,
        TransactionAllocationDetailsComponent
      ],

      providers: [
        NgbActiveModal
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionAllocationDetailsComponent);
    component = fixture.componentInstance;
    component.transaction = new Transaction();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
