import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeHistoryListComponent } from './commande-history-list.component';

describe('CommandeHistoryListComponent', () => {
  let component: CommandeHistoryListComponent;
  let fixture: ComponentFixture<CommandeHistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommandeHistoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandeHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
