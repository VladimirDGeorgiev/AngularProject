import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

export interface AuthResponceData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthUser(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn)
        }
        ));
  }

  login(email: string, password: string) {

    return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthUser(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn)
        })
      );
  }

  autologin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: Date
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loginUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

    if (loginUser.token) {
      this.user.next(loginUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  private handleAuthUser(email: string, localId: string, idToken: string, expiresIn: number) {

    const expirationData = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, localId, idToken, expirationData)
    this.user.next(user)
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user));

  }

  private handleError(errorRes: HttpErrorResponse) {
    let message = 'An unknown error occurred!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(message);
    }

    switch (errorRes.error.error.message) {
      //Login errors
      case 'EMAIL_NOT_FOUND': message = 'There is no user record corresponding to this identifier. The user may have been deleted.'; break;
      case 'INVALID_PASSWORD': message = 'The password is invalid or the user does not have a password'; break;
      case 'USER_DISABLED': message = 'The user account has been disabled by an administrator'; break;
      //Sign up errors
      case 'EMAIL_EXISTS': message = 'The email address is already in use by another account.'; break;
      case 'OPERATION_NOT_ALLOWED': message = 'Password sign-in is disabled for this project.'; break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER': message = 'We have blocked all requests from this device due to unusual activity. Try again later.'; break;
    }
    return throwError(message);
  }
}
