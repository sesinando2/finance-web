import {Budget} from "./budget.model";

export class Goal extends Budget {

  targetAmount: Number;
  targetDate: Date;
  completed: Boolean;
  expired: Boolean;
  remainingBalance: Number;
}
