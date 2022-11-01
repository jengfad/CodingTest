import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, firstValueFrom } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { BaseFormComponent } from 'src/app/shared/components/base-form.component';
import { EmailFormatValidator, } from 'src/app/shared/form-validators/email-format.validator';
import { UniqueEmailValidator } from 'src/app/shared/form-validators/unique-email.validator';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends BaseFormComponent implements OnInit {

  userData = this.route.snapshot.data['user'];
  formGroup: FormGroup;
  isEdit = this.userData;
  title = this.isEdit ? 'Edit User' : 'Add User';

  genders = ['Male', 'Female'];

  get firstName() { return this.formGroup.get('firstName') as FormControl; }
  get lastName() { return this.formGroup.get('lastName') as FormControl; }
  get email() { return this.formGroup.get('email') as FormControl; }
  get gender() { return this.formGroup.get('gender') as FormControl; }
  get status() { return this.formGroup.get('status') as FormControl; }
  get id() { return this.formGroup.get('id') as FormControl; }
  
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
      super();
  }

  ngOnInit(): void {
    this.initForm();
    if (this.isEdit) this.populateForm();

    this.formGroup.valueChanges.subscribe(() => {
      this.setHasDirtyChange(true);
    })
  }

  async save(): Promise<void> {
    const model = this.mapFormToModel();

    const saveTask = this.isEdit ? this.userService.updateUser(model) : this.userService.addUser(model);
    saveTask.subscribe(() => {
      alert(`User successfully saved!`);
      this.router.navigate(['/']);
    });
  }

  private initForm(): void {
    this.formGroup = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [
        null, 
        [Validators.required, EmailFormatValidator.validate], 
        [UniqueEmailValidator.createValidator(this.userService, this.isEdit)]],
      gender: [this.genders[0]],
      status: [true],
      id: [0]
    });
  }

  private populateForm(): void {
    this.formGroup.patchValue({
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      email: this.userData.email,
      gender: this.userData.gender,
      status: this.userData.status,
      id: this.userData.id
    })

    this.email.disable();
  }

  private mapFormToModel(): UserModel {
    return {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      gender: this.gender.value,
      status: this.status.value,
      id: this.id.value
    } as UserModel
  }

}
