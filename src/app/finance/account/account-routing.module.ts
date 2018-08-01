import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AccountResolve} from "./resolve/account.resolve";
import {AccountListResolve} from "./resolve/account-list.resolve";
import {AccountComponent} from "./component/account/account.component";
import {AccountDetailsComponent} from "./component/account-details/account-details.component";
import {AccountNewComponent} from "./component/account-new/account-new.component";
import {AccountBudgetComponent} from "./component/account-budget/account-budget.component";
import {AccountBudgetListResolve} from "./resolve/account-budget-list.resolve";
import {AccountTransactionListResolve} from "./resolve/account-transaction-list.resolve";
import {AccountTransactionDetailsComponent} from "./component/account-transaction-details/account-transaction-details.component";
import {AccountTransactionNewComponent} from "./component/account-transaction-new/account-transaction-new.component";
import {AccountBreakdownComponent} from "./component/account-breakdown/account-breakdown.component";
import {AccountBreakdownResolve} from "./resolve/account-breakdown.resolve";
import {AccountGoalListResolve} from "./resolve/account-goal-list.resolve";
import {AccountTotalBreakdownResolve} from "./resolve/account-total-breakdown.resolve";

const routes: Routes = [
  { path: '', component: AccountComponent,
    resolve: { accountList: AccountListResolve },
    children: [
      { path: 'new', component: AccountNewComponent,
        resolve: { account: AccountResolve }
      },
      { path: ':id',
        resolve: { account: AccountResolve },
        children: [
          { path: '', redirectTo: 'breakdown/monthly', pathMatch: 'full' },
          { path: 'details', component: AccountDetailsComponent },

          { path: 'breakdown', redirectTo: 'breakdown/monthly', pathMatch: 'full' },
          { path: 'breakdown/:frequency', component: AccountBreakdownComponent,
            resolve: {
              breakdownList: AccountBreakdownResolve,
              totalBreakdown: AccountTotalBreakdownResolve
            }
          },

          { path: 'budget', redirectTo: 'budget/monthly', pathMatch: 'full' },
          { path: 'budget/:frequency', component: AccountBudgetComponent,
            resolve: {
              goalList: AccountGoalListResolve,
              budgetList: AccountBudgetListResolve
            }
          },
          { path: 'transaction' ,
            children: [
              { path: '', component: AccountTransactionDetailsComponent,
                resolve: {
                  transactionList: AccountTransactionListResolve
                }
              },

              { path: 'new', redirectTo: 'new/monthly', pathMatch: 'full' },
              { path: 'new/:frequency', component: AccountTransactionNewComponent,
                resolve: {
                  budgetList: AccountBudgetListResolve
                }
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
