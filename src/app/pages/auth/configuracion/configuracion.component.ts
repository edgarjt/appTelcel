import { Component, OnInit } from '@angular/core';
import { MaterialModule } from "../../../shared/material.module";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { DataService } from "../../../shared/data-service";
import { AuthService } from "../../../core/services/auth.service";
import { CustomValidators } from "../../../core/validators/custom.validators";
import { NumberOnlyDirective } from "../../../core/directives/number-only.directive";

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule, NumberOnlyDirective],
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
      phone: new FormControl('', [Validators.required, CustomValidators.telefono()])
    })
  }


  ngOnInit(): void {}

  onSubmit(): void {
    if (this.dataForm.invalid) {
      return;
    }
    const request = this.dataForm.value;
    this.authService.saveCredential(this.dataService.credentialUser, this.dataService.region);

    this.router.navigate(['/']);
  }

}
