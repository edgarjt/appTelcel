import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { ResponseRegionInterface } from "../../interfaces/region.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegionesService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'regiones/';
  }

  getRegiones(): Observable<ResponseRegionInterface[]> {
    return this.http.get<any>(`${this.url}all`);
  }
}
