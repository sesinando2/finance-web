import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from "../auth/guard/auth/auth.guard";
import {AllAccountBreakdownResolve} from "./resolve/all-account-breakdown.resolve";

import {BaseComponent} from "./component/base/base.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {AccountModule} from "./account/account.module";
import {AccountListResolve} from "./account/resolve/account-list.resolve";
import {AllAccountTotalBreakdownResolve} from "./resolve/all-account-total-breakdown.resolve";

const routes: Routes = [
  { path: '', component: BaseComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard/monthly', pathMatch: 'full' },
      { path: 'dashboard', redirectTo: 'dashboard/monthly', pathMatch: 'full' },
      { path: 'dashboard/:frequency', component: DashboardComponent,
        resolve: {
          accountList: AccountListResolve,
          breakdownList: AllAccountBreakdownResolve,
          totalBreakdown: AllAccountTotalBreakdownResolve
        }
      },
      { path: 'account', loadChildren: () => AccountModule }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
