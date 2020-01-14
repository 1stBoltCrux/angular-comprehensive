import { API_KEY } from "./../shared/api-key";
import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError, BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { errorDictionary } from "../shared/firebase-error.dictionary";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  user = new BehaviorSubject<User>(null);

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
${API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}
`,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  private handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    let errorMessage = "An unknown error occurred";
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    } else {
      console.log(errorResponse);
      return throwError(errorDictionary[errorResponse.error.error.message]);
    }
  }

  handleAuthentication(email, localId, idToken, expiresIn) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    console.log(new Date().getTime());
    console.log(expirationDate);
    const user = new User(email, localId, idToken, expirationDate);
    this.user.next(user);
  }
}
