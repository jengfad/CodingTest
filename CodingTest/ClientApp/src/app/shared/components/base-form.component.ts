import { Component } from '@angular/core';
import { BaseComponent } from './base.component';

@Component({
	template: ''
})
export abstract class BaseFormComponent extends BaseComponent {

	private hasDirtyChanges = false;

	constructor() {
		super();
	}

	setHasDirtyChange(val: boolean) {
		this.hasDirtyChanges = val;
	}

	hasDirtyChange() {
		return this.hasDirtyChanges;
	}

}
