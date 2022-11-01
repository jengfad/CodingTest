import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { DialogService } from "../services";

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService implements HttpInterceptor {
  
    constructor(
        private router: Router,
        private dialogService: DialogService
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                const msg = this.getErrorMessage(error);
                this.dialogService.openServiceErrorDialog(msg);
                return throwError(() => new Error(msg));
            })
        )
    }

    private getErrorMessage(error: HttpErrorResponse): string {
        const message = error["error"]["message"];
        if (error.status === HttpStatusCode.NotFound)
            return message;
        else
            return "An unexpected error occured. Please contact your system administrator."
    }
}