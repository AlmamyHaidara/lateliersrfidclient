import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresseLivraisionComponent } from './adresse-livraision.component';

describe('AdresseLivraisionComponent', () => {
  let component: AdresseLivraisionComponent;
  let fixture: ComponentFixture<AdresseLivraisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdresseLivraisionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdresseLivraisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
