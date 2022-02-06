import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let GenresService = class GenresService {
    constructor(http) {
        this.http = http;
        this.url = `${environment.apiUrl}/api/Genre`;
    }
    getGenre(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.http.get(`${this.url}/${id}`).toPromise();
        });
    }
    getGenres() {
        return this.http.get(this.url + "/all");
    }
    getGenresByName(genre) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let params = new HttpParams();
        params = params.append('name', genre.name);
        params = params.append('page', genre.page.toString());
        params = params.append('pageSize', genre.pageSize.toString() ? genre.pageSize.toString() : '');
        params = params.append('orderBy', genre.orderBy);
        return this.http.get(this.url, { headers: headers, params: params });
    }
    deleteGenre(id) {
        return this.http.delete(`${this.url}/${id}`);
    }
    editGenre(genre) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let formData = new FormData();
        formData.append('id', genre.id.toString());
        formData.append('name', genre.name);
        formData.append('description', genre.description);
        return this.http.put(this.url, formData, { headers: headers });
    }
    addGenre(genre) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let formData = new FormData();
        formData.append('id', genre.id.toString());
        formData.append('name', genre.name);
        formData.append('description', genre.description);
        return this.http.post(this.url, formData, { headers: headers });
    }
};
GenresService = __decorate([
    Injectable()
], GenresService);
export { GenresService };
//# sourceMappingURL=genres.service.js.map