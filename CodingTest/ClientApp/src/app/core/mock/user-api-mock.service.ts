import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { PagedUsersModel } from "src/app/shared/models/paged-users.model";
import { UserModel } from "src/app/shared/models/user.model";
import { PagedUsersParams } from "../state/user";
import * as jsonData from './MOCK_DATA.json';

@Injectable({
    providedIn: 'root'
})
export class UserApiMockService {
    allUsers: UserModel[] = [];

	constructor() {
        this.seedUserData();
    }

    seedUserData() {
        this.allUsers = JSON.parse(JSON.stringify(jsonData))['default'];
    }

    getUser(id: number): Observable<UserModel> {
        const user = this.allUsers.find(u => u.id === id);
        return of(user);
    }

    addUser(user: UserModel): Observable<void> {
        this.allUsers.push(user);
        return of(null);
    }

    updateUser(user: UserModel): Observable<void> {
        let existingUser = this.allUsers.find(u => u.id === user.id);
        existingUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            status: user.status,
            gender: user.gender
        } as UserModel;
        return of(null)
    }

    deleteUser(id: number): Observable<void> {
        this.allUsers = this.allUsers.filter(u => u.id !== id);
        return of(null);
    }

    getUserByEmail(email: string): Observable<UserModel> {
        const user = this.allUsers.find(u => u.email.toLocaleLowerCase() === email.toLocaleLowerCase());
        return of(user);
    }

    getUsers(params: PagedUsersParams): Observable<PagedUsersModel> {
        const { pageNumber: pageNumber, 
            pageSize: pageSize, 
            searchText: searchText, 
            sortBy: sortBy,
            sortDirection: sortDirection } = params;

        let args = { pageNumber: pageNumber, pageSize: pageSize };
        if (searchText) {
           args['searchText'] = searchText;
        }

        if (sortBy) {
            args['sortBy'] = sortBy;
        }

        if (sortDirection) {
            args['sortDirection'] = sortDirection;
        }

        return of({
            users: this.allUsers,
            totalItems: this.allUsers.length
        } as PagedUsersModel)
    }
}