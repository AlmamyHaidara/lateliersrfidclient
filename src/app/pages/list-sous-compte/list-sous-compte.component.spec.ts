import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSousCompteComponent } from './list-sous-compte.component';

describe('ListSousCompteComponent', () => {
  let component: ListSousCompteComponent;
  let fixture: ComponentFixture<ListSousCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSousCompteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSousCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
