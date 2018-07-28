import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Goal} from "../../../model/goal.model";

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.scss']
})
export class GoalListComponent implements OnInit {

  @Input() goalList: Goal[] = [];
  @Output() goalSelected: EventEmitter<Goal> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectGoal(goal: Goal) {
    this.goalSelected.emit(goal);
  }

  getType(goal: Goal): String {
    if (goal.expired) {
      return 'danger';
    } else if (goal.completed) {
      return 'success';
    } else  {
      return 'info';
    }
  }
}
