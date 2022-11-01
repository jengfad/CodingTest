import { Component } from '@angular/core';
import { BehaviorSubject, debounceTime, tap } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { UserModel } from 'src/app/shared/models/user.model';
import { AppConstants } from 'src/app/shared/app-constants';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  readonly ORDER_BY_TYPES = AppConstants.ORDER_BY_TYPES;
  readonly SORT_DIRECTION = AppConstants.SORT_DIRECTION;

  users: UserModel[] = [];
  itemsPerPage = 10;
  page = 1;
  totalItems = 0;
  searchText = "";
  orderBy = this.ORDER_BY_TYPES.EMAIL;
  sortDirection = this.SORT_DIRECTION.ASC;
  
  private searchTextSubj = new BehaviorSubject('');

  constructor(
    private userService: UserService,
    private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.getUsers(this.page);

    this.searchTextSubj.pipe(
      debounceTime(500),
      tap(() => this.onPageChange(1))
    ).subscribe();
  }

  private toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === this.SORT_DIRECTION.ASC ? this.SORT_DIRECTION.DESC : this.SORT_DIRECTION.ASC;
  }

  sortBy(type: string): void {
    if (this.orderBy === type) {
      this.toggleSortDirection();
    } else {
      this.orderBy = type;
    }
    this.onPageChange(1);
  }

  onSearch(): void {
    this.searchTextSubj.next(this.searchText);
  }

  onPageChange(page: number): void {
    this.getUsers(page);
    this.page = page;
  }

  getUsers(page: number): void {
    this.userService.getUsers(page, this.itemsPerPage, this.searchText, this.orderBy, this.sortDirection).subscribe(result => {
      this.users = result.users;
      this.totalItems = result.totalItems;
    });
  }

  async deleteUser(user: UserModel) {
    const confirm = await this.dialogService.openSimpleDialog("Delete User", `Are you sure you want to delete ${user.email}?`, true);
    if (!confirm) return;

    this.userService.deleteUser(user.id).subscribe(async () => {
      await this.dialogService.openSimpleDialog("Delete User", `${user.email} successfully deleted!`);
    });
  }
}