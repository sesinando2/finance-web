import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {Allocation} from '../../../model/allocation.model';
import {AbstractChartComponent} from "../../../component/shared/abstract-chart.component";

@Component({
  selector: 'app-transaction-allocation-chart',
  templateUrl: './transaction-allocation-chart.component.html',
  styleUrls: ['./transaction-allocation-chart.component.scss']
})
export class TransactionAllocationChartComponent extends AbstractChartComponent implements OnInit, OnChanges, DoCheck {

  @Input() allocations: Allocation[] = [];
  @Output() allocationSelected: EventEmitter<Allocation> = new EventEmitter();

  chartData = [];
  debitChardData = [];

  constructor(protected cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit() {
    this.updateChartData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.allocations) {
      this.updateChartData();
    }
  }

  updateChartData(): void {
    this.updateCreditChartData();
    this.updateDebitChartData();
    this.cd.detectChanges();
  }

  onSelect(value) {
    const allocation = this.allocations.find((a) => a.name === value.name);

    if (allocation) {
      this.allocationSelected.emit(allocation);
    }
  }

  private updateCreditChartData() {
    this.chartData = this.allocations
      .filter((allocation: Allocation) => allocation.amount >= 0)
      .map((allocation: Allocation) => {
        return {name: allocation.name, value: allocation.amount};
      });
  }

  private updateDebitChartData() {
    this.debitChardData = this.allocations
      .filter((a) => a.amount < 0)
      .map((allocation: Allocation) => {
        let value = (<number>allocation.amount) * (<number>(-1));
        return {name: allocation.name, value: value};
      });
  }
}
