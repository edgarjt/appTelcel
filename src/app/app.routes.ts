import { Routes } from '@angular/router';
import { LoginComponent } from "./pages/auth/login/login.component";
import { ConfiguracionComponent } from "./pages/auth/configuracion/configuracion.component";
import { DashboardComponent } from "./layout/dashboard/dashboard.component";
import { LoginGuard } from "./core/guards/login.guards";
import { AuthGuard } from "./core/guards/auth.guard";
import { ConfigurationGuards } from "./core/guards/configuration.guards";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
  { path: 'configuration', canActivate: [ConfigurationGuards], component: ConfiguracionComponent },
  { path: '', canActivate: [AuthGuard], component: DashboardComponent, children:
      [
        { path: 'home', loadChildren: () => import('./pages/home/home-routing.module').then(m => m.HomeRoutingModule) },
        { path: 'checkin', loadChildren: () => import('./pages/check-in/check-in-routing.module').then(m => m.CheckInRoutingModule) },
        { path: 'incentives', loadChildren: () => import('./pages/promotoria/incentivos/incentivos-routing.module').then(m => m.IncentivosRoutingModule) }
      ]
  },
];
