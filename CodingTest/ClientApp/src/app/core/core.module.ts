import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimpleDialogComponent } from '../shared/components/simple-dialog/simple-dialog.component';

@NgModule({
  declarations: [
    SimpleDialogComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ]
})
export class CoreModule { }
