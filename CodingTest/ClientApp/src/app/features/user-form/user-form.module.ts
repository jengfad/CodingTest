import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CoreModule } from 'src/app/core/core.module';
import { UserFormComponent, UserFormRoutingModule } from '.';

@NgModule({
  declarations: [
    UserFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    UserFormRoutingModule,
    NgxPaginationModule,
    FormsModule,
	  ReactiveFormsModule
  ]
})
export class UserFormModule { }
