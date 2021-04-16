import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UserListComponent} from './user-list/user-list.component';
import {UsersComponent} from './users.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {TableModule} from 'ngx-easy-table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {UpsertUserComponent} from './upsert-user/upsert-user.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    TableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
  ],
  declarations: [
    UsersComponent,
    UserListComponent,
    UpsertUserComponent
  ]
})
export class UsersModule {
}
