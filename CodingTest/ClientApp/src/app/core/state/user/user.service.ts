
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { PagedUsersModel, UserModel } from "src/app/shared/models";
import { PagedUsersParams, UserQuery } from ".";
import { UserApiService } from "../../services";
import { PagedUsersEntityService } from "./user.entity.service";
import { UserStore } from "./user.store";
import { UserApiMockService } from "../../mock/user-api-mock.service";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
        // private api: UserApiService,
        private api: UserApiMockService,
        private store: UserStore,
        private pagedUsersEntity: PagedUsersEntityService
    ) {}

    getPagedUsers(params: PagedUsersParams): Observable<PagedUsersModel> {
        return this.pagedUsersEntity.get(params).pipe(
            tap((result) => this.updatedPagedUsers(result))
        );
    }

    updatedPagedUsers(users: PagedUsersModel): void {
        this.store.update({pagedUsers: users});
    }

    updateFilters(filters: PagedUsersParams): void {
        this.store.update({filters: filters});
    }

    deleteUser(userId: number): Observable<void> {
        return this.api.deleteUser(userId).pipe(
            tap(() => {
                this.resetPagedUsersStore();
                this.resetPagedUserFilters();
            })
        );
    }

    updateUser(user: UserModel): Observable<void> {
        return this.api.updateUser(user).pipe(
            tap(() => {
                this.resetPagedUsers();
            })
        );
    }

    addUser(user: UserModel): Observable<void> {
        return this.api.addUser(user).pipe(
            tap(() => {
                this.resetPagedUsers();
            })
        );
    }

    resetPagedUsers(): void {
        this.resetPagedUsersStore();
        this.resetPagedUserFilters();
    }

    resetPagedUserFilters(): void {
        const initialFilters = this.store.resetDefaults().filters;
        this.updateFilters(initialFilters);
    }

    resetPagedUsersStore() {
        this.pagedUsersEntity.reset();
    }
}