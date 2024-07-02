import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router,
              @Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(): boolean {
    const usuarioLogueado = sessionStorage.getItem('user');

    // Si el usuario no está autenticado
    if (!usuarioLogueado) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
