import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { firstValueFrom, from, map, Observable } from "rxjs";
import { ServiceErrorDialogComponent, SimpleDialogComponent } from "../components";

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    constructor(private modalService: NgbModal) {
    }

	public async openServiceErrorDialogAsync(message: string): Promise<boolean> {
		return await firstValueFrom(this.openServiceErrorDialog(message));
	}

	public openServiceErrorDialog(message: string): Observable<boolean> {
		const modalRef = this.modalService.open(ServiceErrorDialogComponent, {
			backdrop: 'static',
			keyboard: false
		});
		modalRef.componentInstance.message = message;
		return from(modalRef.result).pipe(map( (value: boolean) => value));
	}

	public async openSimpleDialogAsync(title: string, message: string, isConfirm: boolean = false): Promise<boolean> {
		return await firstValueFrom(this.openSimpleDialog(title, message, isConfirm));
	}
    
    public openSimpleDialog(title: string, message: string, isConfirm: boolean = false): Observable<boolean> {
    
		const modalRef = this.modalService.open(SimpleDialogComponent, {
			backdrop: 'static',
			keyboard: false
		});
		modalRef.componentInstance.title = title;
		modalRef.componentInstance.message = message;
		modalRef.componentInstance.isConfirm = isConfirm;

		return from(modalRef.result).pipe(map( (value: boolean) => value));
  }

}