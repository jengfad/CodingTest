import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form.component';
import { UserFormResolver } from './user-form.resolver';

const routes: Routes = [
	{
		path: '',
		component: UserFormComponent
	},
    {
		path: ':userId',
		component: UserFormComponent,
        resolve: { userData: UserFormResolver }
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserFormRoutingModule { }