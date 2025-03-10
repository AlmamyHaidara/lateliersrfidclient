import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressionModelComponent } from './impression-model.component';

describe('ImpressionModelComponent', () => {
  let component: ImpressionModelComponent;
  let fixture: ComponentFixture<ImpressionModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImpressionModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImpressionModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
