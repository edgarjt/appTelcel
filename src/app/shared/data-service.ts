import { Injectable } from '@angular/core';
import { ResponseLoginInterface } from "../interfaces/auth.interface";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _credentialUser: ResponseLoginInterface | any;

  constructor() {
    this._credentialUser = null;
  }

  get credentialUser(): ResponseLoginInterface {
    return this._credentialUser;
  }

  set credentialUser(value: ResponseLoginInterface) {
    this._credentialUser = value;
  }
}
