import { PagedUsersModel } from "src/app/shared/models";

export interface UserMainState {
    pagedUsers: PagedUsersModel;
    searchText: string;
    sortBy: string;
    sortDirection: string;
}