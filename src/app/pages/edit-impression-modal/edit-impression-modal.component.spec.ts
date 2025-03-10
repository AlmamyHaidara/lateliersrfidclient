import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImpressionModalComponent } from './edit-impression-modal.component';

describe('EditImpressionModalComponent', () => {
  let component: EditImpressionModalComponent;
  let fixture: ComponentFixture<EditImpressionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditImpressionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditImpressionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
