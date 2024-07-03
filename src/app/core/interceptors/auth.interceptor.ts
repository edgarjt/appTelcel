import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { catchError, finalize, throwError } from "rxjs";
import { ModalsService } from "../services/modals.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);
  const modalsService = inject(ModalsService);

  spinner.show();

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 500 || err.error?.message === 'Failed to fetch') {
        modalsService.openModal('Por el momento el servicio no se encuentra disponible.', 'error');
      } else if (err.status === 401) {
        modalsService.openModal('La contraseña o el usuario son incorrecto', 'warning');
      }
      return throwError(() => err);
    }),
    finalize(() => spinner.hide())
  );
};
