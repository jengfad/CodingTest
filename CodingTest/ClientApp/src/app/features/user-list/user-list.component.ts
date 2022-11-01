import { Component } from '@angular/core';
import { combineLatest, debounceTime, switchMap, takeUntil, tap } from 'rxjs';
import { DialogService } from 'src/app/core/services';
import { PagedUsersParams, UserQuery } from 'src/app/core/state/user';
import { UserService } from 'src/app/core/state/user/user.service';
import { AppConstants } from 'src/app/shared/app-constants';
import { BaseComponent } from 'src/app/shared/components';
import { UserModel } from 'src/app/shared/models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BaseComponent {

  readonly SORT_BY_TYPES = AppConstants.SORT_BY_TYPES;
  readonly SORT_DIRECTION = AppConstants.SORT_DIRECTION;

  pagedUsers$ = this.userQuery.pagedUsers$;
  filters$ = this.userQuery.filters$;
  page: number;

  constructor(
    private userQuery: UserQuery,
    private userService: UserService,
    private dialogService: DialogService) {
      super();
  }

  ngOnInit(): void {
    this.listenForPagedUserEvents();
  }

  listenForPagedUserEvents(): void {
    this.userQuery.filters$.pipe(
      takeUntil(this.ngUnsubscribe$),
      debounceTime(300),
      switchMap(filters => {
        return this.userService.getPagedUsers(filters);
      })
    ).subscribe();
  }

  onSort(newSortBy: string): void {
    let sortDirection = this.SORT_DIRECTION.ASC;
    if (this.userQuery.filters.sortBy === newSortBy) {
      sortDirection = this.userQuery.filters.sortDirection === this.SORT_DIRECTION.ASC ? this.SORT_DIRECTION.DESC : this.SORT_DIRECTION.ASC;
    }

    const currentFilters = this.userQuery.filters;
    this.userService.updateFilters(
      {...currentFilters, 
        sortBy: newSortBy,
        sortDirection: sortDirection,
        pageNumber: 1
      } as PagedUsersParams);
  }

  onSearch(): void {
    const searchText = document.querySelector("#inputSearch")['value'];
    const currentFilters = this.userQuery.filters;
    this.userService.updateFilters(
      {...currentFilters, 
        pageNumber: 1, 
        searchText: searchText
      } as PagedUsersParams);
  }

  onPageChange(page: number): void {
    const currentFilters = this.userQuery.filters;
    this.userService.updateFilters(
      {...currentFilters, 
        pageNumber: page
      } as PagedUsersParams);
  }

  async deleteUser(user: UserModel) {
    const confirm = await this.dialogService.openSimpleDialogAsync("Delete User", `Are you sure you want to delete ${user.email}?`, true);
    if (!confirm) return;

    this.userService.deleteUser(user.id).subscribe(async () => {
      await this.dialogService.openSimpleDialogAsync("Delete User", `${user.email} successfully deleted!`);
    });
  }
}