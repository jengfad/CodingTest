import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./features/user-list/user-list.module').then(m => m.UserListModule),
	},
	{
		path: 'user',
		loadChildren: () => import('./features/user-form/user-form.module').then(m => m.UserFormModule),
	},
	{
		path: '**',
		redirectTo: '/',
	},
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
