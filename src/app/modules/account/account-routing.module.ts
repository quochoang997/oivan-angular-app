import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AccountsComponent} from './accounts.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: '', component: AccountsComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: '', redirectTo: 'login',  pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {

}
