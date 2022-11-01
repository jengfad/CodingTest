import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-service-error-dialog',
  templateUrl: './service-error-dialog.component.html',
  styleUrls: ['./service-error-dialog.component.css']
})
export class ServiceErrorDialogComponent implements OnInit {
	@Input() public message: string;

  constructor(private activeModal: NgbActiveModal, private router: Router) { }

  ngOnInit(): void {
  }

  goToHome(): void {
    this.router.navigate(['/']);
    this.activeModal.close(true);
  }

}
