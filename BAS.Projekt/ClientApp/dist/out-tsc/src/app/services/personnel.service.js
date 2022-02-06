import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let PersonnelService = class PersonnelService {
    constructor(http) {
        this.http = http;
        this.url = `${environment.apiUrl}/api/Personnel`;
    }
    getPersonnelToSelectList(numberOfItems, fullName, skipPersonnelList) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = new HttpHeaders();
            headers = headers.append('Content-Type', 'application/json');
            let params = new HttpParams();
            params = params.append('numberOfItems', numberOfItems.toString());
            params = params.append('fullName', fullName);
            skipPersonnelList.forEach((id, index) => {
                params = params.append(`skipPersonnelList[${index}]`, id.toString());
            });
            return yield this.http.get(`${this.url}/select`, { headers: headers, params: params }).toPromise();
        });
    }
    getPersonnel(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');
            let params = new HttpParams();
            params = params.append('fullName', filters.fullName);
            params = params.append('nationality', filters.nationality);
            params = params.append('birthDateFrom', filters.birthDateFrom ? filters.birthDateFrom.toDateString() : '');
            params = params.append('birthDateTo', filters.birthDateTo ? filters.birthDateTo.toDateString() : '');
            params = params.append('page', filters.page.toString());
            params = params.append('pageSize', filters.pageSize ? filters.pageSize.toString() : '');
            params = params.append('orderBy', filters.orderBy);
            return yield this.http.get(this.url, { headers: headers, params: params }).toPromise();
        });
    }
    editPersonnel(person) {
        let headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');
        console.log(person.dateOfBirth);
        let formData = new FormData();
        formData.append('id', person.id.toString());
        formData.append('name', person.name);
        formData.append('surname', person.surname);
        formData.append('nationality', person.nationality);
        formData.append('dateOfBirth', person.dateOfBirth.toDateString());
        return this.http.put(this.url, formData, { headers: headers });
    }
    addPersonnel(person) {
        let headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');
        let formData = new FormData();
        formData.append('id', person.id.toString());
        formData.append('name', person.name);
        formData.append('surname', person.surname);
        formData.append('nationality', person.nationality);
        formData.append('dateOfBirth', person.dateOfBirth.toDateString());
        return this.http.post(this.url, formData, { headers: headers });
    }
    deletePersonnel(id) {
        return this.http.delete(`${this.url}/${id}`);
    }
    getPerson(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.http.get(`${this.url}/${id}`).toPromise();
        });
    }
};
PersonnelService = __decorate([
    Injectable()
], PersonnelService);
export { PersonnelService };
//# sourceMappingURL=personnel.service.js.map