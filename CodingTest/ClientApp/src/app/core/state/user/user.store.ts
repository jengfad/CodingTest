import { Injectable } from "@angular/core";
import { EntityState, EntityStore, Store, StoreConfig } from "@datorama/akita";
import { AppConstants } from "src/app/shared/app-constants";
import { PagedUsersModel } from "src/app/shared/models";
import { PagedUsersParams, PagedUsersView } from "./user.model";

export interface PagedUsersState extends EntityState<PagedUsersView> { }

export interface UserMainState {
    pagedUsers: PagedUsersModel;
    filters: PagedUsersParams;
}

function createInitialState(): UserMainState {
    return {
        pagedUsers: null,
        filters: {
          searchText: null,
          pageNumber: 1,
          pageSize: AppConstants.PAGE_SIZE,
          sortBy: AppConstants.SORT_BY_TYPES.EMAIL,
          sortDirection: AppConstants.SORT_DIRECTION.ASC
        } as PagedUsersParams
    } as UserMainState
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserMainState> {
  constructor() {
    super(createInitialState());
  }
  pagedUsers = new EntityStore<PagedUsersState, PagedUsersView>({}, { name: 'paged-users' }); 
  
  resetDefaults(): UserMainState {
    return createInitialState();
  }
}