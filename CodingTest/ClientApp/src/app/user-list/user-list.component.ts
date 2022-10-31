import { Component, Inject } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent {
  users: UserModel[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe(result => {
      this.users = result;
    });
  }

  deleteUser(user: UserModel) {
    alert(`Are you sure you want to delete ${user.email}?`);
    this.userService.deleteUser(user.id).subscribe();
    alert('user deleted');
  }
}