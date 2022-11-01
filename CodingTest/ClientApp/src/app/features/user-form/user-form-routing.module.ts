import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingChangesGuard } from 'src/app/core/guards/pending-changes.guard';
import { UserFormComponent } from './user-form.component';
import { UserFormResolver } from './user-form.resolver';

const routes: Routes = [
	{
		path: '',
		component: UserFormComponent,
		canDeactivate: [PendingChangesGuard]
	},
    {
		path: ':userId',
		component: UserFormComponent,
        resolve: { user: UserFormResolver }
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserFormRoutingModule { }