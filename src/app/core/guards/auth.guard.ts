import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const usuarioLogueado = sessionStorage.getItem('user');

    // Si el usuario no está autenticado, redirigir al login
    if (!usuarioLogueado) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
