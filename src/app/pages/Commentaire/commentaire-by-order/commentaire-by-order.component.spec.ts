import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentaireByOrderComponent } from './commentaire-by-order.component';

describe('CommentaireByOrderComponent', () => {
  let component: CommentaireByOrderComponent;
  let fixture: ComponentFixture<CommentaireByOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentaireByOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentaireByOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
