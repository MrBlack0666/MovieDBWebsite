import { IUserReviewListWithFilters } from './../interfaces/reviews/IUserReviewListWithFilters';
import { IAllReviewFilters } from './../interfaces/reviews/IAllReviewFilters';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IInsertUpdateReview } from '../interfaces/reviews/IInsertUpdateReview';
import { Observable } from 'rxjs';
import { IReviewFilters } from '../interfaces/reviews/IReviewFilters';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private url = `${environment.apiUrl}/api/Review`;
  
  constructor(private http: HttpClient) { }

  insertReview(review: IInsertUpdateReview): Observable<boolean> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<boolean>(this.url, review, {headers: headers});
  }

  deleteReview(userId: number, movieId: number) {
    return this.http.delete(`${this.url}/${userId}/${movieId}`);
  }

  didUserReviewMovie(movieId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/movie/${movieId}`)
  }

  getAllReviews(filters: IAllReviewFilters) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append('movieId', filters.movieId == null ? '' : filters.movieId.toString());
    params = params.append('userId', filters.userId == null ? '' : filters.userId.toString());
    params = params.append('page', filters.page.toString());
    params = params.append('pageSize', filters.pageSize == null ? '' : filters.pageSize.toString());
    params = params.append('orderBy', filters.orderBy);


    return this.http.get<IUserReviewListWithFilters>(`${this.url}/all`, { headers: headers, params: params });
  }

  async getMovieReviews(filters: IReviewFilters) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append('id', filters.id == null ? '' : filters.id.toString());
    params = params.append('page', filters.page.toString());
    params = params.append('pageSize', filters.pageSize == null ? '' : filters.pageSize.toString());
    params = params.append('orderBy', filters.orderBy);


    return this.http.get<IUserReviewListWithFilters>(`${this.url}/movie`, { headers: headers, params: params }).toPromise();
  }
}
