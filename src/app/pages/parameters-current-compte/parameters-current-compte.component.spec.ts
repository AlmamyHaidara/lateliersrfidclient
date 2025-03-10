import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersCurrentCompteComponent } from './parameters-current-compte.component';

describe('ParametersCurrentCompteComponent', () => {
  let component: ParametersCurrentCompteComponent;
  let fixture: ComponentFixture<ParametersCurrentCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParametersCurrentCompteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParametersCurrentCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
