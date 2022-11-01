import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

export class UniqueEmailValidator {
    static createValidator(userService: UserService, isEdit: boolean): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors> => {
		const emailValue = control.value;
		if (!emailValue || emailValue.length === 0 || isEdit)
        return null;

        return userService.getUserByEmail(emailValue).pipe(
            map((user) => user ? {emailAlreadyExists: "Email already exists"} : null)
        );
      };
    }
  }