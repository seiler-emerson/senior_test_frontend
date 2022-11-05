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
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from 'ng-apexcharts';




@NgModule({
  declarations: [
    ProductServiceComponent,
    NewProductServiceComponent,
    NewOrderComponent,
    OrderComponent,
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
  ],
  exports: [
  ],
  providers:[NewOrderComponent]
})
export class CrudModule { }
