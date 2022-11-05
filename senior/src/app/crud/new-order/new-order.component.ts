import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

  //criacao da order
  order!: any;
  orderItens!: any
  orderItensToOrder: Array<any> = []
  productService!: any;
  productServiceList!: any;
  quantityPurchased!: any;
  discount!: any
  amount!: number | null
  date: any = new Date()

  constructor(
    public orderService: OrderService,
    public orderItensService: OrderItensService,
    public productServiceService: ProductServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.listAllProductService()
    if(!this.orderService.updateButtonHidden) {
      this.order = this.orderService.order;
      this.listAllOrderItens()
      this.orderItens = this.orderItensService.orderItens
      this.updateAmount()
    } else {
      this.order = {};
      this.createOrder()
      this.orderItensService.orderItens = {}
      this.orderItens = {}
    }
  }

  // =================== ORDER ===================

  createOrder() {
    this.order.discount = 0;
    this.orderService
      .create(this.order)
      .pipe(
        catchError((error) => {         
          return of(false);
        })
      )
      .subscribe((response: any) => {
          this.order = response 
          this.orderService.order = response          
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
        if(response) {
          this.orderService.orderList[this.orderService.orderList.indexOf(this.orderService.orderList)] = response;
        }
      });
      this.updateAmount()
    }

  deleteOrder(order: any) {
    this.orderService
    .delete(order)
    .pipe(
      catchError((error) => {
        return of(error)
      })
    )
    .subscribe((response: any) => {
      this.orderService.orderList.splice(this.orderService.orderList.indexOf(order), 1);
    })
    this.router.navigateByUrl("orders")
    
  }
  
  updateAmount() {
    setTimeout(() => {
      this.listAllOrderItens()
      console.log(this.orderItensService.orderItensList);
    }, 250);
    setTimeout(() => {
      if(this.orderItensService.orderItensList.length > 0) {
        this.amount = this.orderItensService.orderItensList[0].order.amount;
      } else {
        this.amount = 0 
      }
    }, 1000);
    console.log(this.amount);
    
  }

  // =================== ORDER ITENS ===================

  listAllOrderItens(): void {
    this.orderItensService
      .getByOrderId(this.order.id)
      .pipe(
        catchError((error) => {
          return of(false);
        })
      )
      .subscribe((response) => {
        this.orderItensService.orderItensList = response;
      });
  }

  createOrderItens() {
    this.orderItens.quantityPurchased = this.quantityPurchased
    this.orderItens.order = {"id": this.order.id }
    this.orderItens.itens = {"id":this.productService.id}
    this.orderItensService
      .create(this.orderItens)
      .pipe(
        catchError((error) => {       
          return of(false);
        })
      )
      .subscribe((response: any) => {
          this.listAllOrderItens()
          this.updateAmount()
      });
      this.clearInputs()
  }

  deleteOrderItens(orderItens: any) {
    this.orderItensService
      .delete(orderItens)
      .pipe(
        catchError((error) => {
          return of(error)
        })
      )
      .subscribe((response: any) => {
        this.orderItensService.orderItensList.splice(this.orderItensService.orderItensList.indexOf(orderItens), 1);
        setTimeout(() => {
          this.updateAmount()
        }, 1000);
      })
    

  }

  addOrderItem() {
    this.createOrderItens()
  }

  // =================== COMPLEMENTS ===================

  listAllProductService(): void {
    this.productServiceService
      .getAll()
      .pipe(
        catchError((error) => {
        
          return of(false);
        })
      )
      .subscribe((response) => {
        this.productServiceService.productServiceList = response;
      });
  }

  clearInputs() {
    this.discount = 0
    this.amount = null
    this.orderItensService.orderItensList = []
  }

  onSubmit() {
    this.updateOrder()
    this.router.navigateByUrl("orders")
  }

  cancelRecord() {
    if(this.orderItensService.orderItensList.length === 0) {
      this.deleteOrder(this.orderService.order)
    }
    this.clearInputs()
    this.router.navigateByUrl("orders")
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
  
  dataTargetModal(): String {
    let dataTarget = ""

    if(this.orderItensService.orderItensList.length === 0) {
      dataTarget = "#deleteModal"
    } else {
      dataTarget = "#deleteAlertModal"
    }


    console.log(dataTarget);
    
    return dataTarget
  }

}
