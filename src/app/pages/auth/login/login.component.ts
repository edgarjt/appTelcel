import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import { DataService } from "../../../shared/data-service";
import { RegionesService } from "../../../core/services/regiones.service";
import { ResponseRegionInterface } from "../../../interfaces/region.interface";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  hide = true;
  loginForm: FormGroup;
  regiones: ResponseRegionInterface[];

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private dataService: DataService,
              private regionesService: RegionesService) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.getRegiones();
  }

  getRegiones(): void {
    this.regionesService.getRegiones().subscribe({
      next: (resp) => {
        this.regiones = resp;
      }
    })
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }


    const request = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    }

    this.authService.login(request).subscribe({
      next: (resp) => {
        if (resp) {
          this.dataService.credentialUser = resp;
          this.dataService.region = this.loginForm.value.region;
          this.router.navigate(['/configuration']);
        }
      }
    })
  }
}
