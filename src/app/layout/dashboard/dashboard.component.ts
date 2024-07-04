import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { MaterialModule } from "../../shared/material.module";
import { AuthService } from "../../core/services/auth.service";
import { DataService } from "../../shared/data-service";
import { ModalsService } from "../../core/services/modals.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, RouterLink, RouterOutlet, RouterLinkActive]
})
export class DashboardComponent implements OnInit{
  @ViewChild('drawer') drawer: any;
  private breakpointObserver = inject(BreakpointObserver);
  expanded = false;

  constructor(private router: Router,
              private title: Title,
              private authService: AuthService,
              private dataService: DataService,
              private dialogModals: ModalsService) {
  }

  ngOnInit() {}

  logout(): void {
    this.dialogModals.openModal('¿Desea cerrar sesión?', 'confirm').subscribe({
      next: (value) => {
        if (value) {
          const userId = this.authService.getCredential()?.id;

          this.authService.logout(userId).subscribe({
            next: () => {
              this.authService.clearSession();
            }
          })
          this.router.navigate(['/login']);
        }
      }
    })
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  openOption(): void {
    this.drawer.toggle();
    const isCheckin = sessionStorage.getItem('isCheckin');
    console.log(isCheckin);

    if (isCheckin === '0' || isCheckin === null) {
      this.dialogModals.openModal('Para continuar debe realizar check-in', 'warning');
      return;
    }

    if (isCheckin === '2') {
      this.dialogModals.openModal('No se puede realizar más solicitudes debido a que terminó su jornada laboral.', 'warning');
      return;
    }

    this.router.navigate(['incentives']);
  }

}
