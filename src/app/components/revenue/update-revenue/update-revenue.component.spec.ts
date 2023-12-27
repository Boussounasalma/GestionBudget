import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRevenueComponent } from './update-revenue.component';

describe('UpdateRevenueComponent', () => {
  let component: UpdateRevenueComponent;
  let fixture: ComponentFixture<UpdateRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateRevenueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
