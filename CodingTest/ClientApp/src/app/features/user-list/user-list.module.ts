import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListRoutingModule } from './user-list-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CoreModule } from 'src/app/core/core.module';
import { UserListComponent } from '.';

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    UserListRoutingModule,
    NgxPaginationModule,
    FormsModule,
		ReactiveFormsModule
  ]
})
export class UserListModule { }
