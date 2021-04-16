import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {first} from 'rxjs/operators';
import {AccountService} from '../../../service/account.service';
import { Columns, Config, DefaultConfig, Pagination } from 'ngx-easy-table';
import {User} from '../../../models/user';
import {TestService} from '../../../service/test.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  @ViewChild('actionsTpl', { static: true }) actionsTpl!: TemplateRef<any>;
  users = [];
  columns!: Columns[];
  configuration: Config = { ...DefaultConfig };

  constructor(private accountService: AccountService,
              private testService: TestService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.columns = [
      { key: 'email', title: 'Email' },
      { key: 'role', title: 'Role' },
      { key: 'actions', title: 'Actions', cellTemplate: this.actionsTpl },
    ];
    this.accountService.getAll().subscribe(results => {
      if (results) {
        this.users = results.users.users;
        this.cdr.markForCheck();
      }
    });
  }

  deleteUser(id: number): void {
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.users = this.users.filter(x => x.id !== id));
  }

}
