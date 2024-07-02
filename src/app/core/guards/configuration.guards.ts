import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataService } from "../../shared/data-service";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationGuards implements CanActivate {

  constructor(private router: Router,
              private dataService: DataService) {}

  canActivate(): boolean {
    const existCredential = this.dataService.credentialUser;

    if (existCredential) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
