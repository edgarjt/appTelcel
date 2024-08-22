import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const user = this.authService.getCredential();
    this.user = `${user?.nombre} ${user?.apellidoPaterno} ${user?.apellidoMaterno}`;


    // Logica para resetear checkin
    const data = sessionStorage.getItem('checkin');

    if (data) {
      const checkin = JSON.parse(data);

      if (checkin.length > 1) {
        sessionStorage.setItem('isCheckin', '0');
        sessionStorage.setItem('checkin', '[]');
      }
    }




  }
}
