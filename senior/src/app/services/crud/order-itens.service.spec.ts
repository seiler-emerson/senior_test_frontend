import { TestBed } from '@angular/core/testing';

import { OrderItensService } from './order-itens.service';

describe('OrderItensService', () => {
  let service: OrderItensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderItensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
