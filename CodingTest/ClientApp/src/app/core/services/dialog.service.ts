import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { firstValueFrom, from } from "rxjs";
import { SimpleDialogComponent } from "src/app/shared/components/simple-dialog/simple-dialog.component";

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    constructor(private modalService: NgbModal) {
    }
    
    public async openSimpleDialog(
		title: string,
		message: string,
		isConfirm: boolean = false): Promise<any> {
    
		const modalRef = this.modalService.open(SimpleDialogComponent, {
			backdrop: 'static',
			keyboard: false
		});
		modalRef.componentInstance.title = title;
		modalRef.componentInstance.message = message;
		modalRef.componentInstance.isConfirm = isConfirm;
		return await firstValueFrom(from(modalRef.result));
  }

}