import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let MoviesService = class MoviesService {
    constructor(http) {
        this.http = http;
        this.url = `${environment.apiUrl}/api/Movie`;
    }
    getMovies(movieFilters) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let params = new HttpParams();
        params = params.append('title', movieFilters.title);
        params = params.append('releaseYearFrom', movieFilters.releaseYearFrom ? movieFilters.releaseYearFrom.toString() : '');
        params = params.append('releaseYearTo', movieFilters.releaseYearTo ? movieFilters.releaseYearTo.toString() : '');
        params = params.append('movieLengthFrom', movieFilters.movieLengthFrom ? movieFilters.movieLengthFrom.toString() : '');
        params = params.append('movieLengthTo', movieFilters.movieLengthTo ? movieFilters.movieLengthTo.toString() : '');
        params = params.append('avgRatingFrom', movieFilters.avgRatingFrom ? movieFilters.avgRatingFrom.toString() : '');
        params = params.append('avgRatingTo', movieFilters.avgRatingTo ? movieFilters.avgRatingTo.toString() : '');
        params = params.append('page', movieFilters.page.toString());
        params = params.append('pageSize', movieFilters.pageSize ? movieFilters.pageSize.toString() : '');
        params = params.append('orderBy', movieFilters.orderBy);
        params = params.append('genreId', movieFilters.genreId ? movieFilters.genreId.toString() : '');
        return this.http.get(this.url, { headers: headers, params: params });
    }
    deleteMovie(id) {
        return this.http.delete(`${this.url}/${id}`);
    }
    editMovie(movie) {
        let headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');
        let formData = new FormData();
        formData.append('id', movie.id ? movie.id.toString() : '');
        formData.append('title', movie.title);
        formData.append('description', movie.description);
        formData.append('releaseYear', movie.releaseYear ? movie.releaseYear.toString() : '');
        formData.append('movieLengthInMinutes', movie.movieLengthInMinutes ? movie.movieLengthInMinutes.toString() : '');
        formData.append('file', movie.file);
        formData.append('updatePhoto', JSON.stringify(movie.updatePhoto));
        movie.crew.forEach((person, index) => {
            formData.append('crew[' + index + "].personnelId", person.personnelId ? person.personnelId.toString() : '');
            formData.append('crew[' + index + "].filmCrew", person.filmCrew.toString());
        });
        movie.genres.forEach((genre, index) => {
            formData.append('genres[' + index + "]", genre ? genre.toString() : '');
        });
        return this.http.put(this.url, formData, { headers: headers });
    }
    addMovie(movie) {
        let headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');
        let formData = new FormData();
        formData.append('id', movie.id.toString());
        formData.append('title', movie.title);
        formData.append('description', movie.description);
        formData.append('releaseYear', movie.releaseYear ? movie.releaseYear.toString() : '');
        formData.append('movieLengthInMinutes', movie.movieLengthInMinutes ? movie.movieLengthInMinutes.toString() : '');
        formData.append('file', movie.file);
        formData.append('updatePhoto', JSON.stringify(movie.updatePhoto));
        movie.crew.forEach((person, index) => {
            formData.append('crew[' + index + "].personnelId", person.personnelId ? person.personnelId.toString() : '');
            formData.append('crew[' + index + "].filmCrew", person.filmCrew.toString());
        });
        movie.genres.forEach((genre, index) => {
            formData.append('genres[' + index + "]", genre ? genre.toString() : '');
        });
        return this.http.post(this.url, formData, { headers: headers });
    }
    getMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.http.get(`${this.url}/${id}`).toPromise();
        });
    }
    getMoviesToSelect(startsWith) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');
            let params = new HttpParams();
            params = params.append('startsWith', startsWith ? startsWith : '');
            return this.http.get(`${this.url}/select`, { headers: headers, params: params }).toPromise();
        });
    }
    getRecommendations(userAccountId, page, pageSize) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let params = new HttpParams();
        params = params.append('userAccountId', userAccountId.toString());
        params = params.append('page', page.toString());
        params = params.append('pageSize', pageSize.toString());
        return this.http.get(`${this.url}/recommendations`, { headers: headers, params: params });
    }
};
MoviesService = __decorate([
    Injectable()
], MoviesService);
export { MoviesService };
//# sourceMappingURL=movies.service.js.map