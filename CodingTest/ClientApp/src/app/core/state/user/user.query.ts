import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { BaseQuery } from "src/app/shared/state";
import { PagedUsersParams, PagedUsersView, UserMainState, UserStore } from ".";

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserMainState> {
    pagedUsersQuery = new PagedUsersQuery(this.userStore);

    pagedUsers$ = this.select(state => state.pagedUsers);
    filters$ = this.select(state => state.filters);

    get filters() { return this.store.getValue().filters; }

    constructor(protected userStore: UserStore) {
        super(userStore);
    }
}

class PagedUsersQuery extends BaseQuery<PagedUsersView, PagedUsersParams> {
    constructor(protected mainStore: UserStore) {
        super(mainStore.pagedUsers);
    }
}