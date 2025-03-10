import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSousCompteComponent } from './edit-sous-compte.component';

describe('EditSousCompteComponent', () => {
  let component: EditSousCompteComponent;
  let fixture: ComponentFixture<EditSousCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSousCompteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSousCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
