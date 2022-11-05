import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderItensComponent } from './new-order-itens.component';

describe('NewOrderItensComponent', () => {
  let component: NewOrderItensComponent;
  let fixture: ComponentFixture<NewOrderItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOrderItensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrderItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
