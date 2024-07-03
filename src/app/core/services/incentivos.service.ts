import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseIncentivoInterface } from "../../interfaces/incentivo.interface";

@Injectable({
  providedIn: 'root'
})
export class IncentivosService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'incentivos/';
  }

  getIncentivos(idRegion: string): Observable<ResponseIncentivoInterface[]> {
    return this.http.get<any>(`${this.url}allbyregion/${idRegion}`);
  }
}
