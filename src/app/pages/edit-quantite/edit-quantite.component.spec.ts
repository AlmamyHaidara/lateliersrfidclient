import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuantiteComponent } from './edit-quantite.component';

describe('EditQuantiteComponent', () => {
  let component: EditQuantiteComponent;
  let fixture: ComponentFixture<EditQuantiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditQuantiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditQuantiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
