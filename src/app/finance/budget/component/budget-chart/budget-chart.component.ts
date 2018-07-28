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
import {Budget} from "../../../model/budget.model";
import {AbstractChartComponent} from "../../../component/shared/abstract-chart.component";

@Component({
  selector: 'app-budget-chart',
  templateUrl: './budget-chart.component.html',
  styleUrls: ['./budget-chart.component.scss']
})
export class BudgetChartComponent extends AbstractChartComponent implements OnInit, OnChanges, DoCheck {

  @Input() budgetList: Budget[] = [];
  @Output() onBudgetSelected: EventEmitter<Budget> = new EventEmitter<Budget>();

  chartData = [];

  constructor(protected cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit() {
    this.updateChartData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.budgetList) {
      this.updateChartData();
    }
  }

  onSelect(event) {
    this.onBudgetSelected.emit(this.budgetList.find(budget => event.name === budget.name));
  }

  private updateChartData(): void {
    if (this.budgetList == null) return;
    this.chartData = this.budgetList.map((budget: Budget) => {
      return { name: budget.name, value: budget.amount, id: budget.id };
    });
    this.cd.detectChanges();
  }
}
