import {Component} from '@angular/core';
import {User} from './models/user';
import {AccountService} from './service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  user: User;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  logout(): void {
    this.accountService.logout();
  }
}
