import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpargneComponent } from './epargne.component';

describe('EpargneComponent', () => {
  let component: EpargneComponent;
  let fixture: ComponentFixture<EpargneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpargneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpargneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
