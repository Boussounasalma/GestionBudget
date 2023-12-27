import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRevenueComponent } from './add-revenue.component';

describe('AddRevenueComponent', () => {
  let component: AddRevenueComponent;
  let fixture: ComponentFixture<AddRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRevenueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
