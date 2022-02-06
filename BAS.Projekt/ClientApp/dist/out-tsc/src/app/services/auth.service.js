import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserRole } from '../interfaces/auth/role';
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        this.url = `${environment.apiUrl}/api/Account`;
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUserToken')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    get currentUserValue() {
        return this.currentUserSubject.value;
    }
    login(email, password) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const body = { email: email, password: password };
        return this.http.post(`${this.url}/login`, body, { headers: headers })
            .pipe(map(response => {
            if (response && response.token) {
                let user = this.getUserFromToken(response.token, response.hasConfirmedEmail);
                localStorage.setItem('currentUserToken', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }
            return response;
        }));
    }
    register(registerDTO) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post(`${this.url}/register`, registerDTO, { headers: headers });
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUserToken');
        this.currentUserSubject.next(null);
    }
    confirmEmail(userId, token) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        console.log(token);
        const body = { userId: userId, token: token };
        return this.http.post(`${this.url}/confirm`, body, { headers: headers });
    }
    getUserFromToken(token, hasConfirmedEmail) {
        const helper = new JwtHelperService();
        let user = helper.decodeToken(token);
        user.token = token;
        user.hasConfirmedEmail = hasConfirmedEmail;
        user.userRole = UserRole[user.role];
        return user;
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map