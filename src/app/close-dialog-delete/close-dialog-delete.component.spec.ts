import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseDialogDeleteComponent } from './close-dialog-delete.component';

describe('CloseDialogDeleteComponent', () => {
  let component: CloseDialogDeleteComponent;
  let fixture: ComponentFixture<CloseDialogDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloseDialogDeleteComponent]
    });
    fixture = TestBed.createComponent(CloseDialogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
