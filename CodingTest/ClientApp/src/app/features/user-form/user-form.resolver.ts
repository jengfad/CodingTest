import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable, of } from "rxjs";
import { UserService } from "src/app/core/services";
import { UserModel } from "src/app/shared/models";

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