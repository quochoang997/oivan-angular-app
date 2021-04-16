import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './helpers/auth.guard';

const accountModule = () => import('./modules/account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./modules/users/users.module').then(x => x.UsersModule);
const testsModule = () => import('./modules/test/tests.module').then(x => x.TestsModule);

const routes: Routes = [
  {path: 'users', loadChildren: usersModule, canActivate: [AuthGuard]},
  {path: 'tests', loadChildren: testsModule, canActivate: [AuthGuard]},
  {path: 'auth', loadChildren: accountModule},

  // otherwise redirect to home
  {path: '**', redirectTo: 'users'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
