import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationComponent } from './association.component';

describe('AssociationComponent', () => {
  let component: AssociationComponent;
  let fixture: ComponentFixture<AssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
