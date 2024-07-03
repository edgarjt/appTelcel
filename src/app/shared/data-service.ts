import { Injectable } from '@angular/core';
import { ResponseLoginInterface } from "../interfaces/auth.interface";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _credentialUser: ResponseLoginInterface;
  private _region: string;

  constructor() {}

  get credentialUser(): ResponseLoginInterface {
    return this._credentialUser;
  }

  set credentialUser(value: ResponseLoginInterface) {
    this._credentialUser = value;
  }

  get region(): string {
    return this._region;
  }

  set region(value: string) {
    this._region = value;
  }
}
