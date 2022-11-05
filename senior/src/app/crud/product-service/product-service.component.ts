import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ProductServiceService } from 'src/app/services/crud/product-service.service';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'app-product-service',
  templateUrl: './product-service.component.html',
  styleUrls: ['./product-service.component.css']
})
export class ProductServiceComponent implements OnInit {

  productIdSelected!: number;

  constructor(
    private systemService: SystemService,
    public productServiceService: ProductServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sendTitle()
    this.listAllProductService()
    // console.log(this.productServiceService.productServiceList);
    
  }

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

  detailProductService(productService: any) {
    this.productServiceService
    .getById(productService)
    .pipe(
      catchError((error) => {
        return of(false);
      })
    )
    .subscribe((response: any) => {
      this.productServiceService.productService = response;
      this.router.navigateByUrl("detail-productservice")
    });
  }

  updateProductService(productService: any): void {
    this.productServiceService.updateButtonHidden = false
    this.productServiceService
      .getById(productService)
      .pipe(
        catchError((error) => {
          return of(false);
        })
      )
      .subscribe((response: any) => {
        this.productServiceService.productService = response;
        this.router.navigateByUrl("new-productservice")
      });
  }

  newProductService() {
    this.productServiceService.updateButtonHidden = true
  }

  deleteProductService(productService: any) {
    this.productServiceService
      .delete(productService)
      .pipe(
        catchError((error) => {
          return of(error)
        })
      )
      .subscribe((response: any) => {
        this.productServiceService.productServiceList.splice(this.productServiceService.productServiceList.indexOf(productService), 1);
      })
  }

  saveProductServiceId(productService: number) {
    this.productIdSelected = productService;
  }


  sendTitle() {
    this.systemService.currentTitle = "Product / Service"
  }

}
