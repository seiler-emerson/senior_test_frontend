import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductServiceComponent } from './new-product-service.component';

describe('NewProductServiceComponent', () => {
  let component: NewProductServiceComponent;
  let fixture: ComponentFixture<NewProductServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProductServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
