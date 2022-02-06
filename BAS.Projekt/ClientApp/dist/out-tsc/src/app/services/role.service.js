import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
let RoleService = class RoleService {
    constructor(http) {
        this.http = http;
        this.url = 'http://localhost:50927/api/Role';
    }
    getGenres() {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.url, { headers: headers });
    }
};
RoleService = __decorate([
    Injectable()
], RoleService);
export { RoleService };
//# sourceMappingURL=role.service.js.map