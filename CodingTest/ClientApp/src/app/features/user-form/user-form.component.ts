import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { DialogService } from 'src/app/core/services/dialog.service';
import { UserService } from 'src/app/core/services/user.service';
import { AppConstants } from 'src/app/shared/app-constants';
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
  formGroup: UntypedFormGroup;
  isEdit = this.userData;
  title = this.isEdit ? 'Edit User' : 'Add User';

  genders = AppConstants.GENDERS;

  get firstName() { return this.formGroup.get('firstName') as UntypedFormControl; }
  get lastName() { return this.formGroup.get('lastName') as UntypedFormControl; }
  get email() { return this.formGroup.get('email') as UntypedFormControl; }
  get gender() { return this.formGroup.get('gender') as UntypedFormControl; }
  get status() { return this.formGroup.get('status') as UntypedFormControl; }
  get id() { return this.formGroup.get('id') as UntypedFormControl; }
  
  constructor(
		private dialogService: DialogService,
    private userService: UserService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
      super();
  }

  ngOnInit(): void {
    this.initForm();
    if (this.isEdit) this.populateForm();

    this.formGroup.valueChanges.pipe(
      filter(() => !this.hasDirtyChange()),
      tap(() => this.setHasDirtyChange(true))
    ).subscribe()
  }

  async save(): Promise<void> {
    const model = this.mapFormToModel();

    const saveTask = this.isEdit ? this.userService.updateUser(model) : this.userService.addUser(model);
    saveTask.subscribe(async () => {
      await this.dialogService.openSimpleDialog("Add User", "User successfully saved!");
      this.setHasDirtyChange(false);
      this.router.navigate(['/']);
    });
  }

  private initForm(): void {
    const emailValidators = !this.isEdit ? [
      [Validators.required, EmailFormatValidator.validate], 
      [UniqueEmailValidator.createValidator(this.userService, this.isEdit)]
    ] : [];
    this.formGroup = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, ...emailValidators],
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
    });

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
