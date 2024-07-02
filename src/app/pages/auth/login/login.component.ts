import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import { DataService } from "../../../shared/data-service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private dataService: DataService) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const request = this.loginForm.value;
    this.authService.login(request).subscribe({
      next: (resp) => {
        if (resp) {
          this.dataService.credentialUser = resp;
          this.router.navigate(['/configuration']);
        }
      }
    })
  }
}
