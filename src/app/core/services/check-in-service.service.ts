import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { RequestCheckInInterface, ResponseCheckInInterface } from "../../interfaces/chek-in.interface";

@Injectable({
  providedIn: 'root'
})
export class CheckInServiceService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'entradasalidas/';
  }

  getCheckInOut(userId: string, date: string): Observable<ResponseCheckInInterface[]> {
    return this.http.get<any>(`${this.url}buscar/usuario/${userId}/${date}`);
  }

  checkIn(request: RequestCheckInInterface): Observable<ResponseCheckInInterface> {
    return this.http.post<any>(`${this.url}registrar`, request);
  }
}
