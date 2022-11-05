import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { OrderService } from 'src/app/services/crud/order.service';
import { ProductServiceService } from 'src/app/services/crud/product-service.service';
import { SystemService } from 'src/app/services/system.service';
import { NewOrderComponent } from '../new-order/new-order.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order!:any
  orderIdSelected!: number;

  constructor(
    private systemService: SystemService,
    public orderService: OrderService,
    public productServiceService: ProductServiceService,
    private router: Router,
    public newOrderComponent: NewOrderComponent
  ) { }

  ngOnInit(): void {
    this.sendTitle()
    this.listAllOrder()
    this.order = {}
  }


  listAllOrder(): void {
    this.orderService
      .getAll()
      .pipe(
        catchError((error) => {
          return of(false);
        })
      )
      .subscribe((response) => {
        this.orderService.orderList = response;
      });
  }

  detailOrder(order: any) {
    this.orderService
    .getById(order)
    .pipe(
      catchError((error) => {
        return of(false);
      })
    )
    .subscribe((response: any) => {
      this.orderService.order = response;
      this.router.navigateByUrl("detail-order")
    });
  }

  updateOrder(order: any): void {
    this.orderService.updateButtonHidden = false
    this.orderService
      .getById(order)
      .pipe(
        catchError((error) => {
          return of(false);
        })
      )
      .subscribe((response: any) => {
        this.orderService.order = response;
        this.router.navigateByUrl("new-order")
      });
  }

  newOrder() {
    this.orderService.updateButtonHidden = true
    this.router.navigateByUrl("new-order")
  }

  saveOrderId(order: number) {
    this.orderIdSelected = order;
  }


  sendTitle() {
    this.systemService.currentTitle = "Order"
  }

  createOrder() {
    this.orderService
      .create(this.order)
      .pipe(
        catchError((error) => {          
          return of(error);
        })
      )
      .subscribe((response: any) => {
          this.orderService.orderList.push(response);
      });
  }
}
