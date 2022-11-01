import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
	template: ''
})
export abstract class BaseComponent implements OnDestroy {

	ngUnsubscribe$ = new Subject();

	constructor() { }

	ngOnDestroy() {
		this.unsubscribe();
	}
	unsubscribe() {
		this.ngUnsubscribe$.next(true);
		this.ngUnsubscribe$.unsubscribe();
	}
}
