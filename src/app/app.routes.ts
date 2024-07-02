import { Routes } from '@angular/router';
import { LoginComponent } from "./pages/auth/login/login.component";
import { ConfiguracionComponent } from "./pages/auth/configuracion/configuracion.component";
import { DashboardComponent } from "./layout/dashboard/dashboard.component";
import { LoginGuard } from "./core/guards/login.guards";
import { AuthGuard } from "./core/guards/auth.guard";
import { ConfigurationGuards } from "./core/guards/configuration.guards";

export const routes: Routes = [
  { path: '', redirectTo: 'checkin', pathMatch: 'full' },
  { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
  { path: 'configuration', canActivate: [ConfigurationGuards], component: ConfiguracionComponent },
  { path: '', canActivate: [AuthGuard], component: DashboardComponent, children:
      [
        { path: 'checkin', loadChildren: () => import('./pages/check-in/check-in-routing.module').then(m => m.CheckInRoutingModule) },
      ]
  },
];
