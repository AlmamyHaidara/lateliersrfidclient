import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisQuantityComponent } from './devis-quantity.component';

describe('DevisQuantityComponent', () => {
  let component: DevisQuantityComponent;
  let fixture: ComponentFixture<DevisQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevisQuantityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevisQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
