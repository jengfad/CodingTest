import { Component } from '@angular/core';
import { BehaviorSubject, debounce, debounceTime, Observable, tap } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { UserModel } from 'src/app/shared/models/user.model';

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
  searchTextSubj = new BehaviorSubject('');

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers(this.page);

    this.searchTextSubj.pipe(
      debounceTime(500),
      tap(() => this.onPageChange(1))
    ).subscribe();
  }

  onSearch(): void {
    this.searchTextSubj.next(this.searchText);
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
    var confirm = window.confirm(`Delete ${user.email}?`);
    if (!confirm) return;

    this.userService.deleteUser(user.id).subscribe(() => {
      alert(`${user.email} successfully deleted!`);
    });
  }
}