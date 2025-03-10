import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApercucommandeComponent } from './apercucommande.component';

describe('ApercucommandeComponent', () => {
  let component: ApercucommandeComponent;
  let fixture: ComponentFixture<ApercucommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApercucommandeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApercucommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
