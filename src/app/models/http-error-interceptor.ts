import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { retry, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { EventAggrigatorService } from '../service/event-aggrigator.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private eventAggSrvc: EventAggrigatorService
    ) { }
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.eventAggSrvc.setSpinnerFlag(true);
        return next.handle(req).pipe(
            tap(() => {
                this.eventAggSrvc.setSpinnerFlag(false);
            }),
            retry(1),
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                }
                return throwError(errorMessage);
            })
        );
    }
}
