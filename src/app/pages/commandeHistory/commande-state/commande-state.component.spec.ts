import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeStateComponent } from './commande-state.component';

describe('CommandeStateComponent', () => {
  let component: CommandeStateComponent;
  let fixture: ComponentFixture<CommandeStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommandeStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandeStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
