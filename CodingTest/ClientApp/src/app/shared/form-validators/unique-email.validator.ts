import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { UserApiMockService } from 'src/app/core/mock/user-api-mock.service';
import { UserApiService } from 'src/app/core/services';

export class UniqueEmailValidator {
  static createValidator(userService: UserApiMockService, isEdit: boolean): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
	const emailValue = control.value;
	if (!emailValue || emailValue.length === 0 || isEdit)
      return null;

      return userService.getUserByEmail(emailValue).pipe(
          map((user) => user ? { emailAlreadyExists : "Email already exists" } : null)
      );
    };
  }
}
