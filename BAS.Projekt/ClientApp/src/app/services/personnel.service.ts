import { IPersonnelFilters } from './../interfaces/personnel/IPersonnelFilters';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IGenreList } from '../interfaces/genres/IGenreList';
import { IPersonnelInSelectDTO } from '../interfaces/personnel/IPersonnelInSelectDTO';
import { IPersonnelListWithFilters } from '../interfaces/personnel/IPersonnelListWithFilters';
import { IPersonnel } from '../interfaces/personnel/IPersonnel';
import { environment } from 'src/environments/environment';

@Injectable()
export class PersonnelService {
  private url = `${environment.apiUrl}/api/Personnel`;

  constructor(private http: HttpClient) { }

  async getPersonnelToSelectList(numberOfItems: number, fullName: string, skipPersonnelList: number[]) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    
    let params = new HttpParams();
    params = params.append('numberOfItems', numberOfItems.toString());
    params = params.append('fullName', fullName);

    skipPersonnelList.forEach((id, index) => {
      params = params.append(`skipPersonnelList[${index}]`, id.toString());
    })

    return await this.http.get<IPersonnelInSelectDTO[]>(`${this.url}/select`, {headers: headers, params: params}).toPromise();
  }

  async getPersonnel(filters: IPersonnelFilters) {
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

    return await this.http.get<IPersonnelListWithFilters>(this.url, { headers: headers, params: params }).toPromise();
  }

  editPersonnel(person: IPersonnel): Observable<any> {
    let headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');
    console.log(person.dateOfBirth)
    let formData: FormData = new FormData();
    formData.append('id', person.id.toString());
    formData.append('name', person.name);
    formData.append('surname', person.surname);
    formData.append('nationality', person.nationality);
    formData.append('dateOfBirth', person.dateOfBirth.toDateString());

    return this.http.put(this.url, formData, {headers: headers});
  }

  addPersonnel(person: IPersonnel): Observable<any> {
    let headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');

    let formData: FormData = new FormData();
    formData.append('id', person.id.toString());
    formData.append('name', person.name);
    formData.append('surname', person.surname);
    formData.append('nationality', person.nationality);
    formData.append('dateOfBirth', person.dateOfBirth.toDateString());

    return this.http.post(this.url, formData, {headers: headers});
  }

  deletePersonnel(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  async getPerson(id: number) {
    return await this.http.get<IPersonnel>(`${this.url}/${id}`).toPromise();
  }
}
