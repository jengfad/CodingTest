import { AbstractControl } from '@angular/forms';

export class EmailFormatValidator {
	static validate(control: AbstractControl): { [key: string]: any } | null {
		const GENERAL_REGEX = /^[\w\-.\+]+@[\w\-.]+\.[\w\-]{2,}$/;  

		const emailValue = control.value;

		if (!emailValue || emailValue.length === 0)
			return null;

		if (!GENERAL_REGEX.test(emailValue))
			return { emailInvalid: `Invalid Email` };

		return null;
	}
}
