import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisTrackingComponent } from './devis-tracking.component';

describe('DevisTrackingComponent', () => {
  let component: DevisTrackingComponent;
  let fixture: ComponentFixture<DevisTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevisTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevisTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
