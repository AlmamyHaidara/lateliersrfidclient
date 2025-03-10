import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsPageComponent } from './informations-page.component';

describe('InformationsPageComponent', () => {
  let component: InformationsPageComponent;
  let fixture: ComponentFixture<InformationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformationsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
