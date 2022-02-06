import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IGenreListWithFilters } from '../interfaces/genres/IGenreListWithFilters';
import { IGenreFilters } from '../interfaces/genres/IGenreFilters';
import { IGenreList } from '../interfaces/genres/IGenreList';
import { IGenre } from '../interfaces/genres/IGenre';
import { environment } from 'src/environments/environment';

@Injectable()

export class GenresService {

  private url = `${environment.apiUrl}/api/Genre`;

  constructor(private http: HttpClient) { }

  async getGenre(id: number) {
    return this.http.get<IGenre>(`${this.url}/${id}`).toPromise();
  }

  getGenres(): Observable<IGenreList[]> {
    return this.http.get<IGenreList[]>(this.url + "/all");
  }

  getGenresByName(genre: IGenreFilters): Observable<IGenreListWithFilters> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append('name', genre.name);
    params = params.append('page', genre.page.toString());
    params = params.append('pageSize', genre.pageSize.toString() ? genre.pageSize.toString() : '');
    params = params.append('orderBy', genre.orderBy);

    return this.http.get<IGenreListWithFilters>(this.url, { headers: headers, params: params});
  }

  deleteGenre(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  editGenre(genre: IGenre): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let formData: FormData = new FormData();
    formData.append('id', genre.id.toString());
    formData.append('name', genre.name);
    formData.append('description', genre.description);

    return this.http.put(this.url, formData, { headers: headers });
  }

  addGenre(genre: IGenre): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let formData: FormData = new FormData();
    formData.append('id', genre.id.toString());
    formData.append('name', genre.name);
    formData.append('description', genre.description);

    return this.http.post(this.url, formData, { headers: headers });
  }
}
