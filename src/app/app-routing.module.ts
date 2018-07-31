import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {LogoutGuard} from "./auth/guard/logout/logout.guard";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'logout', component: HomeComponent, canActivate: [LogoutGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
