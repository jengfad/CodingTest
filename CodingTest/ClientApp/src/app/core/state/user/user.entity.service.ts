import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { PagedUsersModel } from "src/app/shared/models";
import { BaseEntityService } from "src/app/shared/state";
import { PagedUsersParams, PagedUsersView, UserQuery, UserStore } from ".";
import { UserApiService } from "../../services";
import { UserApiMockService } from "../../mock/user-api-mock.service";

@Injectable({ providedIn: 'root' })
export class PagedUsersEntityService extends BaseEntityService<PagedUsersParams, PagedUsersView, PagedUsersModel> {
    constructor(
        protected store: UserStore,
        protected stateQuery: UserQuery,
        // private api: UserApiService,
        private api: UserApiMockService) {
          super(stateQuery.pagedUsersQuery, store.pagedUsers);
    }

    protected getFromApi(params: PagedUsersParams): Observable<PagedUsersModel> {
        return this.api.getUsers(params).pipe(
            tap(result => {
              const key = JSON.stringify(params);
              this.store.pagedUsers.upsert(key, { entityKey: key, pagedUsers: result } as PagedUsersView);
            })
        );
    }

    protected getFromStore(params: PagedUsersParams): Observable<PagedUsersModel> {
        return this.selectFromStore(params).pipe(
          map(x => x.pagedUsers)
        );
    }
}