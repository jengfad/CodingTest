import { UserModel } from "./user.model";

export interface PagedUsersModel {
    users: UserModel[];
    totalItems: number;
}