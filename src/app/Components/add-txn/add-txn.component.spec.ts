import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTxnComponent } from './add-txn.component';

describe('AddTxnComponent', () => {
  let component: AddTxnComponent;
  let fixture: ComponentFixture<AddTxnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTxnComponent]
    });
    fixture = TestBed.createComponent(AddTxnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
