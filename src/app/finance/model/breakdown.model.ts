import {Account} from "./account.model";
import {Budget} from "./budget.model";

export class Breakdown {

  account: Account;
  budget: Budget;

  label: String;

  balance: number = 0;
  totalCredit: number = 0;
  totalDebit: number = 0;
  allocatedAmount: number = 0;

  expenseRate: number = 0;
  incomeRate: number = 0;
}
