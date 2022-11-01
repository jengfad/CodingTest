import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/components/base-form.component';
import { DialogService } from '../services';

@Injectable({
	providedIn: 'root'
})
export class PendingChangesGuard implements CanDeactivate<BaseFormComponent> {

	constructor(private dialogService: DialogService) {}

	canDeactivate(component: BaseFormComponent): Observable<boolean> {
        if (!component.hasDirtyChange()) return of(true);
		
		return this.dialogService.openSimpleDialog(
			"Unsaved Changes", 
			"You have unsaved changes. Are you sure you want to leave this page?", 
			true);
	}

}
