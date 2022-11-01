import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PagedUsersModel } from "src/app/shared/models/paged-users.model";
import { UserModel } from "src/app/shared/models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl: string;
	constructor(
		private http: HttpClient,
        @Inject('BASE_URL') baseUrl: string
	) {
        this.baseUrl = `${baseUrl}api/users`
	}

    getUser(id: number): Observable<UserModel> {
        return this.http.get<UserModel>(`${this.baseUrl}/${id}`);
    }

    getUserByEmail(email: string): Observable<UserModel> {
        const url = `${this.baseUrl}/email/${email}`
        return this.http.get<UserModel>(url);
    }

    getUsers(pageNumber: number, pageSize: number, searchText: string, orderBy: string, sortDirection: string, ): Observable<PagedUsersModel> {
        let args = { pageNumber: pageNumber, pageSize: pageSize };
        if (searchText) {
           args['searchText'] = searchText;
        }

        if (orderBy) {
            args['orderBy'] = orderBy;
        }

        if (sortDirection) {
            args['sortDirection'] = sortDirection;
        }

        return this.http.get<PagedUsersModel>(`${this.baseUrl}`, { params: args });
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