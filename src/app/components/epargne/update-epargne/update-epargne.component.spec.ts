import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEpargneComponent } from './update-epargne.component';

describe('UpdateEpargneComponent', () => {
  let component: UpdateEpargneComponent;
  let fixture: ComponentFixture<UpdateEpargneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateEpargneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateEpargneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
