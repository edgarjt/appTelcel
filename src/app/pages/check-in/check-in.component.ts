import { Component, OnInit } from '@angular/core';
import { MaterialModule } from "../../shared/material.module";
import { CheckInServiceService } from "../../core/services/check-in-service.service";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: 'app-chek-in',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './check-in.component.html',
  styleUrl: './check-in.component.css'
})
export class CheckInComponent implements OnInit {
  usuarioCredential: any;
  checkIn: boolean = false;
  checkOut: boolean = false;

  constructor(private checkInService: CheckInServiceService,
              private authService: AuthService) {
    this.usuarioCredential = authService.getCredential();
  }

  ngOnInit(): void {
    console.log(this.usuarioCredential);
    this.validaCheck();
  }

  validaCheck() {
    if (localStorage.getItem('checkIn') == 'true') {
      this.checkIn = true;
    }
    if (localStorage.getItem('checkOut') == 'true') {
      this.checkOut = true;
    }
  }

  checkInClick() {
    const fechaHoraActual = new Date();
    const anio = fechaHoraActual.getFullYear();
    const mes = String(fechaHoraActual.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
    const dia = String(fechaHoraActual.getDate()).padStart(2, '0');
    const horas = String(fechaHoraActual.getHours()).padStart(2, '0');
    const minutos = String(fechaHoraActual.getMinutes()).padStart(2, '0');
    const segundos = String(fechaHoraActual.getSeconds()).padStart(2, '0');
    const fechaHora = `${anio}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;



    const request = {
      usuarioId: this.usuarioCredential.id,
      tipo: 1, // 1 = entrada y 2 = salida
      fechaHora
    }


    this.checkInService.checkIn(request).subscribe({
      next: (response) => {
        if (response){
          this.checkIn = true;
          localStorage.setItem('checkIn', 'true');
        }
      }
    })

  }

  checkOutClick() {
    const fechaHoraActual = new Date();
    const anio = fechaHoraActual.getFullYear();
    const mes = String(fechaHoraActual.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
    const dia = String(fechaHoraActual.getDate()).padStart(2, '0');
    const horas = String(fechaHoraActual.getHours()).padStart(2, '0');
    const minutos = String(fechaHoraActual.getMinutes()).padStart(2, '0');
    const segundos = String(fechaHoraActual.getSeconds()).padStart(2, '0');
    const fechaHora = `${anio}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;



    const request = {
      usuarioId: this.usuarioCredential.id,
      tipo: 2, // 1 = entrada y 2 = salida
      fechaHora
    }

    this.checkInService.checkIn(request).subscribe({
      next: (response) => {
        if (response){
          this.checkOut = true;
          localStorage.setItem('checkOut', 'true');
        }
      }
    })
  }
}
