import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/assets/types/loginResponse';
import { User } from 'src/assets/types/UserDto';
import { AuthService } from 'src/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8),
    ]),
  });

  registerMode: boolean = false;
  errors: boolean = false;
  errorsMsg: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('userLogedIn') != null)
      sessionStorage.removeItem('userLogedIn');
  }

  login(loginForm: FormGroup) {
    this.errorsMsg = '';
    this.errors = false;

    let user: User = {
      userName: loginForm.value.userName,
      email: loginForm.value.email,
      password: loginForm.value.password,
    };

    this.authService.login(user).then((result: LoginResponse) => {
      if (result.success) {
        sessionStorage.setItem('userLogedIn', <string>result.userLogedIn);
        this.router.navigate(['Jokes']);
      } else if (
        result.msgs?.some((msg) => msg.includes('Unregistered user'))
      ) {
        this.errors = true;
        this.registerMode = true;
        this.cdr.detectChanges();
        this.errorsMsg = result.msgs?.join(', ');
      } else if (result.msgs) {
        this.errors = true;
        this.errorsMsg = result.msgs?.join(', ');
      }
    });
  }
}
