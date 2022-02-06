import { IUserInSelectDTO } from './../interfaces/user/IUserInSelectDTO';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IUserRole } from '../interfaces/user/IUserRole';
import { IUserNameRole } from '../interfaces/user/IUserNameRole';
import { IUserRoleFilters } from '../interfaces/user/IUserRoleFilters';
import { IUserRoleListWithFilters } from '../interfaces/user/IUserRoleListWithFilters';
import { startWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable()
export class UserService {

    url = `${environment.apiUrl}/api/Role`;

    constructor(private http: HttpClient) { }

    getUserRole(role: IUserRoleFilters): Observable<IUserRoleListWithFilters> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        let params = new HttpParams();
        params = params.append('username', role.username);
        params = params.append('page', role.page.toString());
        params = params.append('pageSize', role.pageSize.toString() ? role.pageSize.toString() : '');
        params = params.append('orderBy', role.orderBy);

        return this.http.get<IUserRoleListWithFilters>(this.url, { headers: headers, params: params });
    }

    deleteUser(id: number) {
        return this.http.delete(`${this.url}/${id}`);
    }

    getUserName(id: number): Observable<IUserNameRole> {
        return this.http.get<IUserNameRole>(`${this.url}/${id}`);
    }

    changeUserRole(userNameRole : IUserRole): Observable<any>{
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
    
        let formData: FormData = new FormData();
        formData.append('id', userNameRole.id.toString());
        formData.append('username', userNameRole.username);
        formData.append('role', userNameRole.role);
    
        return this.http.post(this.url, formData, { headers: headers });
    }

    async getUsersToSelect(startsWith: string) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        let params = new HttpParams();
        params = params.append('startsWith', startsWith ? startsWith : '');

        return this.http.get<IUserInSelectDTO[]>(`${this.url}/select`, { headers: headers, params: params }).toPromise();
    }
}

