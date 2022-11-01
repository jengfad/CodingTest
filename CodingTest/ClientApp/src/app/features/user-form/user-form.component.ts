import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

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
  }

  ngOnInit(): void {
    this.initForm();
    if (this.isEdit) this.populateForm();
  }

  save(): void {
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
      email: [null, [Validators.required]],
      gender: [this.genders[0]],
      status: [false],
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
