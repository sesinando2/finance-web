import {ChangeDetectorRef, Component, Input, OnChanges} from '@angular/core';
import {Breakdown} from "../../../model/breakdown.model";
import {AbstractChartComponent} from "../../../component/shared/abstract-chart.component";

@Component({
  selector: 'app-breakdown-chart',
  templateUrl: './breakdown-chart.component.html',
  styleUrls: ['./breakdown-chart.component.scss']
})
export class BreakdownChartComponent extends AbstractChartComponent implements OnChanges {

  @Input() breakdown: Breakdown;

  data: any[] = [];

  constructor(protected cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnChanges() {
    this.updateData();
  }

  updateData(): void {
    this.data = [];

    if (this.breakdown) {
      this.addToData('totalDebit', 'Expense');
      this.addToData('totalCredit', 'Income');
      this.addToData('balance', 'Balance');
      this.addToData('allocatedAmount', 'Allocated');
    }
  }

  private addToData(property: string, label: string) {
    if (this.breakdown[property]) {
      this.data.push({
        name: label,
        value: this.breakdown[property]
      })
    }
  }
}
