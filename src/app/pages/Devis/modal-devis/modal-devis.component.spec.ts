import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDevisComponent } from './modal-devis.component';

describe('ModalDevisComponent', () => {
  let component: ModalDevisComponent;
  let fixture: ComponentFixture<ModalDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDevisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
