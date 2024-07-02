import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { MaterialModule } from "../../shared/material.module";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, RouterLink, RouterOutlet, RouterLinkActive]
})
export class DashboardComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);

  constructor(private router: Router,
              private title: Title,
              private authService: AuthService) {
  }

  ngOnInit() {}

  logout(): void {
    this.authService.clearSession();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
