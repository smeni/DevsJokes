import { Injectable } from '@angular/core';
import { User } from 'src/assets/types/UserDto';
import { LoginResponse } from 'src/assets/types/loginResponse';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  login(user: User) {
    return this.checkAuthorization(user);
  }

  private checkAuthorization(user: User): Promise<LoginResponse> {
    return new Promise((resolve) => {
      let loginResponse: LoginResponse = {
        success: true,
        msgs: [],
      };
      let notRegisterMode: boolean = !user.userName;
      let userFromStoresge: User = new User();
      if (localStorage.getItem(`users.${user.email}`))
        userFromStoresge = JSON.parse(
          localStorage.getItem(`users.${user.email}`) ?? ''
        );

      if (notRegisterMode) {
        if (!userFromStoresge.userName) {
          loginResponse.success = false;
          loginResponse.msgs?.push(
            'Unregistered user, please register and log in again.'
          );
        } else if (
          userFromStoresge['email'] != user.email ||
          userFromStoresge['password'] != user.password
        ) {
          loginResponse.success = false;
          loginResponse.msgs?.push(
            "One of the details entered does not match the user's details."
          );
        } else {
          loginResponse.userLogedIn = userFromStoresge['userName'];
        }
      } else {
        if (localStorage.getItem(`users.${user.userName}`))
          userFromStoresge = JSON.parse(
            localStorage.getItem(`users.${user.userName}`) ?? ''
          );

        if (userFromStoresge.userName) {
          loginResponse.success = false;
          loginResponse.msgs?.push(
            'Username already exists, please choose another username.'
          );
        } else
          localStorage.setItem(`users.${user.email}`, JSON.stringify(user));
      }

      resolve(loginResponse);
    });
  }

  logOut() {
    this.router.navigate(['login']);
  }
}
