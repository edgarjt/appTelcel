import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RequestLoginInterface, ResponseLoginInterface, ResponseLogoutInterface } from "../../interfaces/auth.interface";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string;
  // baseUrl: string;

  constructor(private http: HttpClient,
              private router: Router) {
    this.url = environment.apiUrl + 'users';
  }

  login(request: RequestLoginInterface): Observable<ResponseLoginInterface> {
    return this.http.post<any>(`${this.url}/login`, request);
  }

  logout(request: RequestLoginInterface): Observable<ResponseLogoutInterface> {
    return this.http.post<any>(`${this.url}/logout`, request);
  }

  saveCredential(credential: ResponseLoginInterface): void {
    sessionStorage.setItem('user', JSON.stringify(credential));
  }

  getCredential(): ResponseLoginInterface {
    return JSON.parse(sessionStorage.getItem('user') || '{}');
  }

  clearSession(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
