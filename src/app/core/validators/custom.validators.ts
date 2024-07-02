import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static telefono(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneNumberRegex = /^\d{10}$/; // Expresión regular para 10 dígitos numéricos
      if (control.value && !phoneNumberRegex.test(control.value)) {
        return { invalidPhoneNumber: true };
      }
      return null;
    };
  }
}
