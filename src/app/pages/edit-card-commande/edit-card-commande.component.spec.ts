import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardCommandeComponent } from './edit-card-commande.component';

describe('EditCardCommandeComponent', () => {
  let component: EditCardCommandeComponent;
  let fixture: ComponentFixture<EditCardCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCardCommandeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCardCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
