import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AccountService} from '../../../service/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upsert-user',
  templateUrl: './upsert-user.component.html',
  styleUrls: ['./upsert-user.component.css']
})
export class UpsertUserComponent implements OnInit {

  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
  ) {
  }

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      role: ['STUDENT', Validators.required],
      password: ['', passwordValidators]
    });

    if (!this.isAddMode) {
      this.accountService.getById(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x.user));
    }
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser(): void {
    this.accountService.create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (res) => Swal.fire({
          title: 'Error!',
          html: res,
          icon: 'error'
        })
      });
  }

  private updateUser(): void {
    this.accountService.update(this.id, this.form.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (res) => Swal.fire({
          title: 'Error!',
          html: res,
          icon: 'error'
        })
      });
  }

}
