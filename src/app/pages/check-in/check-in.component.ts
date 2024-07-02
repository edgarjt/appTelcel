import { Component, OnInit } from '@angular/core';
import { MaterialModule } from "../../shared/material.module";
import { CheckInServiceService } from "../../core/services/check-in-service.service";
import { AuthService } from "../../core/services/auth.service";
import moment from "moment";
import { ResponseCheckInInterface } from "../../interfaces/chek-in.interface";
import { ModalsService } from "../../core/services/modals.service";

@Component({
  selector: 'app-chek-in',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './check-in.component.html',
  styleUrl: './check-in.component.css'
})
export class CheckInComponent implements OnInit {
  protected readonly moment = moment;
  usuarioCredential: any;
  textCheck: string;
  classCheck: string;
  listChecks: ResponseCheckInInterface[] = [];
  isFinished: boolean = false;

  constructor(private checkInService: CheckInServiceService,
              private authService: AuthService,
              private modalsService: ModalsService) {
    this.textCheck = '';
    this.classCheck = 'color-no-check';
    this.usuarioCredential = this.authService.getCredential();
  }

  ngOnInit(): void {
    this.getCheck();
  }

  getCheck(): void {
    const date = moment().format('YYYY-MM-DD');
    this.checkInService.getCheckInOut(this.usuarioCredential.id, date).subscribe({
      next: (resp) => {
        if (resp) {
          this.listChecks = resp;
          this.verifyStatusCheckIn(this.listChecks);
        }
      }
    })
  }

  verifyStatusCheckIn(data: ResponseCheckInInterface[]): void {
    if (data.length === 0) {
      this.textCheck = 'Check-In';
      this.classCheck = 'color-check-in';
      return;
    }

    if (data.length >= 2) {
      this.isFinished = true;
      return;
    }

    const lastRecord = data[0];

    if (lastRecord.tipo === 1) {
      this.textCheck = 'Check-Out';
      this.classCheck = 'color-check-out';
    }
  }

  calculateHoursWorked(registers: ResponseCheckInInterface[]): string {
    let totalSegundosTrabajados = 0;
    let checkIn = null;

    for (const registro of registers) {
      if (registro.tipo === 1) {
        checkIn = moment(registro.fechaHora);
      } else if (registro.tipo === 2 && checkIn) {
        const checkOut = moment(registro.fechaHora);
        totalSegundosTrabajados += checkOut.diff(checkIn, 'seconds');
        checkIn = null; // Reset checkIn after a successful check-out
      }
    }

    const horas = Math.floor(totalSegundosTrabajados / 3600);
    const minutos = Math.floor((totalSegundosTrabajados % 3600) / 60);
    const segundos = totalSegundosTrabajados % 60;

    return `${String(horas).padStart(2, '0')} hrs. ${String(minutos).padStart(2, '0')} min. ${String(segundos).padStart(2, '0')} seg.`;
  }

  check(type: number): void {
    let message = '';

    if (type === 1) {
      message = '¿Estas seguro de hacer chek-in?';
    } else {
      message = 'No podra levantar más solicitudes de portabilidad. </br> </br> ¿Estas seguro de hacer chek-out?';
    }

    this.modalsService.openModal(message, 'confirm').subscribe({
      next: (resp) => {
        if (resp) {
          const horaActual = moment().format('YYYY-MM-DDTHH:mm:ss');
          const request = {
            usuarioId: this.usuarioCredential.id,
            tipo: type,
            fechaHora: horaActual
          }

          this.checkInService.checkIn(request).subscribe({
            next: (resp) => {
              if (resp) {
                this.listChecks.push(resp);
                this.verifyStatusCheckIn(this.listChecks)
              }
            }
          });
        }
      }
    });
  }


}
