import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.css']
})
export class SimpleDialogComponent implements OnInit {
	@Input() public title: string;
	@Input() public message: string;
  @Input() isConfirm = false;

	closeButtonText = 'Close';
	yesButtonText = 'Yes';
	noButtonText = 'No';

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close(value: boolean) {
		this.activeModal.close(value);
  }

}
