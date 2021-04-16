import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../../service/account.service';

@Component({
  selector: 'app-account',
  template: '<router-outlet></router-outlet>',
})
export class AccountsComponent {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
    // redirect to home if already logged in
    if (this.accountService.userValue) {
      this.router.navigate(['/']);
    }
  }
}
