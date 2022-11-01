
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { PagedUsersModel } from "src/app/shared/models";
import { PagedUsersParams, UserQuery } from ".";
import { PagedUsersEntityService } from "./user.entity.service";
import { UserStore } from "./user.store";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
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

    resetSelections() {
        this.store.update(this.store.resetDefaults());
    }
}