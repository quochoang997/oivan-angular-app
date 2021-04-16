import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestsComponent} from './tests.component';
import {TestListComponent} from './test-list/test-list.component';
import {UpsertTestComponent} from './upsert-test/upsert-test.component';

const routes: Routes = [
  {
    path: '', component: TestsComponent,
    children: [
      {path: '', component: TestListComponent},
      {path: 'add', component: UpsertTestComponent},
      {path: 'edit/:id', component: UpsertTestComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsRoutingModule {
}
