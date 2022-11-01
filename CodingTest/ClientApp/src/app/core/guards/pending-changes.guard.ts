import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { BaseFormComponent } from 'src/app/shared/components/base-form.component';

@Injectable({
	providedIn: 'root'
})
export class PendingChangesGuard implements CanDeactivate<BaseFormComponent> {

	constructor() {}

	canDeactivate(component: BaseFormComponent): boolean {
        if (!component.hasDirtyChange()) return true;

        const confirm = window.confirm("You have unsaved changes. Are you sure you want to leave this page?");
        return confirm;
	}

}
