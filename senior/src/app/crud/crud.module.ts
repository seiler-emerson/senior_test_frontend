import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductServiceComponent } from './product-service/product-service.component';
import { NewProductServiceComponent } from './new-product-service/new-product-service.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrderComponent } from './order/order.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderItensComponent } from './order-itens/order-itens.component';
import { NewOrderItensComponent } from './new-order-itens/new-order-itens.component';



@NgModule({
  declarations: [
    ProductServiceComponent,
    NewProductServiceComponent,
    NewOrderComponent,
    OrderComponent,
    DashboardComponent,
    OrderItensComponent,
    NewOrderItensComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    NewProductServiceComponent
  ]
})
export class CrudModule { }
