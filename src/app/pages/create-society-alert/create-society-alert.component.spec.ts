import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSocietyAlertComponent } from './create-society-alert.component';

describe('CreateSocietyAlertComponent', () => {
  let component: CreateSocietyAlertComponent;
  let fixture: ComponentFixture<CreateSocietyAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSocietyAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSocietyAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
