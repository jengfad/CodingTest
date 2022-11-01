import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimpleDialogComponent } from './components/simple-dialog/simple-dialog.component';
import { ServiceErrorDialogComponent } from './components/service-error-dialog/service-error-dialog.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerService } from './interceptors/error-handler.service';

@NgModule({
  declarations: [
    SimpleDialogComponent,
    ServiceErrorDialogComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true
    }
  ]
})
export class CoreModule { }
