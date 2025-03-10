import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterneUserComponent } from './interne-user.component';

describe('InterneUserComponent', () => {
  let component: InterneUserComponent;
  let fixture: ComponentFixture<InterneUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterneUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterneUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
