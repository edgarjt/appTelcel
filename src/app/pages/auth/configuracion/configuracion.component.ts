import { Component, OnInit } from '@angular/core';
import { MaterialModule } from "../../../shared/material.module";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { DataService } from "../../../shared/data-service";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent implements OnInit {
  dataForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private dataService: DataService,
              private authService: AuthService) {
    this.dataForm = this.fb.group({
      phone: new FormControl('', [Validators.required])
    })
  }


  ngOnInit(): void {}

  onSubmit(): void {
    if (this.dataForm.invalid) {
      return;
    }
    const request = this.dataForm.value;
    this.authService.saveCredential(this.dataService.credentialUser)

    this.router.navigate(['/']);
  }

}
