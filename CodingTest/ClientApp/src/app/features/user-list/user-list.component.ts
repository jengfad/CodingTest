import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { UserModel } from 'src/app/models/user.model';

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
  searchText = "";

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers(this.page);
  }

  onSearch(): void {
    this.onPageChange(1);
  }

  onPageChange(page: number): void {
    this.getUsers(page);
    this.page = page;
  }

  getUsers(page: number): void {
    this.userService.getUsers(page, this.itemsPerPage, this.searchText).subscribe(result => {
      this.users = result.users;
      this.totalItems = result.totalItems;
    });
  }

  deleteUser(user: UserModel) {
    alert(`Are you sure you want to delete ${user.email}?`);
    this.userService.deleteUser(user.id).subscribe();
    alert('user deleted');
  }
}