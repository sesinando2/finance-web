import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Budget} from '../../../model/budget.model';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent implements OnInit {

  @Input() budgetList: Budget[] = [];
  @Output() onBudgetSelected: EventEmitter<Budget> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectBudget(budget: Budget, event) {
    let clone = new Budget();
    Object.assign(clone, budget);
    if (event.altKey) {
      clone.amount = -clone.amount;
    }
    this.onBudgetSelected.emit(clone);
  }
}
