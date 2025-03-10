import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeApercuModalComponent } from './commande-apercu-modal.component';

describe('CommandeApercuModalComponent', () => {
  let component: CommandeApercuModalComponent;
  let fixture: ComponentFixture<CommandeApercuModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommandeApercuModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandeApercuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
