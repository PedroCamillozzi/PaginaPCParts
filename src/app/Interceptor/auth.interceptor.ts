import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _errorService:ErrorService){}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse)=>{
            if(error.status ===401){
            this._errorService.msjError(error)
            }

            return throwError(() => new Error())
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
