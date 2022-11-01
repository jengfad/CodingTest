import { PagedUsersModel, UserSearchModel } from "src/app/shared/models";
import { BaseView } from "src/app/shared/state";

export interface PagedUsersView extends BaseView {
    pagedUsers: PagedUsersModel;
}

export interface PagedUsersParams extends UserSearchModel {}