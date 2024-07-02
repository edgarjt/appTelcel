import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { NgxSpinnerComponent } from "ngx-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'demoTelcel';
  deferredPrompt: any;
  showInstallButton: boolean = false;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    event.preventDefault();
    this.deferredPrompt = event;
    this.showInstallButton = true;
  }

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {
    setTimeout(() => {
      if (this.showInstallButton) {
        this.openSnackBar('¿Deseas instalar la app?', 'Instalar');
      }
    }, 2500);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action).onAction().subscribe(() => {
      this.installApp();
    });
  }

  installApp() {
    this.showInstallButton = false;
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
    }
  }

}
