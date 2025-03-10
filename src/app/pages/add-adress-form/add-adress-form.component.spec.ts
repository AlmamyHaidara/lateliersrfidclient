import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdressFormComponent } from './add-adress-form.component';

describe('AddAdressFormComponent', () => {
  let component: AddAdressFormComponent;
  let fixture: ComponentFixture<AddAdressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAdressFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAdressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
