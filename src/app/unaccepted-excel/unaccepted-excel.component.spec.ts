import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnacceptedExcelComponent } from './unaccepted-excel.component';

describe('UnacceptedExcelComponent', () => {
  let component: UnacceptedExcelComponent;
  let fixture: ComponentFixture<UnacceptedExcelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnacceptedExcelComponent]
    });
    fixture = TestBed.createComponent(UnacceptedExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
