import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Columns, Config, DefaultConfig} from 'ngx-easy-table';
import {TestService} from '../../../service/test.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestListComponent implements OnInit {
  @ViewChild('actionsTpl', { static: true }) actionsTpl!: TemplateRef<any>;
  testData = [];
  columns!: Columns[];
  configuration: Config = { ...DefaultConfig };

  constructor(
    private testService: TestService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.columns = [
      { key: 'name', title: 'Name' },
      { key: 'description', title: 'Description' },
      { key: 'total_question', title: '# Questions' },
      { key: 'actions', title: 'Actions', cellTemplate: this.actionsTpl },
    ];
    this.testService.getAll().subscribe(results => {
      if (results) {
        this.testData = results.tests.tests;
        this.cdr.markForCheck();
      }
    });
  }

  deleteTest(id: number): void {
    this.testService.delete(id);
      // .pipe(first())
      // .subscribe(() => this.users = this.users.filter(x => x.id !== id));
  }

}
