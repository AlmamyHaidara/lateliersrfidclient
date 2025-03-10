import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDimensionsComponent } from './list-dimensions.component';

describe('ListDimensionsComponent', () => {
  let component: ListDimensionsComponent;
  let fixture: ComponentFixture<ListDimensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDimensionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListDimensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
