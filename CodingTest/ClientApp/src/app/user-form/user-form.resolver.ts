import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { UserService } from "../core/services/user.service";
import { UserModel } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserFormResolver implements Resolve<UserModel> {
    constructor(
        private userService: UserService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<null> | Observable<UserModel> {
        const userId = +route.params['userId'];
        if (!userId) return of(null);

        return this.userService.getUser(userId);
    }
}