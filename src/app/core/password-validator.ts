import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordFuerteValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
    if (!valor) return null;

    const regla = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
    return regla.test(valor) ? null : { passwordDebil: true };
  };
}
