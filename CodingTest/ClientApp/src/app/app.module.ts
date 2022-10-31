import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { UserFormComponent } from './user-form/user-form.component';
import { UserFormResolver } from './user-form/user-form.resolver';
import { UserListComponent } from './user-list/user-list.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    UserFormComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    CoreModule,
    HttpClientModule,
    FormsModule,
		ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      { 
        path: '',
        component: UserListComponent,
        pathMatch: 'full'
      },
      {
        path: 'user/:userId',
        component: UserFormComponent,
        resolve: {
          user: UserFormResolver
        }
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
