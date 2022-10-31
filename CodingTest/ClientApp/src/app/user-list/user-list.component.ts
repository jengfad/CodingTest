import { Component, Inject } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: UserModel[] = [];
  itemsPerPage = 10;
  page = 1;
  totalItems = 0;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers(this.page);
  }

  onPageChange(page: number): void {
    this.getUsers(page);
    this.page = page;
  }

  getUsers(page: number): void {
    this.userService.getUsers(page, this.itemsPerPage, null).subscribe(result => {
      this.users = result;
      this.totalItems = 1000;
    });
  }

  editUser(user: UserModel): void {

  }

  deleteUser(user: UserModel) {
    alert(`Are you sure you want to delete ${user.email}?`);
    this.userService.deleteUser(user.id).subscribe();
    alert('user deleted');
  }
}