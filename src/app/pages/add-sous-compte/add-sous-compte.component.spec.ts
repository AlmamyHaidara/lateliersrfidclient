import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSousCompteComponent } from './add-sous-compte.component';

describe('AddSousCompteComponent', () => {
  let component: AddSousCompteComponent;
  let fixture: ComponentFixture<AddSousCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSousCompteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSousCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
