import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "src/app/models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl: string;
	constructor(
		private http: HttpClient,
        @Inject('BASE_URL') baseUrl: string
	) {
        this.baseUrl = `${baseUrl}api/user`
	}

    getUser(id: number): Observable<UserModel> {
        return this.http.get<UserModel>(`${this.baseUrl}/${id}`);
    }

    getUsers(pageNumber: number, pageSize: number, searchText: string): Observable<UserModel[]> {
        let args = { pageNumber: pageNumber, pageSize: pageSize };
        if (searchText) {
           args['searchText'] = searchText;
        }
        return this.http.get<UserModel[]>(`${this.baseUrl}`, { params: args });
    }

    getAllUsers(): Observable<UserModel[]> {
        return this.http.get<UserModel[]>(`${this.baseUrl}`);
    }

    addUser(user: UserModel): Observable<void> {
		return this.http.post<void>(`${this.baseUrl}`, user);
    }

    updateUser(user: UserModel): Observable<void> {
		return this.http.put<void>(`${this.baseUrl}`, user);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}