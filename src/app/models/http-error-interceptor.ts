import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { retry, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { EventAggrigatorService } from '../service/event-aggrigator.service';
import { NotificationService } from '../service/notification.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private eventAggSrvc: EventAggrigatorService, private notifySrvc: NotificationService) {}
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.eventAggSrvc.setSpinnerFlag(true);
    return next.handle(req).pipe(
      tap((response: HttpResponse<any>) => {
        if (response.ok) {
          this.eventAggSrvc.setSpinnerFlag(false);
        }
      }),
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.notifySrvc.openSnackBar();
        return throwError(errorMessage);
      }),
    );
  }
}
