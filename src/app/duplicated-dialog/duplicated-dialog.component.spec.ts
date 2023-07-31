import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicatedDialogComponent } from './duplicated-dialog.component';

describe('DuplicatedDialogComponent', () => {
  let component: DuplicatedDialogComponent;
  let fixture: ComponentFixture<DuplicatedDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuplicatedDialogComponent]
    });
    fixture = TestBed.createComponent(DuplicatedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
