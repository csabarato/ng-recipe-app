import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';
import {UserModel} from '../model/user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  user = new Subject<UserModel>();

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB8_5LkweSRb3fEULn1sW_wBi0-r7hNmEk`,
      {email, password, returnSecureToken: true
      })
      .pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);

      }));
  }

  login(email: string, password: string) {

    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB8_5LkweSRb3fEULn1sW_wBi0-r7hNmEk',
      {email, password, returnSecureToken: true })
      .pipe(
        catchError(this.handleError)
        , tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  private handleAuthentication(email: string, userId: string, token: string, expIn: number) {
    const expDate = new Date(new Date().getTime() + (expIn * 1000));
    const user = new UserModel(email, userId, token, expDate);

    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage  = 'An unknown error occured';
    console.log(errorRes);

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes = errorRes.error.error.message) {

      case 'EMAIL_EXISTS' :
        errorMessage = 'This email is registered already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email doesn\'t exists!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect password!';
    }
    return throwError(errorMessage);

  }
}
