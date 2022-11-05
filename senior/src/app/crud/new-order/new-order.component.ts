import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { OrderItensService } from 'src/app/services/crud/order-itens.service';
import { OrderService } from 'src/app/services/crud/order.service';
import { ProductServiceService } from 'src/app/services/crud/product-service.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  updateButtonHidden: boolean = this.orderService.updateButtonHidden;
  order!: any;
  productService!: any;

  // quantity!: number | any;
  discount!: number | null
  amount!: number | null
  date: any = new Date()

  constructor(
    public orderService: OrderService,
    public productServiceService: ProductServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(!this.orderService.updateButtonHidden) {
      this.order = this.orderService.order;
    } else {
      this.order = {};
    }
  }

  createOrder() {
    this.orderService
      .create(this.order)
      .pipe(
        catchError((error) => {

          this.router.navigateByUrl("order")           
          return of(false);
        })
      )
      .subscribe((response: any) => {
        console.log(response);
          this.orderService.orderList.push(response);
          console.log(response);
          
      });
      this.clearInputs()
      // this.router.navigateByUrl("order")
  }

  updateOrder(): void {
    this.orderService
      .update(this.orderService.order)
      .pipe(
        catchError((error) => {
          return of(false);
        })
      )
      .subscribe((response: any) => {
        if (response) {
          this.orderService.orderList[this.orderService.orderList.indexOf(this.orderService.orderList)] = response;
        }
      });
      this.clearInputs()
      this.router.navigateByUrl("order")
  }

  clearInputs() {
    this.discount = 0
    this.amount = 0
  }

  onSubmit() {
    if(this.updateButtonHidden === true) {
      this.createOrder()
    } else {
      this.updateOrder()
    }
  }

  cancelRecord() {
    this.clearInputs()
    this.router.navigateByUrl("productservice")
  }

  invalidMessage(variable: any): boolean {
    let validation: boolean
    if(!variable.valid && variable.touched) {
      validation = true;
    } else {
      validation = false;
    }
    return validation
  }
}
