import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDevisComponent } from './card-devis.component';

describe('CardDevisComponent', () => {
  let component: CardDevisComponent;
  let fixture: ComponentFixture<CardDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardDevisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
