import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import {catchError, finalize, throwError} from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);
  console.log('Interceptando');
  spinner.show();

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 500 || err.error?.message === 'Failed to fetch') {
        alert('Por el momento el servicio no se encuentra disponible.');
      } else if (err.status === 401) {
        alert('Credenciales invalidas')
      }
      return throwError(() => err);
    }),
    finalize(() => spinner.hide())
  );
};
