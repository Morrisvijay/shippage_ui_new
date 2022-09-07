import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceReturnComponent } from './invoice-return.component';

describe('InvoiceReturnComponent', () => {
  let component: InvoiceReturnComponent;
  let fixture: ComponentFixture<InvoiceReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
