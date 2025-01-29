import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  password(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) return null

      const fullMatch = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(value);
      const hasUpperCase = /(?=.*[A-Z])+/.test(value);
      const hasLowerCase = /(?=.*[a-z])+/.test(value);
      const hasNumeric = /(?=.*\d)+/.test(value);
      const hasSpecialCharacter = /(?=.*[@$!%*?&])+/.test(value);
      const minimumLength = /^.{8,}/.test(value);
      const passwordValid = hasSpecialCharacter && hasUpperCase && hasLowerCase && hasNumeric && minimumLength;

      return !passwordValid ? {
        passwordStrength: {
          hasUpperCase,
          hasLowerCase,
          hasNumeric,
          minimumLength,
          hasSpecialCharacter,
          fullMatch
        }
      } : null;
    }
  }
}
