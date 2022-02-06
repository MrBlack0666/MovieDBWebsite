import { IMovieInSelectDTO } from './../interfaces/movies/IMovieInSelectDTO';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IMovieListWithFilters } from '../interfaces/movies/IMovieListWithFilters';
import { Observable } from 'rxjs';
import { IMovieFilters } from '../interfaces/movies/IMovieFilters';
import { IGetMovieDTO } from '../interfaces/movies/IGetMovieDTO';
import { IMovieDTO } from '../interfaces/movies/IMovieDTO';
import { environment } from 'src/environments/environment';
import { IMovieInList } from '../interfaces/movies/IMovieInList';

@Injectable()
export class MoviesService {
  private url = `${environment.apiUrl}/api/Movie`;

  constructor(private http: HttpClient) { }

  getMovies(movieFilters: IMovieFilters): Observable<IMovieListWithFilters> {
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

    return this.http.get<IMovieListWithFilters>(this.url, { headers: headers, params: params });
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  editMovie(movie: IMovieDTO): Observable<any> {
    let headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');

    let formData: FormData = new FormData();
    formData.append('id', movie.id ? movie.id.toString() : '');
    formData.append('title', movie.title);
    formData.append('description', movie.description);
    formData.append('releaseYear', movie.releaseYear ? movie.releaseYear.toString() : '');
    formData.append('movieLengthInMinutes', movie.movieLengthInMinutes ? movie.movieLengthInMinutes.toString() : '');
    formData.append('file', movie.file);
    formData.append('updatePhoto', JSON.stringify(movie.updatePhoto));

    movie.crew.forEach( (person, index) => {
      formData.append('crew[' + index + "].personnelId", person.personnelId ? person.personnelId.toString() : '');
      formData.append('crew[' + index + "].filmCrew", person.filmCrew.toString());
    })
    
    movie.genres.forEach( (genre, index) => {
      formData.append('genres[' + index + "]", genre ? genre.toString() : '');
    })

    return this.http.put(this.url, formData, {headers: headers});
  }

  addMovie(movie: IMovieDTO): Observable<any> {
    let headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');

    let formData: FormData = new FormData();
    formData.append('id', movie.id.toString());
    formData.append('title', movie.title);
    formData.append('description', movie.description);
    formData.append('releaseYear', movie.releaseYear ? movie.releaseYear.toString() : '');
    formData.append('movieLengthInMinutes', movie.movieLengthInMinutes ? movie.movieLengthInMinutes.toString() : '');
    formData.append('file', movie.file);
    formData.append('updatePhoto', JSON.stringify(movie.updatePhoto));

    movie.crew.forEach( (person, index) => {
      formData.append('crew[' + index + "].personnelId", person.personnelId ? person.personnelId.toString() : '');
      formData.append('crew[' + index + "].filmCrew", person.filmCrew.toString());
    })
    
    movie.genres.forEach( (genre, index) => {
      formData.append('genres[' + index + "]", genre ? genre.toString() : '');
    })

    return this.http.post(this.url, formData, {headers: headers});
  }

  async getMovie(id: number) {
    return await this.http.get<IGetMovieDTO>(`${this.url}/${id}`).toPromise();
  }

  async getMoviesToSelect(startsWith: string) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append('startsWith', startsWith ? startsWith : '');

    return this.http.get<IMovieInSelectDTO[]>(`${this.url}/select`, { headers: headers, params: params }).toPromise();
  }

  getRecommendations(userAccountId: number, page: number, pageSize: number) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append('userAccountId', userAccountId.toString());
    params = params.append('page', page.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<IMovieInList[]>(`${this.url}/recommendations`, { headers: headers, params: params })
  }
}