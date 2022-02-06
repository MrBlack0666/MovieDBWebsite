import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.url = `${environment.apiUrl}/api/Role`;
    }
    getUserRole(role) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let params = new HttpParams();
        params = params.append('username', role.username);
        params = params.append('page', role.page.toString());
        params = params.append('pageSize', role.pageSize.toString() ? role.pageSize.toString() : '');
        params = params.append('orderBy', role.orderBy);
        return this.http.get(this.url, { headers: headers, params: params });
    }
    deleteUser(id) {
        return this.http.delete(`${this.url}/${id}`);
    }
    getUserName(id) {
        return this.http.get(`${this.url}/${id}`);
    }
    changeUserRole(userNameRole) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let formData = new FormData();
        formData.append('id', userNameRole.id.toString());
        formData.append('username', userNameRole.username);
        formData.append('role', userNameRole.role);
        return this.http.post(this.url, formData, { headers: headers });
    }
    getUsersToSelect(startsWith) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');
            let params = new HttpParams();
            params = params.append('startsWith', startsWith ? startsWith : '');
            return this.http.get(`${this.url}/select`, { headers: headers, params: params }).toPromise();
        });
    }
};
UserService = __decorate([
    Injectable()
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map