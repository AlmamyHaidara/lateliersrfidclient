import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisHistoryComponent } from './devis-history.component';

describe('DevisHistoryComponent', () => {
  let component: DevisHistoryComponent;
  let fixture: ComponentFixture<DevisHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevisHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevisHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
