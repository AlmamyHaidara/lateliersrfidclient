import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisStateComponent } from './devis-state.component';

describe('DevisStateComponent', () => {
  let component: DevisStateComponent;
  let fixture: ComponentFixture<DevisStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevisStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevisStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
