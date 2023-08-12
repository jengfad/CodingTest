import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { PagedUsersModel } from "src/app/shared/models/paged-users.model";
import { UserModel } from "src/app/shared/models/user.model";
import { PagedUsersParams } from "../state/user";
import * as jsonData from './MOCK_DATA.json';
import { AppConstants } from "src/app/shared/app-constants";

@Injectable({
    providedIn: 'root'
})
export class UserApiMockService {
    allUsers: UserModel[] = [];
    readonly SORT_DIRECTION = AppConstants.SORT_DIRECTION;

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
        this.allUsers = this.allUsers.filter(u => u.id !== user.id);
        this.allUsers.push(user);
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

        const sortField = this.getSortField(params.sortBy);
        const clonedUsers = JSON.parse(JSON.stringify(this.allUsers));
        let filteredUsers = clonedUsers
            .filter(user => this.customFilter(user, params.searchText))
            .sort((a, b) => this.customSort(a[sortField], b[sortField], sortDirection));

        let pagedUsers = this.paginate(filteredUsers, params);

        return of({
            users: pagedUsers,
            totalItems: filteredUsers.length
        } as PagedUsersModel)
    }

    private paginate(users: UserModel[], params: PagedUsersParams): UserModel[] {
        const start = ((params.pageNumber - 1) * params.pageSize);
        const end = start + params.pageSize;
        return users.slice(start, end);
    } 

    private customFilter(user: UserModel, searchText: string): boolean {
        if (!searchText) return true
        return user.email.toLocaleLowerCase().includes(searchText) 
            || user.firstName.toLocaleLowerCase().includes(searchText)
            || user.lastName.toLocaleLowerCase().includes(searchText)
            || user.gender.toLocaleLowerCase().includes(searchText)
    }

    private getSortField(sortBy: string): string {
        if (sortBy.toLowerCase() === 'firstname') {
            return 'firstName';
        } else if (sortBy.toLowerCase() === 'lastname') {
            return 'lastName';
        }

        return sortBy.toLowerCase();
    }

    private customSort(x: string, y: string, sortDirection: string): number {
        if (!x || !y) return 1;

        const a = x.toLowerCase();
        const b = y.toLowerCase();
        try {
            if (sortDirection === this.SORT_DIRECTION.ASC) {
                return a < b ? -1 : 1
            } else {
                return a > b ? -1 : 1
            }
        } catch(error) {
            console.log(error)
        }

        return -1;
    }
}