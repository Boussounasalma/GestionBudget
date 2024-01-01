import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEpargneComponent } from './add-epargne.component';

describe('AddEpargneComponent', () => {
  let component: AddEpargneComponent;
  let fixture: ComponentFixture<AddEpargneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEpargneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEpargneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
