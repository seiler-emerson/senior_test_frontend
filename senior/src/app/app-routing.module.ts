import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './crud/dashboard/dashboard.component';
import { NewOrderComponent } from './crud/new-order/new-order.component';
import { NewProductServiceComponent } from './crud/new-product-service/new-product-service.component';
import { OrderComponent } from './crud/order/order.component';
import { ProductServiceComponent } from './crud/product-service/product-service.component';

const routes: Routes = [
  { path: "", component: DashboardComponent},
  { path: "dashboard", component: DashboardComponent},
  { path: "productservice", component: ProductServiceComponent},
  { path: "new-productservice", component: NewProductServiceComponent},
  { path: "orders", component: OrderComponent},
  { path: "new-order", component: NewOrderComponent},
  { path: "orderIntes", component: NewOrderComponent},
  { path: "new-orderItens", component: NewOrderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
