import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {TestsRoutingModule} from './tests-routing.module';
import {TestsComponent} from './tests.component';
import { TestListComponent } from './test-list/test-list.component';
import { UpsertTestComponent } from './upsert-test/upsert-test.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {TableModule} from 'ngx-easy-table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TestsRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    TableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
  ],
  declarations: [
    TestsComponent,
    TestListComponent,
    UpsertTestComponent,
  ]
})
export class TestsModule {
}
