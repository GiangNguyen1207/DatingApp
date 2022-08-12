import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toast: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error) {
          switch (error.status) {
            case 401:
              this.toast.error(error.error, error.status);
              break;

            case 404:
              this.router.navigateByUrl('/not-found');
              break;

            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: error.error },
              };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;

            case 400:
              const errorArray = error.error.errors;
              const modalStateErrors = [];
              if (errorArray) {
                for (const key in errorArray) {
                  if (errorArray[key]) modalStateErrors.push(errorArray[key]);
                }
                for (const element of modalStateErrors) {
                  this.toast.error(element);
                }
                throw modalStateErrors;
              } else {
                console.log('here');
                this.toast.error(error.error, error.status);
              }
              break;

            default:
              this.toast.error('Something went wrong.');
              console.log(error);
              break;
          }
        }
        return throwError(() => new Error(error));
      })
    );
  }
}
