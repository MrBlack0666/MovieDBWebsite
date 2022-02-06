import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpParams } from '@angular/common/http';
let ReviewService = class ReviewService {
    constructor(http) {
        this.http = http;
        this.url = `${environment.apiUrl}/api/Review`;
    }
    insertReview(review) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.url, review, { headers: headers });
    }
    deleteReview(userId, movieId) {
        return this.http.delete(`${this.url}/${userId}/${movieId}`);
    }
    didUserReviewMovie(movieId) {
        return this.http.get(`${this.url}/movie/${movieId}`);
    }
    getAllReviews(filters) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let params = new HttpParams();
        params = params.append('movieId', filters.movieId == null ? '' : filters.movieId.toString());
        params = params.append('userId', filters.userId == null ? '' : filters.userId.toString());
        params = params.append('page', filters.page.toString());
        params = params.append('pageSize', filters.pageSize == null ? '' : filters.pageSize.toString());
        params = params.append('orderBy', filters.orderBy);
        return this.http.get(`${this.url}/all`, { headers: headers, params: params });
    }
    getMovieReviews(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');
            let params = new HttpParams();
            params = params.append('id', filters.id == null ? '' : filters.id.toString());
            params = params.append('page', filters.page.toString());
            params = params.append('pageSize', filters.pageSize == null ? '' : filters.pageSize.toString());
            params = params.append('orderBy', filters.orderBy);
            return this.http.get(`${this.url}/movie`, { headers: headers, params: params }).toPromise();
        });
    }
};
ReviewService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ReviewService);
export { ReviewService };
//# sourceMappingURL=review.service.js.map