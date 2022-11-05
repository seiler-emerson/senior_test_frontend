import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ProductServiceService } from 'src/app/services/crud/product-service.service';

@Component({
  selector: 'app-new-product-service',
  templateUrl: './new-product-service.component.html',
  styleUrls: ['./new-product-service.component.css']
})
export class NewProductServiceComponent implements OnInit {

  updateButtonHidden: boolean = this.productServiceService.updateButtonHidden;
  productService!: any;

  typeBox: Array<String> = ["UNDEFINED", "PRODUCT", "SERVICE"]
  unitBox: Array<String> = ["UNDEFINED", "KG", "M", "UN", "H"]

  name!: string | null
  price!: number | null
  quantity!: number | null
  type!: number | string | null
  unitMeasurement!: number | string | null

  constructor(
    private productServiceService: ProductServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(!this.productServiceService.updateButtonHidden) {
      this.productService = this.productServiceService.productService;
    } else {
      this.productService = {};
    }
  }

  createProductService() {
    this.productServiceService
      .create(this.productService)
      .pipe(
        catchError((error) => {

          this.router.navigateByUrl("productservice")           
          return of(false);
        })
      )
      .subscribe((response: any) => {
        // console.log(response);
          this.productServiceService.productServiceList.push(response);
      });
      this.clearInputs()
      this.router.navigateByUrl("productservice")
  }

  updateProductService(): void {
    this.productServiceService
      .update(this.productServiceService.productService)
      .pipe(
        catchError((error) => {
          return of(false);
        })
      )
      .subscribe((response: any) => {
        if (response) {
          this.productServiceService.productServiceList[this.productServiceService.productServiceList.indexOf(this.productServiceService.productService)] = response;
        }
      });
      this.clearInputs()
      this.router.navigateByUrl("productservice")
  }

  clearInputs() {
    this.name = ""
    this.price = 0
    this.quantity = 0
    this.type = ""
    this.unitMeasurement = ""
  }

  onSubmit() {
    if(this.updateButtonHidden === true) {
      this.createProductService()
    } else {
      this.updateProductService()
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
