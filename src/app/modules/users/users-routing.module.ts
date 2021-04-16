import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {UsersComponent} from './users.component';
import {UpsertUserComponent} from './upsert-user/upsert-user.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      {path: '', component: UserListComponent},
      {path: 'add', component: UpsertUserComponent},
      {path: 'edit/:id', component: UpsertUserComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
