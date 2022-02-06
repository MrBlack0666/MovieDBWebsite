import { IRegisterDTO } from './../interfaces/auth/IRegisterDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserRole } from '../interfaces/auth/role';
import { User } from '../interfaces/auth/user';
import { IConfirmEmailDTO } from '../interfaces/auth/IConfirmEmailDTO';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `${environment.apiUrl}/api/Account`;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUserToken')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');

      const body = { email: email, password: password}
      return this.http.post<any>(`${this.url}/login`, body, { headers: headers })
          .pipe(map(response => {
              if (response && response.token) {
                  let user = this.getUserFromToken(response.token, response.hasConfirmedEmail);
                  localStorage.setItem('currentUserToken', JSON.stringify(user));
                  this.currentUserSubject.next(user);
              }

              return response;
          }));
  }

  register(registerDTO: IRegisterDTO) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<any>(`${this.url}/register`, registerDTO, { headers: headers });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUserToken');
    this.currentUserSubject.next(null);
  }

  confirmEmail(userId: string, token: string) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    console.log(token);

    const body: IConfirmEmailDTO = { userId: userId, token: token }
    return this.http.post<any>(`${this.url}/confirm`, body, { headers: headers });
  }

  private getUserFromToken(token, hasConfirmedEmail) : User {
    const helper = new JwtHelperService();
    let user = helper.decodeToken<User>(token);
    user.token = token;
    user.hasConfirmedEmail = hasConfirmedEmail;
    user.userRole = UserRole[user.role];
    return user;
  }
}