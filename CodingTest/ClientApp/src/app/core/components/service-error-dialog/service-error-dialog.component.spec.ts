import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceErrorDialogComponent } from './service-error-dialog.component';

describe('ServiceErrorDialogComponent', () => {
  let component: ServiceErrorDialogComponent;
  let fixture: ComponentFixture<ServiceErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceErrorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
